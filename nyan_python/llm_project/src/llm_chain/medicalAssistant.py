import asyncio
import os
from http.client import HTTPException

from fastapi import FastAPI
from langchain_chroma import Chroma
from langchain_core.prompts import ChatPromptTemplate
from langchain_openai import ChatOpenAI
from openai import BaseModel
from starlette.responses import StreamingResponse

import embedding_extends as embedingcomm
import time
from dotenv import load_dotenv

# 加载环境变量
load_dotenv()

# 暴露api接口.
app = FastAPI(
    title='就医助手',
    version='V1.0',
    description='襄阳市中医医院就医助手'
)


class QuestionRequest(BaseModel):
    question: str
    max_length: int = 500


class AnswerResponse(BaseModel):
    question: str
    answer: str
    processing_time: float


# 会话.
@app.post("/ask")
async def ask_question(request: QuestionRequest):
    try:
        start_time = time.time()
        question = request.question

        # 初始化向量模型
        print("向量模型初始化...")
        embedding = embedingcomm.get_embedding_model()

        # 加载本地向量数据库.
        vector_db = Chroma(
            persist_directory=os.getenv("Chroma_DBPATH"),
            embedding_function=embedding
        )
        print("向量数据库加载完成...")

        # 配置检索器（带相似度分数阈值）
        retriever = create_retriever(vector_db)
        print("检索器配置完成...")

        # 初始化deepseek-r1大模型.
        model = setup_models()
        print("deepseek模型装载完成...")

        # 检索器检索之后的结果.
        retriever_result = retriever.invoke(question)

        # 检索之后的内容进行组装 形成上下文.
        context = "\n".join([doc.page_content for doc in retriever_result])

        # 构建提示语.
        prompt = ChatPromptTemplate.from_template(
            "作为医疗信息助手，请根据以下上下文用中文回答。"
            "如果信息不足，请说明。保持回答专业易懂。\n"
            "上下文：{context}\n"
            "问题：{question}"
        )

        # 组合链.
        chain = model | prompt

        result = chain.invoke({"question": question,"context": context})
        print(result.content)
        # return {
        #     "question": request.question,
        #     "answer": result.content,
        #     "processing_time": time.time() - start_time
        # }

        # async def event_stream():
        #     async for chunk in chain.astream({"question": question,"context": context}):
        #         yield f"data: {chunk}\n\n"
        #
        # return StreamingResponse(
        #     event_stream(),
        #     media_type="text/event-stream"
        # )

    except Exception as e:
        print(f"处理请求时发生错误：{str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"处理请求时发生错误：{str(e)}"
        )


# 初始化DeepSeek模型.
def setup_models():
    try:
        chat_model = ChatOpenAI(
            openai_api_key=os.getenv("DEEPSEEK_API_KEY"),
            base_url=os.getenv("DEEPSEEK_API_BASE"),
            model=os.getenv("MODEL_NAME", "deepseek-ai/DeepSeek-R1"),
            temperature=float(os.getenv("MODEL_TEMP", 0.5))
        )

        return chat_model
    except Exception as e:
        print(f"模型初始化失败: {str(e)}")
        raise


# 创建检索器.
def create_retriever(vector_db):
    return vector_db.as_retriever(
        search_type="similarity_score_threshold",
        search_kwargs={
            "k": 3,  # 返回结果数
            "score_threshold": 0.05  # 相似度阈值
        }
    )


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="localhost", port=8087)

