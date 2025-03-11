import os
import requests
from dotenv import load_dotenv
from langchain.llms.base import LLM
# typing模块中的类型提示用于定义函数参数和返回值的类型。
from typing import Optional, List, Mapping, Any
from langsmith import traceable
from openai import OpenAI

# 自定义SiliconFlow语言模型包装器继承自LLM

class SiliconFlowLLM(LLM):
    load_dotenv() # 加载环境变量
    api_key: str = os.getenv("ENV_SILICOM_CLOUD_KEY")
    api_url: str = "https://api.siliconflow.cn/v1/chat/completions"  # 替换为实际的API端点
    '''
    @property 是 Python 中用于将类的方法转换为只读属性的一种装饰器。通过使用 @property 装饰器，可以将一个方法变成一个属性，使得调用这个方法时不需要使用括号。
    实现原理
    @property 装饰器的工作原理是，它将一个方法转换为一个属性，并允许你像访问属性一样访问这个方法。在内部，它实际上定义了一个 getter 方法，使得你可以通过属性访问器来获取这个方法的返回值。
    用途
    封装性：通过将方法转换为属性，可以更好地封装类的内部实现，隐藏细节，只暴露必要的接口。
    数据验证：可以在属性访问时进行数据验证，确保数据的正确性。
    简化代码：使用属性访问器可以简化代码，使代码更易读、更易维护。
    '''
    @property
    # 返回语言模型的类型
    def _llm_type(self) -> str:
        # 返回字符串"siliconflow"
        return "siliconflow"

    def _call(self, prompt: str, stop: Optional[List[str]] = None) -> str:
        # 设置请求头
        headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {self.api_key}"
        }
        # 设置请求数据
        payload = {
            "model": "deepseek-ai/DeepSeek-V3",
            "messages": [
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            "stream": False,
            "max_tokens": 50,
            "stop": None,
            "temperature": 0.2,
            "top_p": 0.7,
            "top_k": 50,
            "frequency_penalty": 0.5,
            "n": 1,
            "response_format": {"type": "text"},
            "tools": [
                {
                    "type": "function",
                    "function": {
                        "description": "<string>",
                        "name": "<string>",
                        "parameters": {},
                        "strict": False
                    }
                }
            ]
        }
        # 发送POST请求
        response = requests.post(self.api_url, headers=headers, json=payload)
        print("response.text:", response.text)
        return "test"
        # 如果请求成功
        # if response.status_code == 200:
        #     result = response.json()
        #     return result.get("text", "")
        # else:
        #     raise ValueError(f"请求失败，状态码: {response.status_code}, 错误信息: {response.text}")

    @property
    # 定义一个函数，用于返回一个字典，包含api_key
    def _identifying_params(self) -> Mapping[str, Any]:
        # 返回一个字典，包含api_key
        return {"api_key": self.api_key}

@traceable
def main():
    load_dotenv()
    client = OpenAI(api_key=os.getenv("ENV_SILICOM_CLOUD_KEY"), base_url="https://api.siliconflow.cn/v1")
    response = client.chat.completions.create(
        model='deepseek-ai/DeepSeek-V2.5',
        messages=[
            {
                'role': 'user', 
                'content': "用10个字描述一下自己"
            }
        ],
        stream=True
    )

    for chunk in response:
        print(chunk.choices[0].delta.content, end='')
        
# 使用自定义的SiliconFlow模型
if __name__ == "__main__":
    main()
    
    