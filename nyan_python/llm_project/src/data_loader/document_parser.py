# src/data_loader/document_parser.py
from langchain_community.document_loaders import TextLoader

class DocumentProcessor:
    def __init__(self, data_dir="data/raw_documents"):
        # 加载当前目录下所有.md文件（递归搜索子目录）
        self.loader = TextLoader(
            file_path=f'{data_dir}/test.txt', 
            encoding="utf-8", 
            autodetect_encoding=True  # 自动检测编码
        )
    
    def build_index(self):
        # 加载数据
        # 调用self.reader对象的load_data方法，从数据源加载数据
        documents = self.reader.load_data()
        # 从文档中获取节点
        nodes = self.parser.get_nodes_from_documents(documents)
        # 返回结构化节点
        return nodes 
    
    def load_documents(self):
        # 加载文档
        documents = self.loader.load()  # 调用loader对象的load方法，加载文档数据
        # 返回文档
        print(f"共加载 {len(documents)} 个文档")  #  打印加载的文档数量
        return documents  # 返回加载的文档列表
