# src/llm_chain/rag_chain.py
import os
from langchain_chroma import Chroma
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_core.output_parsers import PydanticOutputParser
from langchain_core.prompts import ChatPromptTemplate
from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain.text_splitter import RecursiveCharacterTextSplitter
from data_loader.document_parser import DocumentProcessor
from langsmith import traceable
from config.param_config import loadConfig
from core.model_loader import ModelLoader

class RAGPipeline:
    def __init__(self):
        self.chat_llm = ModelLoader().load_openai_chat_model()
        self.embedding_model = ModelLoader().load_hf_embedding_model()
        
    def create_retriever(self, vector_db):
        """
        创建检索器.
        mmr:在保证结果相关性的同时提升多样性，适用于数据集文档相似度高、需避免冗余的场景。
        lambda_mult:调节相关性与多样性的权重。λ值越小，多样性权重越高（0=最大多样性，1=完全相关性）
        """
        return vector_db.as_retriever(
                search_type="mmr",
                search_kwargs={'k': 6, 'lambda_mult': 0.25}
            )
    
    @traceable
    def query(self, question: str) -> str:

        # 加载本地向量数据库.
        vector_db = Chroma(
            persist_directory=os.getenv("CHROMA_DBPATH"),
            embedding_function=self.embedding_model
        )
        print("向量数据库加载完成...")

        # 配置检索器（带相似度分数阈值）
        retriever = self.create_retriever(vector_db)
        print("检索器配置完成...")

        # 检索器检索之后的结果.
        retriever_result = retriever.invoke(question)

        # 检索之后的内容进行组装 形成上下文.
        print("检索结果组装完成...", retriever_result)
        # context = "\n".join([doc.page_content for doc in retriever_result])
        # 设置嵌入模型，这里使用的是OpenAI的Embedding
        # retriever = self.index.as_retriever(similarity_top_k=3)
        # context = retriever.retrieve(question)
        
        # prompt = ChatPromptTemplate.from_template(
        #     "基于以下上下文：\n{context}\n回答：{question}"
        # )
        # chain = prompt | self.llm | PydanticOutputParser()
        # return chain.invoke({"context": context, "question": question})
        # messages = [
        #     (
        #         "system",
        #         "You are a helpful translator. Translate the user sentence to chinese language.",
        #     ),
        #     ("human", "I love programming."),
        # ]
        # for chunk in self.llm.stream(messages):
        #     print(chunk.text(), end="")
        return "Hello World"
