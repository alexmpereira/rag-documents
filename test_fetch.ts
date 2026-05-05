import dotenv from "dotenv";
dotenv.config();

async function test() {
    const key = process.env.GEMINI_API_KEY;
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/embedding-001:embedContent?key=${key}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            model: "models/embedding-001",
            content: { parts: [{ text: "Hello world" }] }
        })
    });
    const data = await res.json();
    console.log(JSON.stringify(data).substring(0, 200));
    console.log("Vector length:", data?.embedding?.values?.length);
}

test().catch(console.error);
