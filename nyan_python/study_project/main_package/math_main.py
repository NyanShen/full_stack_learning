import math
def getCircleArea(radius):
    '''
    获取圆面积
    '''
    return math.pi * radius ** 2

if __name__ == '__main__':
    print('math 模块')
    radius = float(input('请输入圆的半径：'))
    area = getCircleArea(radius)
    print(f'圆的面积是：{area}')