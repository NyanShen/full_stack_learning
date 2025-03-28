import os
from langchain_chroma import Chroma
from core.model_loader import ModelLoader

class SymChromaStoreManager:
    def __init__(self, chroma_path=""):
        self.chroma_path = chroma_path or os.environ['CHROMA_DBPATH_TEST']
        self.embedding_model = ModelLoader().load_hf_embedding_model()

    def create_vector_store(self, splits_docs):
        """
        创建向量数据库
        :param splits: 分块文档
        :param embedding: 向量模型
        :param chroma_path: 向量数据库路径
        """
        try:
            # 1.清空已有数据库
            if os.path.exists(self.chroma_path):
                import shutil
                # 删除该目录及其所有内容
                shutil.rmtree(self.chroma_path)
                print(f"删除已有向量数据库成功...")
            print(f"创建向量数据库中...", )
            # 2.创建新数据库
            vectorstore = Chroma.from_documents(
                documents=splits_docs,
                embedding=self.embedding_model,
                persist_directory=self.chroma_path,
                collection_name="study_collection",
            )
            # 构建向量存储, 打印条数
            print(f"创建向量数据库成功")
            return vectorstore
        except Exception as e:
            print(f"创建向量数据库失败: {str(e)}")
            raise

    def load_vector_store(self):
        try:
            # 2.加载本地向量数据库.
            vector_db = Chroma(
                persist_directory=self.chroma_path,
                embedding_function=self.embedding_model
            )
            print("向量数据库加载完成...")
            return vector_db
        except Exception as e:
            print(f"向量数据库加载失败: {str(e)}")
            raise
    
    def create_retriever(self):
        try:
            # 1.加载本地向量数据库
            vector_db = self.load_vector_store()
            # 2.创建检索器
            retriever = vector_db.as_retriever(
                search_type="mmr",
                search_kwargs={'k': 6, 'lambda_mult': 0.25}
            )
            print("检索器创建完成...")
            return retriever
        except Exception as e:
            print(f"检索器创建失败: {str(e)}")
            raise