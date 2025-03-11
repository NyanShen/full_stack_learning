# src/main.py
import os
import numpy as np
from http import HTTPStatus #检查与Qwen模型HTTP请求状态
from llm_chain.rag_chain import RAGPipeline
# data_prepare
from data_prepare.documents_splitter import SymTextSplitter
from core.model_loader import ModelLoader
from langchain.prompts import PromptTemplate
from langchain.chains import RetrievalQA
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.runnables import RunnablePassthrough
from langchain_core.output_parsers import StrOutputParser
from dotenv import load_dotenv
def retrieval_process(query, index, chunks, embedding_model, top_k=3):
    """
    检索流程：将用户查询Query转化为嵌入向量，并在Faiss索引中检索最相似的前k个文本块。
    :param query: 用户查询语句
    :param index: 已建立的Faiss向量索引
    :param chunks: 原始文本块内容列表
    :param embedding_model: 预加载的嵌入模型
    :param top_k: 返回最相似的前K个结果
    :return: 返回最相似的文本块及其相似度得分
    """
    # 将查询转化为嵌入向量，normalize_embeddings表示对嵌入向量进行归一化
    query_embedding = embedding_model.encode(query, normalize_embeddings=True)
    # 将嵌入向量转化为numpy数组，Faiss索引操作需要numpy数组输入
    query_embedding = np.array([query_embedding])

    # 在 Faiss 索引中使用 query_embedding 进行搜索，检索出最相似的前 top_k 个结果。
    # 返回查询向量与每个返回结果之间的相似度得分（在使用余弦相似度时，值越大越相似）排名列表distances，最相似的 top_k 个文本块在原始 chunks 列表中的索引indices。
    distances, indices = index.search(query_embedding, top_k)

    print(f"查询语句: {query}")
    print(f"最相似的前{top_k}个文本块:")

    # 输出查询出的top_k个文本块及其相似度得分
    results = []
    for i in range(top_k):
        # 获取相似文本块的原始内容
        result_chunk = chunks[indices[0][i]]
        print(f"文本块 {i}:\n{result_chunk}") 

        # 获取相似文本块的相似度得分
        result_distance = distances[0][i]
        print(f"相似度得分: {result_distance}\n")

        # 将相似文本块存储在结果列表中
        results.append(result_chunk)

    print("检索过程完成.")
    return results

def generate_process(vector_store, chunks):
    """
    生成流程：调用Qwen大模型云端API，根据查询和文本块生成最终回复。
    :param query: 用户查询语句
    :param chunks: 从检索过程中获得的相关文本块上下文chunks
    :return: 返回生成的响应内容
    """

    # 构建参考文档内容，格式为“参考文档1: \n 参考文档2: \n ...”等
    context = ""
    for i, chunk in enumerate(chunks):
        context += f"参考文档{i+1}: \n{chunk}\n\n"

    # 构建生成模型所需的Prompt，包含用户查询和检索到的上下文
    prompt_template = """基于以下上下文信息回答问题：
    {context}
    问题：{question}
    请用中文给出详细回答："""
    print(f"生成模型的Prompt: {prompt_template}")
    
    # 创建Prompt模板对象，指定模板和输入变量
    # QA_PROMPT = PromptTemplate(
    #     template=prompt_template,
    #     input_variables=["context", "question"]
    # )
    prompt = ChatPromptTemplate.from_template(prompt_template)

    try:
        # 加载聊天语言模型
        llm = ModelLoader().load_openai_chat_model()
        # 构建完整处理链
        rag_chain = (
            {"context": vector_store.as_retriever(), "question": RunnablePassthrough()}
            | prompt
            | llm
            | StrOutputParser()
        )
        return rag_chain
        # 创建检索链
        # return RetrievalQA.from_chain_type(
        #     llm=llm,
        #     chain_type="stuff",
        #     retriever=vector_store.as_retriever(
        #         search_type="similarity",
        #         search_kwargs={"k": 3}  # 返回前3个相关文档
        #     ),
        #     chain_type_kwargs={"prompt": QA_PROMPT},
        #     return_source_documents=True
        # )
    except Exception as e:
        # 捕获并打印异常信息
        print(f"大模型生成过程中发生错误: {e}")
        return None

def build_vector_store_pipline():
        """
        离线创建向量数据库
        """
        load_dotenv()
        embedding_model = ModelLoader().load_st_embedding_model()
        index, all_chunks, vector_store = SymTextSplitter().indexing_process("data/raw_documents", embedding_model)
        print(f"共有 {len(all_chunks)} 个chunk")
        # 检索流程：将用户查询转化为嵌入向量，检索最相似的文本块
        query = "请介绍一下中国的高质量发展"
        retrieval_chunks = retrieval_process(query, index, all_chunks, embedding_model)
        print(f"检索到的文本块数量: {len(retrieval_chunks)}")
        qa_system = generate_process(vector_store, retrieval_chunks)
        # 示例查询
        # result = qa_system.invoke({"query": [query]})
        response = qa_system.invoke(query)
        print("Answer:", response)
        
        print(f"问题：{query}")
        # print(f"回答：{result['result']}")
        print("参考文档：", qa_system)
        # for doc in result['source_documents']:
        #     print(f"- {doc.metadata['source']} (第{doc.metadata['page']}页)")


def build_qa_system():
    """
    在线构建问答系统
    """
    ragChain = RAGPipeline()
    result = ragChain.query("高质量发展是什么？")
    print(result)

def main():
    import chromadb
    load_dotenv()
    chroma_path = os.environ['CHROMA_DBPATH']
    client = chromadb.PersistentClient(path=chroma_path)
    collection = client.get_collection("test_collection")
    print(f"集合包含 {collection.count()} 条记录")  # 输出数据量

    # excel_cleaner = ExcelCleaner("data/excels/医生.xlsx")
    # dataframe = excel_cleaner.excelFile.parse("Sheet1")
    # for column in dataframe.columns:
    #     print(dataframe[column].dtype)
    # messages = [
    #     (
    #         "system",
    #         "You are a helpful translator. Translate the user sentence to French.",
    #     ),
    #     ("human", "I love programming."),
    # ]
    # llm.invoke(messages)


if __name__ == "__main__":
    # 1.离线阶段创建向量数据库
    build_vector_store_pipline()
    # 2.在线阶段使用向量数据库构建问答系统
    # build_qa_system()
    # main()