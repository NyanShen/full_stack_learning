
import os
from langchain_ollama import OllamaLLM
from langchain_openai import ChatOpenAI 
from langchain_huggingface import HuggingFaceEmbeddings
from sentence_transformers import SentenceTransformer # 加载和使用Embedding模型
from dotenv import load_dotenv

class ModelLoader:
    def __init__(self):
        """初始化"""
        load_dotenv()

    @staticmethod
    def load_ollama_model(model_name):
        """
        加载ollama模型
        bge-m3:567m
        deepseek-r1:32b
        deepseek-r1:7b
        deepseek-r1:1.5b
        """
        # 初始化模型
        print(f"加载ollma llm模型......")
        llm = OllamaLLM(
            base_url=os.environ['OLLMA_BASE_URL'],  # 可配置为内部服务器地址
            model=model_name,
            temperature=0.8,
            num_ctx=4096  # 上下文窗口大小
        )
        print(f"加载ollma llm模型完成")
        return llm
    
    @staticmethod
    def load_openai_chat_model():
        """加载chatllm模型"""
        return ChatOpenAI(
            base_url=os.getenv('MODEL_BASE_URL'),
            api_key=os.environ['MODEL_API_KEY'],
            model=os.environ['MODEL_NAME'],
            temperature=os.getenv('MODEL_TEMPERATURE', 0.2),
            max_tokens=os.getenv('MODEL_MAX_TOKENS', 20),
        )
    
    @staticmethod
    def load_hf_embedding_model():
        """
        加载本地embedding模型
        :return: 返回加载的embedding模型
        chroma
        """
        model_name=os.environ['EMBEDDING_SMALL_MODEL_PATH']
        model_kwargs={
            "device": "cpu"
        }
        encode_kwargs={
            "normalize_embeddings": True
        }
        print(f"加载Embedding模型中")
        emdedding = HuggingFaceEmbeddings(
            model_name=model_name,
            model_kwargs=model_kwargs,
            encode_kwargs=encode_kwargs
        )
        print(f"加载Embedding模型完成", emdedding)
        return emdedding
        
    @staticmethod
    def load_st_embedding_model():
        """
        加载bge-small-zh-v1.5模型
        :return: 返回加载的bge-small-zh-v1.5模型
        用法：embedding_model.encode 配合faiss使用
        """
        print(f"加载Embedding模型中")
        # SentenceTransformer读取绝对路径下的bge-small-zh-v1.5模型，非下载
        # embedding_model = SentenceTransformer(os.path.abspath(os.environ['EMBEDDING_SMALL_MODEL_PATH']))
        model_path = os.environ['EMBEDDING_SMALL_MODEL_PATH']
        embedding_model = SentenceTransformer(model_name_or_path=model_path)
        print(f"bge-small-zh-v1.5模型最大输入长度: {embedding_model.max_seq_length}") 
        return embedding_model