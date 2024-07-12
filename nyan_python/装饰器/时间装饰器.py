import time
'''
    一个装饰器，用于测量函数执行的时间。
    参数:
    - func: 被装饰的函数。
    返回:
    - 一个函数，该函数会计算并打印原函数的执行时间。
'''
def timer(func):
    def wrapper(*args, **kwargs):
        # 记录函数执行开始时间
        start = time.time()
        result = func(*args, **kwargs)
        # 记录函数执行结束时间
        end = time.time()
        print(f'{func.__name__} took {end - start} seconds')
        return result
    return wrapper


@timer
def show_timer_function():
    time.sleep(2)
    print('Hello, show_timer_function!')
    return "over"

print(show_timer_function())