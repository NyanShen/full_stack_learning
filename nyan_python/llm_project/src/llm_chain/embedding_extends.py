import os
from typing import List
from langchain_chroma import Chroma
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_openai import ChatOpenAI
from langchain_text_splitters import RecursiveCharacterTextSplitter
from dotenv import load_dotenv

# 加载环境变量
load_dotenv()

# 获取向量模型.
def get_embedding_model():
    try:
        return BGEChineseEmbeddings(
            model_name=os.getenv("EMBEDDING_MODEL_PATH"),
            model_kwargs={"device": os.getenv("MODEL_DEVICE", "cuda"), 'trust_remote_code': True},
            encode_kwargs={"normalize_embeddings": True}
        )
    except Exception as e:
        print(f"模型初始化失败: {str(e)}")
        raise


# 创建向量数据库.
def create_vector_store(docs, embedding, chroma_path):
    try:
        # 清空已有数据库
        if os.path.exists(chroma_path):
            import shutil
            shutil.rmtree(chroma_path)

        # 创建新数据库
        vector_db = Chroma.from_documents(
            documents=docs,
            embedding=embedding,
            persist_directory=chroma_path
        )
        vector_db.persist()
        return vector_db
    except Exception as e:
        print(f"创建向量数据库失败: {str(e)}")
        raise


def split_documents(docs):
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=os.getenv("CHUNK_SIZE"),
        chunk_overlap=os.getenv("CHUNK_OVERLAP"),
        separators=os.getenv("SEPARATORS")  # ["\n\n", "\n", "。", "！", "？", "；"]  # 中文标点分割
    )
    return text_splitter.split_documents(docs)


# 自定义BGE嵌入类（处理查询指令）
class BGEChineseEmbeddings(HuggingFaceEmbeddings):
    def embed_query(self, text: str) -> List[float]:
        # 为查询添加中文指令前缀（关键步骤！）
        instruction = "为这个句子生成表示以用于检索相关文章："
        text = instruction + text
        return super().embed_query(text)
