import json
import os
from dotenv import load_dotenv
import google.generativeai as genai
from groq import Groq

# 🔑 Load environment variables from .env
load_dotenv()

# Initialize Groq Client
groq_client = Groq(api_key=os.getenv("GROQ_API_KEY"))

# 🔄 Gemini API Backup Keys Pool
GEMINI_KEYS = [
    os.getenv("GEMINI_API_KEY_1"),
    os.getenv("GEMINI_API_KEY_2"),
    os.getenv("GEMINI_API_KEY_3"),
]


def _generate_with_groq(prompt: str) -> str:
  """Attempt generation using Groq API as primary service."""
  response = groq_client.chat.completions.create(
      model="llama-3.3-70b-versatile",
      messages=[{"role": "user", "content": prompt}],
      response_format={"type": "json_object"},
  )
  return response.choices[0].message.content


def _generate_with_gemini(prompt: str) -> str:
  """Fallback generation using Gemini API with key rotation."""
  for key in GEMINI_KEYS:
    if not key:
      continue
    try:
      genai.configure(api_key=key)
      model = genai.GenerativeModel("gemini-1.5-flash")
      response = model.generate_content(
          prompt, generation_config={"response_mime_type": "application/json"}
      )
      return response.text
    except Exception as e:
      # If rate limited (429) or quota exceeded, try the next Gemini key
      if "429" in str(e) or "quota" in str(e).lower():
        continue
      raise e

  raise Exception("🚨 All Groq and Gemini API keys exhausted or failing!")


def generate_json_completion(prompt: str) -> dict:
  """Tries Groq first.

  If Groq fails/hits limits, falls back to Gemini!
  """
  try:
    # 1. Try Primary: Groq ⚡
    content = _generate_with_groq(prompt)
    return json.loads(content)
  except Exception as groq_err:
    print(
        f"⚠️ Groq primary service failed/limited: {groq_err}. Falling back to"
        " Gemini..."
    )

    try:
      # 2. Fallback: Gemini 🛡️
      content = _generate_with_gemini(prompt)
      return json.loads(content)
    except Exception as gemini_err:
      raise Exception(
          f"Both AI primary and fallback providers failed! Error: {gemini_err}"
      )


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

  return generate_json_completion(prompt)