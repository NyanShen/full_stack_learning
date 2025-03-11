import os
from dotenv import load_dotenv

load_dotenv()

# Load environment variables
CURRENT_CONFIG = {
    "OPENAI_API_KEY": os.getenv("ENV_SILICOM_CLOUD_KEY"),
    "OPENAI_BASE_URL": "https://api.siliconflow.cn/v1",
    "OPENAI_MODEL_NAME": "deepseek-ai/DeepSeek-V2.5",
}

def loadConfig():
    return CURRENT_CONFIG