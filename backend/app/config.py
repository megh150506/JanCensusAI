import os
from typing import List
from dotenv import load_dotenv
from pydantic import BaseModel, Field

# Load environment variables from .env file
load_dotenv()

class Settings(BaseModel):
    PROJECT_NAME: str = "JanCensus AI - Census 2027 Intelligent Platform"
    PROJECT_VERSION: str = "1.0.0"
    GEMINI_API_KEY: str = Field(default_factory=lambda: os.getenv("GEMINI_API_KEY", ""))
    GEMINI_MODEL: str = "gemini-2.5-flash"
    PORT: int = Field(default_factory=lambda: int(os.getenv("PORT", "8000")))
    ENVIRONMENT: str = Field(default_factory=lambda: os.getenv("ENVIRONMENT", "development"))
    CORS_ORIGINS: List[str] = [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "*"
    ]

    @property
    def is_gemini_configured(self) -> bool:
        return bool(
            self.GEMINI_API_KEY
            and self.GEMINI_API_KEY != "your_actual_api_key_here"
            and not self.GEMINI_API_KEY.startswith("your_actual_")
        )

settings = Settings()
