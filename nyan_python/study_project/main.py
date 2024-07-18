from main_package.module1 import hello, readJsonFile, testDataFrameApi

if __name__ == '__main__':
    print(hello("Python Study Project"))
    print(readJsonFile("data/package.json"))
    name = input("请输入要查询的姓名：")
    print(testDataFrameApi(name))