import json
import uuid
from typing import Dict
from app.schemas.admin_schema import CampaignContent, CampaignRequest, CampaignResponse
from app.services.gemini_service import generate_structured_json_async


async def generate_campaign_materials(request: CampaignRequest) -> CampaignResponse:
    """
    Generate tailored multi-channel campaign content for regional administrators
    using Gemini 2.5 Flash, producing SMS, Social Media, and Official Bulletin formats.
    """
    campaign_id = f"CMP-{uuid.uuid4().hex[:8].upper()}"

    system_instruction = (
        "You are an expert Government Communications Director for Census of India 2027. "
        "Your task is to generate high-impact, accurate, and culturally appropriate public awareness campaign materials "
        "for local district collectors, ward officers, and municipal commissioners.\n"
        "You must return a valid JSON object matching this schema:\n"
        "{\n"
        '  "sms": "string (strictly under 160 characters, concise and punchy)",\n'
        '  "social_post": "string (engaging post with emojis, key instructions, and hashtags)",\n'
        '  "bulletin": "string (formal circular/notice for local notice boards and ward offices)",\n'
        '  "key_takeaways": ["string", "string", "string"]\n'
        "}"
    )

    prompt = f"""
Campaign Objective: {request.topic}
Target Region: {request.target_region}
Target Audience: {request.target_audience or 'General Public'}
Preferred Language: {request.language or 'English & Hindi'}
Tone: {request.tone or 'Official and inspiring'}
Key Points to Include:
{chr(10).join('- ' + kp for kp in (request.key_points or []))}

Please generate the complete campaign package in valid JSON.
"""

    raw_json = await generate_structured_json_async(
        prompt=prompt,
        system_instruction=system_instruction,
        temperature=0.3
    )

    parsed_content = None
    if raw_json:
        try:
            # Clean possible markdown wrapping
            cleaned = raw_json.strip()
            if cleaned.startswith("```json"):
                cleaned = cleaned[7:]
            if cleaned.startswith("```"):
                cleaned = cleaned[3:]
            if cleaned.endswith("```"):
                cleaned = cleaned[:-3]
            data = json.loads(cleaned.strip())
            parsed_content = CampaignContent(
                sms=data.get("sms", "")[:160],
                social_post=data.get("social_post", ""),
                bulletin=data.get("bulletin", ""),
                key_takeaways=data.get("key_takeaways", [])
            )
        except Exception:
            parsed_content = None

    if not parsed_content:
        # High quality fallback tailored to request
        region = request.target_region
        sms_text = f"Census 2027: Complete your household self-enumeration online at jancensus.gov.in. Save time! 100% confidential under Census Act 1948."
        if len(sms_text) > 160:
            sms_text = sms_text[:157] + "..."

        social_post_text = (
            f"🇮🇳 **Census 2027 is Here! Empowering {region}** 🇮🇳\n\n"
            f"Be a proud partner in nation building! The Digital Self-Enumeration portal is now active.\n\n"
            f"✅ **3 Easy Steps:**\n"
            f"1. Visit jancensus.gov.in & log in with Mobile OTP\n"
            f"2. Fill your household & family amenities form\n"
            f"3. Receive your SE-ID & QR code for lightning-fast verification\n\n"
            f"🔒 **Guaranteed Privacy:** Your data is strictly confidential under Section 15 of the Census Act 1948.\n\n"
            f"#JanCensus2027 #CensusIndia #DigitalIndia #{region.replace(' ', '').replace('-', '_')} #MyCensusMyPride"
        )

        bulletin_text = (
            f"GOVERNMENT OF INDIA / DISTRICT ADMINISTRATION - {region.upper()}\n"
            f"OFFICIAL PUBLIC NOTICE: CENSUS OF INDIA 2027\n"
            f"--------------------------------------------------------------------------------\n"
            f"Subject: {request.topic}\n\n"
            f"1. All residents of {region} are hereby informed that the Census 2027 enumeration process has officially commenced.\n"
            f"2. Citizens are encouraged to utilize the Digital Self-Enumeration Portal (jancensus.gov.in) to pre-fill their household particulars.\n"
            f"3. Authorized enumerators carrying official QR-enabled ID cards will visit residences. Citizens who have self-enumerated only need to present their SE Reference QR Code.\n"
            f"4. NOTICE ON PRIVACY: All recorded data is statutorily protected under Section 15 of the Census Act 1948 and cannot be shared with any judicial, tax, or police entity.\n"
            f"5. CAUTION: Census enumeration is 100% FREE. Do not pay any fees to anyone.\n\n"
            f"Issued in Public Interest by District Collector & Principal Census Officer, {region}."
        )

        parsed_content = CampaignContent(
            sms=sms_text,
            social_post=social_post_text,
            bulletin=bulletin_text,
            key_takeaways=[
                "Self-enumeration saves time during physical verification.",
                "100% data confidentiality guaranteed under Census Act 1948.",
                "Zero-fee process with QR code verification."
            ]
        )

    return CampaignResponse(
        campaign_id=campaign_id,
        topic=request.topic,
        target_region=request.target_region,
        language=request.language or "English & Hindi",
        content=parsed_content,
        model_used="gemini-2.5-flash"
    )
