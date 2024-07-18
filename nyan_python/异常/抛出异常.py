def validate_age(age):
    if age < 0:
        raise ValueError("年龄不能为负数")
    return age

try:
    validate_age(-5)
except ValueError as e:
    print(e)

def fibonacci(limit):
    a, b = 0, 1
    while a < limit:
        yield a
        a, b = b, a + b

print(">>>>>fibonacci", fibonacci(50))
# 使用生成器
for num in fibonacci(100):
    print(">>>>>num",num)  # 输出斐波那契数列：0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89
