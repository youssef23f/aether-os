# 🏗 ARCHITECTURE.md – Aseer AI (AETHER-OS) System Architecture

## 1. High-Level Architecture Overview

Aseer AI is designed using a **hybrid client-serverless architecture**, optimized for ultra-low latency prompt processing and real-time client-side code execution.

```
+-------------------------------------------------------------------+
|                        Client Layer (React.js)                    |
| +---------------------+ +------------------+ +------------------+ |
| |   Chat Workspace    | |  Monaco Cloud IDE| | Memory Manager   | |
| +---------------------+ +------------------+ +------------------+ |
+----------------------------------+--------------------------------+
                                   | HTTP / WebSocket / EventStream
                                   v
+-------------------------------------------------------------------+
|                      Router Layer (Python Engine)                 |
|  - Intent Classification Engine                                   |
|  - Token Bucket Rate Limiter                                      |
|  - Dynamic Model Dispatcher                                       |
+----------------------------------+--------------------------------+
                                   | Provider Handlers
                                   v
+-------------------------------------------------------------------+
|                     Multi-Model Execution Layer                   |
|  [Llama 3]      [Code Model]      [Vision Engine]     [BYOK]      |
+-------------------------------------------------------------------+
```

## 2. Core Subsystems

### 2.1 The Dynamic Semantic Router (`main.py` & `modelsData.js`)
The router analyzes the incoming request payload using intent detection heuristics:
- **Code Intent:** Triggers Monaco IDE layout (`Workspace.jsx`), route to fine-tuned code generation model.
- **Visual Intent:** Triggers image generation pipelines and asset preview modals.
- **Standard Conversation:** Route to high-throughput conversation models with persistent memory payload attached.

### 2.2 Monaco Cloud Execution Sandbox (`src/components/Workspace.jsx`)
- Built on top of **Monaco Editor**.
- Features isolated Web Worker execution for JavaScript/HTML/CSS live preview rendering.
- Virtualized file system supporting multi-file project creation and inline execution terminal.

### 2.3 Context & Memory Manager (`src/components/MemoryManagerModal.jsx`)
- Manages user conversation embeddings and long-term key-value context storage.
- Allows user to edit, clear, or pin specific memories to shape AI behavior across sessions.
