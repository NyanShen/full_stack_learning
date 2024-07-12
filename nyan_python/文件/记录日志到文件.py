import logging
import os
from datetime import datetime

def setup_logger():
    # 创建日志文件夹（如果不存在）
    log_folder = "logs"
    if not os.path.exists(log_folder):
        os.makedirs(log_folder)

    # 获取当前日期作为文件名
    current_date = datetime.now().strftime("%Y-%m-%d")
    log_file = os.path.join(log_folder, f"{current_date}.log")

    # 配置日志记录器
    logger = logging.getLogger()
    logger.setLevel(logging.DEBUG)

    # 创建文件处理器
    file_handler = logging.FileHandler(log_file)
    file_handler.setLevel(logging.DEBUG)

    # 创建格式化器
    formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
    file_handler.setFormatter(formatter)

    # 将处理器添加到记录器
    logger.addHandler(file_handler)

    return logger

# 使用示例
if __name__ == "__main__":
    logger = setup_logger()

    # 记录一些日志
    logger.debug("这是一条调试信息")
    logger.info("这是一条普通信息")
    logger.warning("这是一条警告信息")
    logger.error("这是一条错误信息")
    logger.critical("这是一条严重错误信息")
