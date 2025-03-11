import re
import pandas as pd
from typing import Dict, List, Union
import pdfplumber

class Data_cleaner:
    def __init__(self):
        pass

    def clean_text_line(text: str) -> str:
        """单行文本清洗"""
        # 去除不可见字符
        text = re.sub(r'[\x00-\x1F\x7F]', '', text)
        # 合并连字符换行的单词
        text = re.sub(r'(\w+)-\n(\w+)', r'\1\2', text)
        # 标准化空白字符
        text = re.sub(r'\s+', ' ', text).strip()
        # 过滤页码/页眉
        if re.match(r'^\d+$|^[A-Z]{3,}$', text):
            return None
        return text
    

    def clean_table_df(df: pd.DataFrame) -> pd.DataFrame:
        """表格DataFrame清洗"""
        # 处理合并单元格（假设第一行为表头）
        df.columns = df.iloc[0] if pd.isna(df.columns[0]) else df.columns
        df = df[1:]  # 去除重复表头
        
        # 过滤空行
        df = df.dropna(how='all')
        
        # 处理跨页表格的续接
        if '续表' in df.columns[0]:
            return None
        
        # 统一数字格式
        for col in df.columns:
            if df[col].astype(str).str.match(r'^\d+\.?\d*$').all():
                df[col] = pd.to_numeric(df[col], errors='coerce')
        
        return df.reset_index(drop=True)

    def hybrid_processing(self, file_path: str) -> Dict[str, List[Union[str, pd.DataFrame]]]:
        """带数据清洗的混合处理"""
        results = {"text": [], "tables": []}
        
        with pdfplumber.open(file_path) as pdf:
            for page in pdf.pages:
                # 文本清洗流程
                text = page.extract_text()
                if text:
                    lines = [
                        self.clean_text_line(line)
                        for line in text.split('\n')
                        if self.clean_text_line(line) is not None
                    ]
                    results["text"].extend(lines)
                
                # 表格清洗流程
                tables = page.extract_tables()
                for table in tables:
                    df = pd.DataFrame(table)
                    cleaned_df = self.clean_table_df(df)
                    if cleaned_df is not None and not cleaned_df.empty:
                        results["tables"].append(cleaned_df)
        
        # 后处理：合并被错误分割的段落
        results["text"] = self.merge_split_paragraphs(results["text"])
        return results
    
    def merge_split_paragraphs(self, lines: List[str]) -> List[str]:
        """合并被错误换行的段落"""
        merged = []
        current_para = []
        
        for line in lines:
            # 检测段落结尾（结尾有标点）
            if re.search(r'[.。!?！？]$', line):
                current_para.append(line)
                merged.append(' '.join(current_para))
                current_para = []
            else:
                current_para.append(line)
        
        if current_para:
            merged.append(' '.join(current_para))
        
        return merged