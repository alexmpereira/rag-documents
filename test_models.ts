import dotenv from "dotenv";
dotenv.config();

async function test() {
    const key = process.env.GEMINI_API_KEY;
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${key}`);
    const data = await res.json();
    const models = data.models.filter(m => m.name.includes("embedding"));
    console.log(models.map(m => m.name));
}

test().catch(console.error);
