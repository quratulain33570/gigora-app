import os
import json
from dotenv import load_dotenv
from groq import Groq

# 🔑 Load variables from .env file into os.environ
load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

def analyze_profile(profile_text: str) -> dict:
    prompt = f"""Analyze this freelancer profile and return JSON only:
{profile_text}

Return this exact JSON format:
{{
  "score": 7,
  "strengths": ["point 1", "point 2"],
  "weaknesses": ["point 1", "point 2"],
  "suggestions": ["action 1", "action 2"]
}}"""

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {"role": "user", "content": prompt}
        ],
        response_format={"type": "json_object"}
    )

    content = response.choices[0].message.content
    return json.loads(content)