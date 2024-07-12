def validate_age(age):
    if age < 0:
        raise ValueError("年龄不能为负数")
    return age

try:
    validate_age(-5)
except ValueError as e:
    print(e)
