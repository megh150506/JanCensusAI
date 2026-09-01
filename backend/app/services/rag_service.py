import uuid
from typing import Dict, List, Tuple
from app.schemas.citizen_schema import ChatRequest, ChatResponse
from app.services.gemini_service import generate_text_async

# Authoritative Census 2027 Knowledge Base
CENSUS_KNOWLEDGE_BASE = [
    {
        "id": "kb_phases",
        "title": "Census 2027: Phase 1 vs Phase 2",
        "keywords": ["phase 1", "phase 2", "difference", "house listing", "housing census", "population enumeration", "phases", "schedule"],
        "content": (
            "The Census of India 2027 is conducted in two distinct phases:\n"
            "1. Phase 1: House Listing and Housing Census (HLH) & NPR Update.\n"
            "   - Focuses on identifying and listing all buildings, houses, and household amenities.\n"
            "   - Gathers data on 31 parameters including dwelling wall/roof material, drinking water source, "
            "lighting, latrine availability, drainage, cooking fuel, and household assets (radio, TV, vehicle, internet).\n"
            "   - Features digital geo-tagging of structures.\n"
            "2. Phase 2: Population Enumeration (PE).\n"
            "   - Conducted subsequently to count every individual residing within the territory of India.\n"
            "   - Gathers socio-demographic, cultural, and economic data: age, sex, marital status, religion, "
            "mother tongue, other languages known, literacy, educational attainment, occupation/economic activity, "
            "migration reasons, and fertility metrics."
        ),
        "source": "Office of the Registrar General & Census Commissioner, India - Operational Manual 2027"
    },
    {
        "id": "kb_confidentiality",
        "title": "Data Privacy & Confidentiality under Census Act 1948",
        "keywords": ["confidentiality", "privacy", "census act 1948", "section 15", "court", "tax", "police", "safe", "aadhaar", "security", "legal"],
        "content": (
            "Under the Census Act 1948 (specifically Section 15), all individual information collected during the Census "
            "is strictly confidential by law.\n"
            "- Census records are NOT open to inspection nor admissible as evidence in any court of law.\n"
            "- Individual data cannot be accessed by or shared with police, income tax authorities, judiciary, or third-party agencies.\n"
            "- Only aggregated statistical summaries are published at national, state, district, and ward levels.\n"
            "- Section 11 of the Census Act prescribes severe penalties and imprisonment for any census officer who discloses citizen data."
        ),
        "source": "The Census Act, 1948 (Act No. 37 of 1948), Section 15 & Section 11"
    },
    {
        "id": "kb_self_enumeration",
        "title": "Digital Self-Enumeration Portal Guidelines",
        "keywords": ["self enumeration", "self-enumerate", "online", "portal", "qr code", "se id", "mobile", "fill form", "digital"],
        "content": (
            "Census 2027 introduces a nationwide Digital Self-Enumeration (SE) facility:\n"
            "1. Citizens can log in to the official JanCensus portal using their verified mobile number and OTP.\n"
            "2. Fill in household details and family member particulars online at their own convenience.\n"
            "3. Upon successful submission, a unique Self-Enumeration ID (format: SE-2027-XXXXXX) and a digital QR Code acknowledgment are generated.\n"
            "4. When the field enumerator visits the residence, the household simply shows the QR code or SE ID. The enumerator scans it to instantly synchronize and verify the records, taking less than 2 minutes."
        ),
        "source": "Digital India - Census 2027 Self-Enumeration User Handbook"
    },
    {
        "id": "kb_documents_fees",
        "title": "Documents Required and Zero-Fee Policy",
        "keywords": ["documents", "proof", "fee", "cost", "money", "payment", "id proof", "certificate", "free"],
        "content": (
            "Crucial guidelines for citizens regarding Census 2027:\n"
            "- NO DOCUMENTATION REQUIRED: Citizens are NOT required to submit or show physical document proofs (such as birth certificates, property deeds, or passport) to the enumerator.\n"
            "- Information is recorded based on voluntary, truthful self-declaration by the head/members of the family.\n"
            "- ZERO FEE / COMPLETELY FREE: The Census process is 100% free of cost. No enumerator or official is authorized to charge any fee. Beware of fraudulent agents claiming processing fees."
        ),
        "source": "Public Information Bureau & Ministry of Home Affairs Advisory 2027"
    }
]


def retrieve_relevant_context(query: str) -> Tuple[str, List[str]]:
    """
    Retrieve top relevant knowledge chunks based on query keyword overlap.
    """
    query_lower = query.lower()
    scored_items = []

    for item in CENSUS_KNOWLEDGE_BASE:
        score = 0
        for kw in item["keywords"]:
            if kw in query_lower:
                score += 3
        # Additional partial word match
        for word in query_lower.split():
            if len(word) > 3 and word in item["content"].lower():
                score += 1

        scored_items.append((score, item))

    # Sort by score descending
    scored_items.sort(key=lambda x: x[0], reverse=True)

    # Take top matches (or all if query is generic)
    selected = [item for score, item in scored_items if score > 0]
    if not selected:
        selected = [CENSUS_KNOWLEDGE_BASE[0], CENSUS_KNOWLEDGE_BASE[1]]

    context_text = "\n\n".join([f"### {item['title']} (Source: {item['source']}):\n{item['content']}" for item in selected])
    sources = list({item["source"] for item in selected})
    return context_text, sources


