import os
import numpy as np
import faiss
from langchain_community.vectorstores import FAISS
from langchain_community.docstore.in_memory import InMemoryDocstore
from langchain.text_splitter import RecursiveCharacterTextSplitter
from data_prepare.documents_loader import SymTextLoader
from langchain_core.documents import Document

class SymTextSplitter:

    @staticmethod
    def split(file_path):
        # 加载文档
        documents = SymTextLoader(file_path).load()
        text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=int(os.getenv("CHUNK_SIZE")),          # 块大小（字符数）
            chunk_overlap=int(os.getenv("CHUNK_OVERLAP")),        # 块重叠
            separators=os.getenv("SEPARATORS") # 中文优化分隔符
        )
        split_docs = text_splitter.split_documents(documents)
        print(f"文档 {len(split_docs)} 个，每个文档 {len(split_docs[0].page_content)} 字节")
        return split_docs
    
    @staticmethod
    def indexing_process(folder_path, embedding_model):
        """
        索引流程：加载文件夹中的所有文档文件，并将其内容分割成文档块，计算这些小块的嵌入向量并将其存储在Faiss向量数据库中。
        :param folder_path: 文档文件夹路径
        :param embedding_model: 预加载的嵌入模型
        :return: 返回Faiss嵌入向量索引和分割后的文本块原始内容列表
        """
        
        # 初始化空的chunks列表，用于存储所有文档文件的文本块
        all_chunks = []

        # 遍历文件夹中的所有文档文件
        for filename in os.listdir(folder_path):
            file_path = os.path.join(folder_path, filename)
            
            # 检查是否为文件
            if os.path.isfile(file_path):
                # 解析文档文件，获得文档字符串内容
                document_text = SymTextLoader(file_path).load_document()
                print(f"文档 {filename} 的总字符数: {len(document_text)}")
                
                # 配置RecursiveCharacterTextSplitter分割文本块库参数，每个文本块的大小为512字符（非token），相邻文本块之间的重叠128字符（非token）
                text_splitter = RecursiveCharacterTextSplitter(
                    chunk_size=512, chunk_overlap=128
                )
                
                # 将文档文本分割成文本块Chunk
                chunks = text_splitter.split_text(document_text)
                print(f"文档 {filename} 分割的文本Chunk数量: {len(chunks)}")
                
                # 将分割的文本块添加到总chunks列表中
                all_chunks.extend(chunks)

        # 文本块转化为嵌入向量列表，normalize_embeddings表示对嵌入向量进行归一化，用于准确计算相似度
        embeddings = []
        for chunk in all_chunks:
            embedding = embedding_model.encode(chunk, normalize_embeddings=True)
            embeddings.append(embedding)

        print("所有文本块Chunk转化为嵌入向量完成")

        # 将嵌入向量列表转化为numpy数组，FAISS索引操作需要numpy数组输入
        embeddings_np = np.array(embeddings)

        # 获取嵌入向量的维度（每个向量的长度）
        dimension = embeddings_np.shape[1]

        # 使用余弦相似度创建FAISS索引
        index = faiss.IndexFlatIP(dimension)
        # 将所有的嵌入向量添加到FAISS索引中，后续可以用来进行相似性检索
        index.add(embeddings_np)

        # 建立索引到文档ID的映射
        index_to_docstore_id = {i: str(i) for i in range(len(all_chunks))}

        # 创建文档存储映射
        docstore_dict = {
            str(i): Document(  # 使用 str 类型键
                page_content=chunk,
                metadata={"source": folder_path}  # 添加必要元数据
            )
            for i, chunk in enumerate(all_chunks)
        }
        # 正确初始化 FAISS 对象
        vector_store = FAISS(
            embedding_function=embedding_model,
            index=index,
            docstore=InMemoryDocstore(docstore_dict),
            index_to_docstore_id=index_to_docstore_id
        )
        print("索引过程完成.")

        return index, all_chunks, vector_store