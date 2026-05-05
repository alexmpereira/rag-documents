# RAG API Project

## Contexto do Projeto
Este projeto é uma API em Node.js (usando Express e TypeScript) que implementa um sistema de RAG (Retrieval-Augmented Generation). Ele permite o upload de documentos para extração de conteúdo, os quais são convertidos em vetores e armazenados em um banco de dados vetorial (Qdrant). A partir disso, o sistema utiliza o Google Gemini para responder perguntas baseadas no contexto extraído dos documentos, com suporte a respostas completas ou via stream (Server-Sent Events).

## Endpoints

A API possui os seguintes endpoints principais:

### 1. Health Check
Verifica se a API está funcionando.
- **Rota:** `GET /health`
- **Exemplo de uso:**
  ```bash
  curl http://localhost:3000/health
  ```
  **Resposta:** `OK`

### 2. Upload de Documentos
Faz o upload de um arquivo, extrai seu texto e salva no banco vetorial.
- **Rota:** `POST /documents/upload`
- **Body:** `multipart/form-data` contendo um campo chamado `file` (o arquivo a ser processado).
- **Exemplo de uso:**
  ```bash
  curl -X POST -F "file=@/caminho/para/seu/arquivo.pdf" http://localhost:3000/documents/upload
  ```

### 3. Busca Simples nos Documentos
Busca por trechos de documentos armazenados no banco vetorial que sejam mais similares à pergunta enviada, sem gerar uma resposta nova.
- **Rota:** `POST /query`
- **Body:** JSON
  ```json
  {
    "question": "Sua pergunta aqui",
    "topK": 5
  }
  ```
- **Exemplo de uso:**
  ```bash
  curl -X POST http://localhost:3000/query \
  -H "Content-Type: application/json" \
  -d '{"question":"Qual é o assunto principal?","topK":3}'
  ```

### 4. Consulta RAG (Retrieval-Augmented Generation)
Busca o contexto no banco de dados e utiliza o Gemini para formular uma resposta consolidada com base nesse contexto.
- **Rota:** `POST /rag`
- **Body:** JSON
  ```json
  {
    "question": "Sua pergunta aqui",
    "topK": 5
  }
  ```
- **Exemplo de uso:**
  ```bash
  curl -X POST http://localhost:3000/rag \
  -H "Content-Type: application/json" \
  -d '{"question":"Resume o documento para mim"}'
  ```

### 5. Consulta RAG com Stream
Mesma funcionalidade do endpoint RAG, porém a resposta é transmitida em partes assim que são geradas (via SSE - Server-Sent Events).
- **Rota:** `POST /rag/stream`
- **Body:** JSON
  ```json
  {
    "question": "Sua pergunta aqui",
    "topK": 5
  }
  ```
- **Exemplo de uso:**
  ```bash
  curl -X POST http://localhost:3000/rag/stream \
  -H "Content-Type: application/json" \
  -d '{"question":"Resume o documento para mim detalhadamente"}'
  ```

## Como rodar o projeto localmente

### Pré-requisitos
- **Node.js** (versão 22 recomendada de acordo com o `package.json`)
- **Docker** (para subir o banco de dados Qdrant)

### Passos para execução

1. **Clone o repositório e acesse a pasta:**
   ```bash
   cd /caminho/para/rag-documents
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Suba o banco de dados vetorial Qdrant via Docker:**
   Isso iniciará o contêiner do Qdrant na porta `6333`.
   ```bash
   docker-compose up -d
   ```

4. **Configuração de Variáveis de Ambiente:**
   Crie um arquivo `.env` na raiz do projeto contendo sua chave do Google Gemini. As outras variáveis possuem valores padrão, mas podem ser sobrescritas:
   ```env
   GEMINI_API_KEY="sua_chave_do_gemini_aqui"
   
   # Opcionais (valores padrão indicados abaixo)
   # QDRANT_URL=http://localhost:6333
   # QDRANT_COLLECTION_NAME=documents
   # SERVER_PORT=3000
   # UPLOADS_DIRECTORY=./uploads
   ```

5. **Inicie a API em modo de desenvolvimento:**
   ```bash
   npm run dev
   ```

Pronto! O servidor iniciará na porta `3000` (ou a configurada no `.env`), e você poderá começar a interagir com os endpoints descritos acima.