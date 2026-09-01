import asyncio
import logging
from typing import Any, Optional
from app.config import settings

logger = logging.getLogger("census_ai.gemini")

# Lazy client initialization
_genai_client = None

def get_genai_client():
    global _genai_client
    if _genai_client is None:
        try:
            from google import genai
            if settings.is_gemini_configured:
                _genai_client = genai.Client(api_key=settings.GEMINI_API_KEY)
                logger.info("Google GenAI client initialized with provided GEMINI_API_KEY.")
            else:
                logger.warning("GEMINI_API_KEY is not configured or is a placeholder. Operating in fallback demo mode.")
                _genai_client = None
        except Exception as exc:
            logger.error(f"Failed to initialize Google GenAI client: {exc}")
            _genai_client = None
    return _genai_client


async def generate_text_async(
    prompt: str,
    system_instruction: Optional[str] = None,
    temperature: float = 0.3
) -> Optional[str]:
    """
    Asynchronously generate text using Google GenAI SDK with gemini-2.5-flash.
    Returns None if GenAI client is unavailable or encounters an error.
    """
    client = get_genai_client()
    if not client:
        return None

    try:
        def _sync_call():
            config = {}
            if system_instruction:
                config["system_instruction"] = system_instruction
            if temperature is not None:
                config["temperature"] = temperature

            # Call gemini-2.5-flash via modern GenAI client
            response = client.models.generate_content(
                model=settings.GEMINI_MODEL,
                contents=prompt,
                config=config if config else None
            )
            return response.text if response else None

        # Execute in threadpool to ensure non-blocking async execution
        result = await asyncio.to_thread(_sync_call)
        return result
    except Exception as exc:
        logger.error(f"Error during Gemini text generation: {exc}", exc_info=True)
        return None


async def generate_structured_json_async(
    prompt: str,
    system_instruction: Optional[str] = None,
    temperature: float = 0.2
) -> Optional[str]:
    """
    Asynchronously generate structured JSON response using gemini-2.5-flash.
    """
    client = get_genai_client()
    if not client:
        return None

    try:
        def _sync_call():
            config = {
                "response_mime_type": "application/json",
                "temperature": temperature
            }
            if system_instruction:
                config["system_instruction"] = system_instruction

            response = client.models.generate_content(
                model=settings.GEMINI_MODEL,
                contents=prompt,
                config=config
            )
            return response.text if response else None

        result = await asyncio.to_thread(_sync_call)
        return result
    except Exception as exc:
        logger.error(f"Error during Gemini structured JSON generation: {exc}", exc_info=True)
        return None
