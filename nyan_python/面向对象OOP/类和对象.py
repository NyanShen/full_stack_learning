class Person: 
    '''
        初始化一个对象实例。
        该方法用于设置对象的初始状态，特别是姓名和年龄这两个属性。
        参数:
        name (str): 个人姓名。
        age (int): 个人年龄。
    '''
    def __init__(self, name, age):
        self.name = name
        self.age = age
    '''
        打印一个问候语。
        该方法用于打印一个问候语，包括个人姓名和年龄。
    '''
    def say_hello(self):
        print(f'Hello, my name is {self.name} and I am {self.age} years old.')

person_one = Person('John', 25)
print(person_one.say_hello())