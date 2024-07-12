import os
import logging
from datetime import datetime

'''
带参数装饰器
'''
def logger_decorator(level):
    def decorator(func):
        def wrapper(*args, **kwargs):
            # 函数执行之前装饰行为, 获取当前日期作为文件名
            current_date = datetime.now().strftime("%Y-%m-%d")
            logging.basicConfig(filename=f'{current_date}.log', level=level)
            result = func(*args, **kwargs)
            # 函数执行之后装饰行为
            return result
        return wrapper
    return decorator
'''
testing...
'''
@logger_decorator(logging.INFO)
def param_decorator():
    print('testing...', logging.WARNING)
print(param_decorator())
print(os.path.exists('nyan_python/装饰器/日志装饰器.py'))