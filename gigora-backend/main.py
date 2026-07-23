from datetime import datetime, timezone
from uuid import uuid4

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from ai_service import analyze_profile

app = FastAPI()
FREE_USE_LIMIT = 5
history_items = []
usage = {"used": 0}


def remaining_uses():
    return max(0, FREE_USE_LIMIT - usage["used"])


def record_history(item_type: str, output: str, metadata: dict):
    item = {
        "id": str(uuid4()),
        "type": item_type,
        "date": datetime.now(timezone.utc).isoformat(),
        "output": output,
        "metadata": metadata,
    }
    history_items.insert(0, item)
    return item


def consume_free_use():
    if remaining_uses() <= 0:
        raise HTTPException(status_code=429, detail="Your free uses are exhausted. Upgrade to Pro to continue.")
    usage["used"] += 1

# Enable CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ==========================================
# 1️⃣ FEATURE 1: PROFILE ANALYZER
# ==========================================
class ProfileRequest(BaseModel):
    profile_text: str
    target_role: str = ""

@app.post("/api/profile/analyze")
def get_profile_analysis(request: ProfileRequest):
    try:
        if not request.profile_text.strip():
            raise HTTPException(status_code=400, detail="Profile text cannot be empty.")
        consume_free_use()
        result = analyze_profile(request.profile_text)
        record_history("Profile Analysis", str(result), {"score": result.get("score")})
        result["remaining_uses"] = remaining_uses()
        return result
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ==========================================
# 2️⃣ FEATURE 2: GIG SEO OPTIMIZER
# ==========================================
class SeoRequest(BaseModel):
    title: str
    category: str = "Web Development"
    description: str = ""

@app.post("/api/seo/optimize")
def optimize_gig_seo(request: SeoRequest):
    try:
        if not request.title.strip():
            raise HTTPException(status_code=400, detail="Gig title cannot be empty.")
        
        consume_free_use()
        result = {
            "optimized_title": f"Professional {request.title} | High Quality Services",
            "tags": [
                {"text": "React", "valid": True},
                {"text": "Web App", "valid": True},
                {"text": "Full Stack", "valid": True},
                {"text": "JavaScript", "valid": True},
                {"text": "Frontend", "valid": True},
            ],
            "keywords": ["responsive design", "modern UI", "fast performance"],
            "optimized_description": "Highlight key skills, delivery timeline, and past project links!",
            "seo_score": 86,
            "title_score": 90,
            "tags_score": 88,
            "description_score": 80,
            "remaining_uses": remaining_uses(),
        }
        record_history("SEO Optimization", result["optimized_description"], {"title": result["optimized_title"], "score": result["seo_score"]})
        return result
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ==========================================
# 3️⃣ FEATURE 3: PROPOSAL GENERATOR
# ==========================================
class ProposalRequest(BaseModel):
    job_description: str
    client_name: str = ""
    tone: str = "Professional"
    skill_highlight: str = ""

@app.post("/api/proposal/generate")
def generate_proposal_endpoint(request: ProposalRequest):
    try:
        if not request.job_description.strip():
            raise HTTPException(status_code=400, detail="Job description cannot be empty.")
            
        consume_free_use()
        client = request.client_name if request.client_name else "Hiring Manager"
        result = {
            "proposal": f"Hi {client},\n\nI reviewed your project details regarding '{request.job_description[:40]}...' and I am confident I can help! With experience in {request.skill_highlight or 'full-stack development'}, I can deliver high-quality results efficiently.\n\nBest regards,\nFreelancer"
            ,"key_points": ["Addresses the client directly", f"Highlights {request.skill_highlight or 'relevant experience'}", f"Uses a {request.tone} tone"],
            "remaining_uses": remaining_uses(),
        }
        record_history("Proposal", result["proposal"], {"tone": request.tone, "skill": request.skill_highlight})
        return result
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/dashboard/stats")
def get_dashboard_stats():
    counts = {"Proposal": 0, "SEO Optimization": 0, "Profile Analysis": 0}
    for item in history_items:
        if item["type"] in counts:
            counts[item["type"]] += 1
    return {
        "total_proposals": counts["Proposal"],
        "seo_optimizations": counts["SEO Optimization"],
        "profile_analyses": counts["Profile Analysis"],
        "remaining_uses": remaining_uses(),
        "plan": "Free",
    }


@app.get("/api/history")
def get_history(limit: int | None = None):
    return history_items[:limit] if limit else history_items


@app.delete("/api/history/{history_id}")
def delete_history(history_id: str):
    global history_items
    original_length = len(history_items)
    history_items = [item for item in history_items if item["id"] != history_id]
    if len(history_items) == original_length:
        raise HTTPException(status_code=404, detail="History item not found.")
    return {"ok": True}


@app.get("/api/user/profile")
def get_user_profile():
    return {"name": "Freelancer", "email": "freelancer@gigora.app", "plan": "Free", "join_date": "2026-07-01"}
