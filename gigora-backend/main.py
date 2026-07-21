from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from ai_service import analyze_profile

app = FastAPI()

# Enable CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ProfileRequest(BaseModel):
    profile_text: str

@app.post("/api/profile")
def get_profile_analysis(request: ProfileRequest):
    try:
        if not request.profile_text.strip():
            raise HTTPException(status_code=400, detail="Profile text cannot be empty.")
        return analyze_profile(request.profile_text)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))