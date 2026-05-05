import { ChatGoogleGenerativeAI, GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { config } from "../config.js";

export const embeddings = new GoogleGenerativeAIEmbeddings({
	apiKey: config.gemini.apiKey,
	model: "gemini-embedding-2", // Modelo de embedding atualizado do Gemini
});

export const llm = new ChatGoogleGenerativeAI({
	apiKey: config.gemini.apiKey,
	model: "gemini-2.5-flash", // Modelo otimizado para velocidade e custo
	temperature: 0,
	maxRetries: 2,
});
