```mermeid
graph TD

    %% === STYLES ===
    classDef dataFill fill:#FFF8C5,stroke:#d4b44c,stroke-width:1px;           %% Light Yellow
    classDef tuneFill fill:#FFD6D6,stroke:#d45a5a,stroke-width:1px;          %% Light Red
    classDef distillFill fill:#F2D9FF,stroke:#a464d4,stroke-width:1px;       %% Light Purple
    classDef ragFill fill:#DAE8FF,stroke:#4c73d4,stroke-width:1px;           %% Light Blue
    classDef appFill fill:#D6FFE4,stroke:#4cd48b,stroke-width:1px;           %% Light Green

    %% ============================================================
    %% LANE 1: DATA INPUT AND PREPROCESSING
    %% ============================================================
    subgraph L1[Data and Preprocessing]
        A1[Raw Data WhatsApp TXT]
        A2[Raw Data Big Bang Theory Script CSV]

        A2 --> B1[CSV to JSON via 'script_cleaning']
        B1 --> B2[JSON to JSONL]
        B2 --> B3[Cleaned JSONL Training Data]

        A1 --> B4[Preprocessing for RAG via 'chat_to_kb_rag']
    end
    class A1,A2,B1,B2,B3,B4 dataFill


    %% ============================================================
    %% LANE 2: MODEL FINE-TUNING
    %% ============================================================
    subgraph L2[Model Fine Tuning]
        X[TinyLlama 1.1B Base Model]
        B3 --> FT1[LoRA Training]
        X --> FT1

        FT1 --> FT2[Fine Tuned Model]
        D3[Evaluation] --> FT2
    end
    class X,FT1,FT2,D3 tuneFill


    %% ============================================================
    %% LANE 3: DISTILLATION
    %% ============================================================
    subgraph L3[Distillation]
        DS[Distillation]
        FTD[Fine Tuned Distilled Model]

        DS --> FTD
    end
    class DS,FTD distillFill


    %% ============================================================
    %% LANE 4: RAG PIPELINE
    %% ============================================================
    subgraph L4[RAG Pipeline]
        KB_DATA[Knowledge Base Dataset]
        IDX[Indexing via Pinecone API]
        EMB[Embedding]
        RET[Retrieved Similar Documents]
        COH[Cohere LLM API]
        RESP[Generated Response]
        Q[Query]

        B4 --> KB_DATA
        KB_DATA --> IDX
        IDX --> EMB

        Q --> EMB
        EMB --> RET
        RET --> COH
        COH --> RESP
    end
    class KB_DATA,IDX,EMB,RET,COH,RESP,Q ragFill


    %% ============================================================
    %% LANE 5: APPLICATION LAYER
    %% ============================================================
    subgraph L5[Application Layer]
        I[Django Web App API]
        I1[Frontend UI]
        I2[Backend Views and Logic]
        I3[Database Layer]
        J[User Browser Interaction]
        K[WhatsApp Integration Optional]

        I --> I1
        I --> I2
        I --> I3
        I --> J
        I --> K
    end
    class I,I1,I2,I3,J,K appFill


    %% ============================================================
    %% CROSS-LANE CONNECTIONS
    %% ============================================================
    X --> DS
    COH --> DS
    KB_DATA --> DS

    I --> Q
    RESP --> I
```
