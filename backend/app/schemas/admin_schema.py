from datetime import datetime
from typing import Dict, List, Optional
from pydantic import BaseModel, Field


class CampaignRequest(BaseModel):
    topic: str = Field(..., min_length=3, description="Topic or objective of the campaign", example="Awareness drive for Self-Enumeration portal and Phase 1 House Listing")
    target_region: str = Field(..., description="Target state, district, or municipal zone", example="Maharashtra - Pune District")
    target_audience: Optional[str] = Field("General Citizens & Resident Welfare Associations", description="Intended audience profile")
    language: Optional[str] = Field("English & Hindi", description="Preferred output language(s)", example="English & Marathi")
    tone: Optional[str] = Field("Official, encouraging, and clear", description="Tone of the communication")
    key_points: Optional[List[str]] = Field(
        default_factory=lambda: [
            "Digital self-enumeration portal is open from March 1st",
            "Saves time during physical enumerator visit",
            "Data is 100% confidential under Census Act 1948",
            "Free of charge - Beware of fake fee demands"
        ],
        description="Key information points to emphasize"
    )


class CampaignContent(BaseModel):
    sms: str = Field(..., description="Short message for SMS broadcasting (strictly under 160 characters)")
    social_post: str = Field(..., description="Engaging social media post with relevant hashtags and call to action")
    bulletin: str = Field(..., description="Official administrative bulletin/notice for local panchayats, wards, and news boards")
    key_takeaways: List[str] = Field(default_factory=list, description="Key summary bullets from the generated materials")


class CampaignResponse(BaseModel):
    campaign_id: str = Field(..., description="Unique generated campaign reference ID")
    topic: str
    target_region: str
    language: str
    generated_at: str = Field(default_factory=lambda: datetime.utcnow().isoformat())
    content: CampaignContent
    model_used: str = Field("gemini-2.5-flash", description="Model used for content generation")


# Analytics Schemas
class RegionProgress(BaseModel):
    region_name: str
    state: str
    total_households_target: int
    self_enumerated_count: int
    self_enumeration_pct: float
    physical_verified_count: int
    active_enumerators: int
    rumors_flagged_count: int
    phase_status: str  # e.g., "Phase 1 - In Progress"


class DailyTrend(BaseModel):
    date: str
    self_enumerations: int
    physical_verifications: int


class AnalyticsResponse(BaseModel):
    disclaimer: str = Field("Demonstration Dashboard — Aggregated & Mock Data", description="Mandatory prototype disclaimer")
    total_national_target_households: int
    total_self_enumerated: int
    national_self_enum_rate_pct: float
    active_field_enumerators: int
    total_rumors_debunked: int
    regions_breakdown: List[RegionProgress]
    daily_trends: List[DailyTrend]
    top_performing_districts: List[str]
    last_updated: str = Field(default_factory=lambda: datetime.utcnow().isoformat())
