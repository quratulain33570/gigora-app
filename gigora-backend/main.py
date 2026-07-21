from fastapi import FastAPI
from dotenv import load_dotenv
from ai_service import generate_proposal

# Load environment variables from .env
load_dotenv()

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Gigora Backend API is running! 🚀"}

@app.post("/api/proposal")
def create_proposal(data: dict):
    result = generate_proposal(data["job_post"])
    return {"proposal": result}