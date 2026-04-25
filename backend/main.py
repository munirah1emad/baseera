from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import fitz
import httpx
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

document_store: dict[str, str] = {}
GROQ_API_KEY = os.environ.get("GROQ_API_KEY")


class QuestionRequest(BaseModel):
    doc_id: str
    question: str


@app.post("/upload")
async def upload_pdf(file: UploadFile = File(...)):
    if not file.filename.endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are supported.")
    contents = await file.read()
    doc = fitz.open(stream=contents, filetype="pdf")
    text = ""
    for page in doc:
        text += page.get_text()
    if not text.strip():
        raise HTTPException(status_code=400, detail="Could not extract text from PDF.")
    doc_id = file.filename.replace(" ", "_")
    document_store[doc_id] = text[:50000]
    return {"doc_id": doc_id, "pages": len(doc), "filename": file.filename}


@app.post("/ask")
async def ask_question(req: QuestionRequest):
    if req.doc_id not in document_store:
        raise HTTPException(status_code=404, detail="Document not found. Please upload again.")
    doc_text = document_store[req.doc_id]
    prompt = f"""You are a helpful document assistant. Answer questions based ONLY on the document content provided.
If the answer is not in the document, say so clearly.
Respond in the same language the user used to ask the question (Arabic or English).

Document content:
{doc_text}

Question: {req.question}"""

    async with httpx.AsyncClient() as client:
        response = await client.post(
            "https://api.groq.com/openai/v1/chat/completions",
            headers={"Authorization": f"Bearer {GROQ_API_KEY}"},
            json={
                "model": "llama-3.3-70b-versatile",
                "messages": [{"role": "user", "content": prompt}],
                "max_tokens": 1024,
            },
            timeout=30,
        )
    if response.status_code != 200:
        raise HTTPException(status_code=500, detail="Groq API error: " + response.text)
    result = response.json()
    answer = result["choices"][0]["message"]["content"]
    return {"answer": answer}


@app.get("/")
def root():
    return {"status": "Smart Document Q&A API is running"}