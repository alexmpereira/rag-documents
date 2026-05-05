# Planejamento de Integração com o Google Gemini

Este documento descreve os passos necessários para substituir ou adicionar o suporte ao Google Gemini como modelo de Inteligência Artificial (LLM) e gerador de Embeddings neste projeto RAG (Retrieval-Augmented Generation).

## 1. Atualização das Dependências

O projeto utiliza a biblioteca **LangChain**. Para integrar com os modelos mais recentes do Google (Gemini), é necessário instalar o pacote oficial da integração do LangChain com o Google GenAI.

**Comando de Instalação:**
```bash
npm install @langchain/google-genai
```

## 2. Configuração das Variáveis de Ambiente

O arquivo `.env` atual e a configuração global devem ser adaptados para suportar a chave de API do Gemini.

1. **Adicionar no `.env`:**
   ```env
   GEMINI_API_KEY="sua_chave_do_gemini_aqui"
   ```

2. **Atualizar `src/config.ts`:**
   Adicionar a nova variável e verificar sua existência na inicialização da aplicação, da mesma forma como foi feito para a OpenAI.
   ```typescript
   export const config = {
     // ...
     gemini: {
       apiKey: process.env.GEMINI_API_KEY!,
     },
     // ...
   }
   // Adicionar validação:
   if (!config.gemini.apiKey) {
       throw new Error("GEMINI_API_KEY is not set in environment variables");
   }
   ```

## 3. Substituição dos Serviços de IA

Modificar as instâncias de instâncias no arquivo de serviços (atualmente estruturadas no `src/services/openai.ts` ou equivalentes), substituindo a OpenAI pelos modelos do Gemini.

**Exemplo de Implementação (`src/services/gemini.ts`):**
```typescript
import { ChatGoogleGenAI, GoogleGenAIEmbeddings } from "@langchain/google-genai";
import { config } from "../config.js";

// 1. Configurando os Embeddings do Gemini
export const embeddings = new GoogleGenAIEmbeddings({
    apiKey: config.gemini.apiKey,
    model: "text-embedding-004", // Modelo de embedding recomendado
});

// 2. Configurando o LLM do Gemini
export const llm = new ChatGoogleGenAI({
    apiKey: config.gemini.apiKey,
    model: "gemini-2.5-flash", // Modelo rápido e otimizado em custos
    temperature: 0,
    maxRetries: 2,
});
```

## 4. Atualização nas Importações Restantes

Após renomear ou criar o serviço (ex: `src/services/gemini.ts`), será necessário atualizar em todo o projeto as importações de `llm` e `embeddings` que estão sendo utilizadas atualmente em `src/services/document.ts` (para embeddings), `src/services/rag.ts` e `src/services/query.ts` (para indexação, busca e resposta ao usuário).

---

## Como Gerar a Chave da API do Gemini (Token)

Para testar esta integração, você precisará de uma API Key gerada através do Google AI Studio. 

Siga as orientações abaixo:

1. **Acesse o Google AI Studio:**
   Entre no portal do desenvolvedor pelo endereço: [https://aistudio.google.com/](https://aistudio.google.com/) e faça login usando a sua Conta do Google.

2. **Gere a Chave de API:**
   - No painel lateral esquerdo, procure pelo botão ou link escrito **"Get API key"** ou **"Obter chave de API"**.
   - Clique em **"Create API key"** (Criar chave de API).
   - Você poderá escolher vinculá-la a um projeto do Google Cloud já existente ou criar a chave associada a um novo projeto que o AI Studio irá criar para você (escolha a forma que for mais conveniente, geralmente um novo projeto padrão do AI studio é mais rápido).

3. **Copie e Armazene:**
   A chave gerada será uma longa string (token). Copie essa chave e cole-a no seu arquivo `.env` dentro de `GEMINI_API_KEY="sua_chave_gerada"`.

4. **Custos:**
   Atualmente o Google oferece uma modalidade gratuita generosa (Free Tier) no AI Studio, o que é perfeito para testar em ambiente local ou de desenvolvimento sem custo algum. Apenas certifique-se de estar ciente dos limites de taxa de requisições por minuto do modo gratuito.
