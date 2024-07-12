PI = 3.14159
'''
定义类Circle模块
__init__方法用于初始化对象，radius为圆的半径
area方法用于计算圆的面积
'''
class Circle: 
    def __init__(self, radius):
        self.radius = radius
    def area(self):
        return PI * self.radius ** 2