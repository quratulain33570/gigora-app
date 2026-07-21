import os
from dotenv import load_dotenv
from groq import Groq

# 1. Load the variables FIRST!
load_dotenv()

# 2. THEN initialize the client
client = Groq(api_key=os.getenv('GROQ_API_KEY'))

def generate_proposal(job_post: str) -> str:
    completion = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "user",
                "content": f"You are an expert freelancer proposal writer. Write a professional, personalized proposal for this job:\n{job_post}\nMake it compelling, specific, and under 200 words."
            }
        ],
        temperature=0.7,
        max_tokens=1000
    )
    return completion.choices[0].message.content