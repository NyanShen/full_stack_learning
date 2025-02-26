from openai import OpenAI
from dotenv import load_dotenv

import os

load_dotenv()

client = OpenAI(
    api_key=os.getenv("DEEPSEEK_API_KEY"),
    base_url="https://api.deepseek.com"  # 官方API端点
)

response = client.chat.completions.create(
    model="deepseek-chat",  # 最新V3模型
    messages=[
        {"role": "system", "content": "你是一个专业的技术助手"},
        {"role": "user", "content": "解释量子计算的基本原理"}
    ],
    temperature=0.7,
    max_tokens=500
)

print(response.choices[0].message.content)
