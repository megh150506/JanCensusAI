from datetime import datetime
from typing import List, Literal, Optional
from pydantic import BaseModel, Field


class RumorCheckRequest(BaseModel):
    claim: str = Field(
        ...,
        min_length=3,
        description="Rumor or claim text to be verified regarding Census 2027",
        example="I received a WhatsApp message saying enumerators will collect bank passwords and charge 500 rupees fee for self-enumeration."
    )
    source_url: Optional[str] = Field(None, description="Optional URL or social media post link where the rumor was seen")
    language: Optional[str] = Field("en", description="Preferred response language")
    claimed_location: Optional[str] = Field(None, description="State or district where this rumor is circulating")


class RumorCheckResponse(BaseModel):
    claim: str = Field(..., description="The verified claim statement")
    verdict: Literal["FACT", "MISINFORMATION", "PARTIALLY_ACCURATE"] = Field(
        ...,
        description="Authoritative verdict on the claim"
    )
    official_explanation: str = Field(
        ...,
        description="Comprehensive official explanation referencing legal and administrative guidelines"
    )
    source_reference: str = Field(
        ...,
        description="Official reference (e.g., 'Census Act 1948, Section 15', 'Office of the Registrar General of India Notice No. 2026/04')"
    )
    debunk_points: List[str] = Field(
        default_factory=list,
        description="Key bullet points debunking or clarifying the rumor"
    )
    warning_alert: Optional[str] = Field(
        None,
        description="Cautionary notice for the public (e.g., 'Never share OTPs/banking credentials with any field worker')"
    )
    verified_at: str = Field(default_factory=lambda: datetime.utcnow().isoformat())
