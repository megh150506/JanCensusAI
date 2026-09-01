from fastapi import APIRouter, HTTPException, status
from app.schemas.admin_schema import AnalyticsResponse, CampaignRequest, CampaignResponse
from app.services.analytics_service import get_regional_analytics_data
from app.services.campaign_service import generate_campaign_materials

router = APIRouter(prefix="/admin", tags=["Administrator Tools & Regional Analytics"])


@router.post(
    "/campaign",
    response_model=CampaignResponse,
    status_code=status.HTTP_200_OK,
    summary="Generate AI Campaign Communications",
    description="Generates tailored multi-channel campaign collateral (SMS, Social Media Posts, and Official Bulletins) for local administrators using Gemini 2.5 Flash."
)
async def generate_campaign(request: CampaignRequest) -> CampaignResponse:
    try:
        campaign = await generate_campaign_materials(request)
        return campaign
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to generate campaign materials: {str(exc)}"
        )


@router.get(
    "/analytics",
    response_model=AnalyticsResponse,
    status_code=status.HTTP_200_OK,
    summary="Get Regional Engagement Analytics Dashboard",
    description="Returns aggregate progress metrics, self-enumeration rates, field surveyor counts, and rumor debunking stats across Indian states with demonstration disclaimer."
)
async def get_analytics() -> AnalyticsResponse:
    try:
        analytics = get_regional_analytics_data()
        return analytics
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to fetch analytics data: {str(exc)}"
        )
