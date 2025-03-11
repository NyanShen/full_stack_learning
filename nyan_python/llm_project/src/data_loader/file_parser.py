import pdfplumber
import pandas as pd
from utils.data_standard import format_tables

class FileParser:
    @staticmethod
    def pdf_to_text(file_path: str) -> str:
        """解析普通PDF文本和表格"""
        text = ""
        with pdfplumber.open(file_path) as pdf:
            for page in pdf.pages:
                text += f'{page.extract_text()}\n'
                tables = page.extract_tables()
                text += f'\n{format_tables(tables)}'
        return text
    
    # ----------------------
# 1. 加载 Excel 文件
# ----------------------
def excel_to_documents(file_path):
    try:
        # 读取 Excel 所有工作表
        xls = pd.ExcelFile(file_path)
        documents = []

        for sheet_name in xls.sheet_names:
            # 读取单个工作表
            df = pd.read_excel(xls, sheet_name=sheet_name, dtype=str)
            df = df.fillna("")  # 处理空值

            # 将 DataFrame 转换为文本格式（按行处理）
            text_column = []
            for _, row in df.iterrows():
                # 将每行数据转换为键值对字符串
                # row_str = ", ".join([f"{col}: {val}" for col, val in row.items()])
                # row_str = ", ".join([f"{col}: {str(val)}" for col, val in row.items()])
                row_str = " | ".join([f"{col}:{val}" for col, val in row.items() if val != ""])
                text_column.append(row_str)

            df["text"] = text_column  # 添加新列用于页面内容

            # 添加元数据（工作表名称）
            df["metadata"] = {"source": f"{file_path}#{sheet_name}"}

            # 使用 DataFrameLoader 转换为 LangChain Document 格式
            # loader = DataFrameLoader(df, page_content_column = text_column)
            loader = DataFrameLoader(df, page_content_column="text")
            documents.extend(loader.load())
            print('Excel文件加载成功')
            return documents
    except Exception as e:
        print(f"Excel文件加载失败: {str(e)}")
        raise