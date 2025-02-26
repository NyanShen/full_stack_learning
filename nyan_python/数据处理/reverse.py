data = '''#cadafe
#c2d4fd
#bacefc
#b2c8fb
#a9c2fa
#a1bdfa
#99b7f9
#91b1f8
#89abf7
#81a5f6
#789ff5
#7099f4
#6893f3
#608df2
#5887f1
#5082f1
#477cf0
#3f76ef
#3770ee
#2f6aed
'''

# 将数据按换行符分割成列表
lines = data.split('\n')
# 反转列表
reversed_lines = lines[::-1]
print(lines)
print(reversed_lines)