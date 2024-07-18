
import json
import pandas as pd
def hello(name):
   return f'Hello, {name}!'

def readJsonFile(filePath):
   '''
   加载JSON文件
   '''
   with open(filePath) as json_file:
      data_dict = json.load(json_file)
      return data_dict.get('dependencies').get('vuex')
   
def testDataFrameApi(name):
   df = pd.DataFrame({"name": ["Nyan", "ZEO", "Leo", "Ken"], "age": [30, 40, 30, 26], "salary": [10000.32, 8000, 7630, 6550]})
   return df[df.name == name]
   
