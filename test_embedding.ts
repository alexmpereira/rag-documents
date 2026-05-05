import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import dotenv from "dotenv";

dotenv.config();

async function test() {
    const embeddings = new GoogleGenerativeAIEmbeddings({
        apiKey: process.env.GEMINI_API_KEY,
        model: "gemini-embedding-2",
        taskType: "RETRIEVAL_DOCUMENT",
    });

    const vectors = await embeddings.embedDocuments(["Hello world"]);
    console.log("Vector length:", vectors.length);
    console.log("First vector dimension:", vectors[0]?.length);
}

test().catch(console.error);
