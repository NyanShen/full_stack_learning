'''
列表[]
含义: 列表是Python中最常用的数据结构之一,用方括号[]表示。列表是有序的、可变的序列,可以存储不同类型的元素。
有序列的通用方法: max, min, count, index, sort, 切片, pop, reverse
可变序列的方法: append, insert, remove, clear,
删除序列的方法: del
'''
# 创建列表由不可变数据创建,不可变数据类型包括:(字符,数字类型(整型,浮点),布尔值)
list = ["html", "css", "javascript", "python", 100, 98.45, True]
print('原始列表:', list)
list.append("java") # 添加元素
print('添加元素:', list) 
list.insert(2, "php") # 在列表具体位置2插入元素
print('插入元素:', list)
list.remove("html")
print('删除元素:', list) # 删除元素html
print('列表长度:', len(list))
print('列表索引:', list[0])
print('列表切片1:', list[1::2])
print('列表切片2:', list[:3])
print('列表切片3:', list[1:])
print('列表切片4:', list[:])
print('列表切片5:', list[-1])
print('列表切片6:', list[-3:-1])
print('列表切片7:', list[-3:])
# list.sort()
# print('排序列表:', list)
list.reverse()
print('反转列表:', list)
print('列表索引:', list.index("css"))
print('列表计数:', list.count("css"))
list.pop()
print('删除列表:', list)
list.clear()
print('清空列表:', list)

# 创建一个学生成绩列表
scores = [85, 92, 78, 95, 88]

# 添加新成绩
scores.append(90)

# 修改某个成绩
scores[2] = 80

# 计算平均分
average = sum(scores) / len(scores)

print(f"成绩列表: {scores}")
print(f"平均分: {average}")

