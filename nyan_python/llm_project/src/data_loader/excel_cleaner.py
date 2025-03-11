import pandas as pd
import re

class ExcelCleaner:
    
    def __init__(self, file_path):
        '''
        :param file_path: excel文件路径
        '''
        self.file_path = file_path
        self.excelFile = pd.ExcelFile(self.file_path)
    # 定义函数去除特殊字符和换行符
    def clean_text(self, text) -> str:
        '''
        :param text: 需要清洗的文本
        '''
        if isinstance(text, str):
            text = text.replace('\n', ' ').replace('\r', ' ')  # 去除换行符
            text = ''.join(e for e in text if e.isprintable())  # 去除不可打印字符（返回 True 如果字符是可打印的（例如字母、数字、标点符号和空格），否则返回 False。）
            # 匹配电话号码格式并替换
            phone_pattern = r'[（(](\d+)[）)](\d+)'
            text = re.sub(phone_pattern, r'\1-\2', text)
            return text
        return text
    
    def clean_data(self, sheet_name="Sheet1", column_to_clean = "简介", export_file_name = 'cleaned_data'):
        # 定义一个方法用于清洗数据，默认处理名为"简介"的列，并将清洗后的数据导出到名为'cleaned_data.xlsx'的文件中
        self.dataframe = self.excelFile.parse(sheet_name)
        self.dataframe[column_to_clean] = self.dataframe[column_to_clean].apply(self.clean_text)
        # 检查并处理科室数据的缺失值（当前无缺失值，但为通用性考虑）
        for column in self.dataframe.columns:
            if self.dataframe[column].isnull().any():
                if self.dataframe[column].dtype == 'object':
                    self.dataframe[column].fillna('', inplace=True)
                else:
                    self.dataframe[column].fillna(self.dataframe[column].mean(), inplace=True)
        # 保存清洗后的数据
        self.dataframe.to_csv(f'data/excels/{export_file_name}.csv', index=False)
    
    def clean_with_multi_columns(self, sheet_name="Sheet1", export_file_name = 'cleaned_result'):
        '''
        清洗多个列的数据，并导出结果
        '''
        # 解析excel文件
        self.dataframe = self.excelFile.parse(sheet_name)
        # 检查并处理数据的缺失值（当前无缺失值，但为通用性考虑）
        for column in self.dataframe.columns:
            # 清洗每一列的文本数据
            self.dataframe[column] = self.dataframe[column].apply(self.clean_text)
            # 检查 dataframe 中指定列 column 是否存在任何缺失值。如果存在缺失值，则返回 True；如果不存在缺失值，则返回 False。
            if self.dataframe[column].isnull().any():
                # 在 Pandas 中，字符串类型的数据会被标记为 object 类型。
                if self.dataframe[column].dtype == 'object':
                    # 如果列的数据类型是字符串，则用空字符串填充缺失值
                    self.dataframe[column].fillna('', inplace=True)
                else:
                    # 如果列的数据类型不是字符串，则用该列的平均值填充缺失值inplace=True 参数：这个参数的作用是直接在原数据框上进行修改，而不是返回一个新的数据框。
                    self.dataframe[column].fillna(self.dataframe[column].mean(), inplace=True)

        # 保存清洗后的数据
        self.dataframe.to_csv(f'data/excels/{export_file_name}.csv', index=False)
        
