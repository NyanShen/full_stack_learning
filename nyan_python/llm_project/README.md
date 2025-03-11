llm-rag-project/
├── conda_env/                # Conda环境配置
│   └── environment.yml       # 环境依赖定义（核心依赖版本锁定）
├── config/                   # 配置文件
│   ├── 
│   └── config.yaml           # API密钥配置
├── data/                     # 原始数据与处理结果
│   ├── raw_documents/        # 原始文档（PDF/TXT等）
│   └── processed/           # 预处理后的向量化数据
├── src/                      # 源代码模块化组织
│   ├── __init__.py
│   ├── data_loader/          # 数据加载模块（LlamaIndex集成）
│   │   ├── document_parser.py  # PDF/文本解析器（结合LlamaIndex NodeParser）
│   │   └── vector_store.py   # 向量数据库连接（FAISS/Chroma）
│   ├── llm_chain/            # LangChain逻辑模块
│   │   ├── agent_setup.py    # 智能体初始化（工具集成）
│   │   └── rag_chain.py      # RAG流程链（检索+生成）
│   └── utils/                # 辅助工具
│       ├── logging.py        # MLflow跟踪集成
│       └── config_loader.py  # 配置加载器
├── tests/                    # 单元测试
├── docs/                     # 文档（含API说明、流程图）
├── scripts/                  # 执行脚本
│   ├── train_pipeline.py     # 训练/索引构建脚本
│   └── serve_api.py          # Gradio/FastAPI服务启动（参考[[16]]）
├── main.py                   # 主程序入口
├── requirements.txt          # 依赖包列表
├── models                    # 本地模型存储 
├── vector_store/             # 向量数据库存储
└── README.md                 # 项目说明

