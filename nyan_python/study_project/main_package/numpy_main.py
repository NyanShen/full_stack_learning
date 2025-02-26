
import os 
import numpy as np
import requests
from dotenv import load_dotenv
from openai import OpenAI

def main():
    
    a = np.array([1, 2, 3, 4, 5,6,7,8,9,10])

    # 形状
    print(a.shape)

    # 维度
    print(a.ndim)

    # 数据类型
    print(a.dtype)
    
    load_dotenv()
    
    print('env deepseek key:',os.getenv('ENV_SILICOM_CLOUD_KEY'))
    
    # client = OpenAI(api_key=os.getenv('ENV_SILICOM_CLOUD_KEY'), base_url="https://api.siliconflow.cn/v1/chat/completions")

    # response = client.chat.completions.create(
    #     model="deepseek-chat",
    #     messages=[
    #         {"role": "system", "content": "You are a helpful assistant"},
    #         {"role": "user", "content": "Hello"},
    #     ],
    #     stream=False
    # )

    # print(response.choices[0].message.content)
    url = "https://api.siliconflow.cn/v1/chat/completions"

    payload = {
        "stream": False,
        "model": "deepseek-ai/DeepSeek-V3",
        "max_tokens": 100,
        "temperature": 0.1,
        "top_p": 0,
        "messages": [
            {
                "role": "system",
                "content": "请翻译下面的英文转中文"
            },
            {
                "role": "user",
                "content": "property"
            }
        ]
    }
    headers = {
        "Authorization": "Bearer sk-ocrpbmvrwpsgrmgokxqouapqxcrrmrkureypnuoghuoqqsso",
        "Content-Type": "application/json"
    }

    response = requests.request("POST", url, json=payload, headers=headers)

    print(response.text)
    

if __name__ == "__main__":
    main()