async def answer_citizen_query(request: ChatRequest) -> ChatResponse:
    """
    Grounded RAG QA service for answering citizen inquiries regarding Census 2027.
    """
    conv_id = request.conversation_id or str(uuid.uuid4())
    context_text, sources = retrieve_relevant_context(request.query)

    system_instruction = (
        "You are 'JanCensus AI Mitra', the official, authoritative virtual assistant for Census of India 2027. "
        "Your mission is to provide accurate, reassuring, and concise information to citizens based strictly on Indian Census regulations. "
        "Always emphasize that:\n"
        "1. Census participation is completely safe and data is strictly confidential under Section 15 of Census Act 1948.\n"
        "2. No documents or fees are required.\n"
        "3. Digital self-enumeration provides an easy SE ID / QR code to save time during enumerator visits.\n"
        "Respond in a polite, structured, and helpful tone."
    )

    prompt = f"""
Official Census Knowledge Base Context:
{context_text}

Citizen Query:
"{request.query}"

Please provide a clear, structured answer addressing the citizen's query accurately based on the official context.
Language requested: {request.language or 'en'}.
"""

    ai_response = await generate_text_async(
        prompt=prompt,
        system_instruction=system_instruction,
        temperature=0.2
    )

    # If Gemini returns response, use it
    if ai_response and len(ai_response.strip()) > 10:
        answer = ai_response.strip()
    else:
        # High quality grounded fallback response
        q_low = request.query.lower()
        if "phase" in q_low or "difference" in q_low:
            answer = (
                "**Census 2027 is conducted in two primary phases:**\n\n"
                "• **Phase 1 (House Listing & Housing Census):** Field enumerators list all residential and commercial buildings, recording 31 housing conditions (amenities, drinking water, lighting, sanitation, assets) with digital geo-tagging.\n\n"
                "• **Phase 2 (Population Enumeration):** Detailed counting of every individual, recording age, gender, education, occupation, languages, and migration.\n\n"
                "You can also use the digital Self-Enumeration portal to pre-fill your household data before enumerator visits!"
            )
        elif "confidential" in q_low or "privacy" in q_low or "act" in q_low or "safe" in q_low:
            answer = (
                "**Your data is 100% protected by law under the Census Act 1948 (Section 15).**\n\n"
                "• Individual census responses are strictly confidential and **cannot be accessed by police, tax authorities, or courts of law**.\n"
                "• No individual information is ever published; only aggregated statistics at district/state level are released.\n"
                "• Any census officer who violates data confidentiality faces criminal prosecution under Section 11 of the Act."
            )
        elif "self" in q_low or "portal" in q_low or "online" in q_low or "qr" in q_low:
            answer = (
                "**Digital Self-Enumeration for Census 2027:**\n\n"
                "1. Visit the JanCensus portal and log in with your mobile OTP.\n"
                "2. Complete the online questionnaire for your household.\n"
                "3. You will receive a unique **SE Reference ID (e.g., SE-2027-XXXXXX)** and a **QR Code**.\n"
                "4. When the field enumerator visits, simply show the QR Code for instant verification in under 2 minutes."
            )
        elif "fee" in q_low or "cost" in q_low or "document" in q_low or "proof" in q_low:
            answer = (
                "**Important Advisory:**\n\n"
                "• **No Documents Required:** You do not need to show birth certificates, title deeds, or ID proofs to enumerators. Responses are recorded on voluntary declaration.\n"
                "• **Completely Free:** Census 2027 is 100% free of charge. Never pay any fee or share bank OTPs with anyone."
            )
        else:
            answer = (
                f"Thank you for contacting JanCensus AI. Census 2027 is India's 16th national census and the first fully digital enumeration.\n\n"
                f"**Key Highlights:**\n"
                f"• Phase 1: House Listing & Housing Census (HLH)\n"
                f"• Phase 2: Population Enumeration (PE)\n"
                f"• Complete confidentiality under Section 15 of Census Act 1948.\n"
                f"• Convenient digital Self-Enumeration portal with QR verification."
            )

    suggested_followups = [
        "What is the difference between Phase 1 and Phase 2?",
        "Is my personal census information confidential under law?",
        "How do I complete Digital Self-Enumeration to get a QR code?",
        "Do I need to show identity proofs to the census enumerator?"
    ]

    return ChatResponse(
        answer=answer,
        conversation_id=conv_id,
        sources=sources,
        suggested_followups=suggested_followups
    )
