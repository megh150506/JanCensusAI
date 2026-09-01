from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel, Field


class ChatRequest(BaseModel):
    query: str = Field(..., min_length=1, description="Citizen query regarding Census 2027", example="What is the difference between Phase 1 and Phase 2?")
    conversation_id: Optional[str] = Field(None, description="Optional conversation tracking ID")
    language: Optional[str] = Field("en", description="Preferred response language (e.g., 'en', 'hi', 'mr', 'ta')")
    context_state: Optional[str] = Field(None, description="Citizen's state or UT for localized context")


class ChatResponse(BaseModel):
    answer: str = Field(..., description="Grounded AI answer to the citizen inquiry")
    conversation_id: str = Field(..., description="Active conversation tracking ID")
    sources: List[str] = Field(default_factory=list, description="Authoritative reference documents / Census Act provisions")
    suggested_followups: List[str] = Field(default_factory=list, description="Relevant recommended follow-up questions")
    timestamp: str = Field(default_factory=lambda: datetime.utcnow().isoformat())


class FamilyMember(BaseModel):
    full_name: str = Field(..., example="Aarav Sharma")
    relationship_to_head: str = Field(..., example="Self / Spouse / Son / Daughter")
    gender: str = Field(..., example="Male / Female / Transgender")
    age: int = Field(..., ge=0, le=130, example=34)
    marital_status: Optional[str] = Field("Married", example="Married")
    education_level: Optional[str] = Field("Graduate", example="Graduate")
    occupation: Optional[str] = Field("Private Sector", example="Private Sector")


class SelfEnumRequest(BaseModel):
    head_name: str = Field(..., min_length=2, description="Full Name of the Head of the Household", example="Rajesh Sharma")
    mobile_number: str = Field(..., min_length=10, max_length=15, description="10-digit primary mobile number for OTP/SMS", example="9876543210")
    email: Optional[str] = Field(None, description="Optional email address for e-acknowledgment", example="rajesh.sharma@example.com")
    state: str = Field(..., example="Maharashtra")
    district: str = Field(..., example="Pune")
    sub_district: Optional[str] = Field("Haveli", example="Haveli")
    town_village: Optional[str] = Field("Pune City", example="Pune City")
    pincode: str = Field(..., min_length=6, max_length=6, example="411001")
    house_number: str = Field(..., example="Flat 402, Shivneri Residency, MG Road")
    dwelling_type: str = Field("Pucca / Permanent Building", example="Pucca / Permanent Building")
    drinking_water_source: Optional[str] = Field("Treated Tap Water within premises", example="Treated Tap Water within premises")
    electricity_source: Optional[str] = Field("State Electricity Board", example="State Electricity Board")
    latrine_facility: Optional[str] = Field("Flush / Pour Flush Latrine Connected to Sewerage", example="Flush / Pour Flush Latrine Connected to Sewerage")
    total_family_members: int = Field(1, ge=1, le=50, example=4)
    members: List[FamilyMember] = Field(default_factory=list, description="Details of family members living in the household")
    preferred_language: Optional[str] = Field("English", example="English")


class SelfEnumResponse(BaseModel):
    success: bool = True
    se_id: str = Field(..., description="Unique Self-Enumeration Reference ID (format: SE-2027-XXXXXX)", example="SE-2027-948201")
    head_name: str
    submission_timestamp: str = Field(default_factory=lambda: datetime.utcnow().isoformat())
    status: str = Field("SUBMITTED_DIGITALLY", description="Status of the self-enumeration entry")
    qr_code_link: str = Field(..., description="Verification payload URL / mock QR data for field enumerator scanning")
    acknowledgment_url: str = Field(..., description="Link to download the e-Acknowledgment slip")
    message: str = Field("Self-enumeration recorded successfully. Please present your SE ID or QR code when the field enumerator visits.", description="Status message")
