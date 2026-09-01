from fastapi import APIRouter, HTTPException, status
from app.schemas.misinformation_schema import RumorCheckRequest, RumorCheckResponse
from app.services.misinformation_service import verify_census_claim

router = APIRouter(prefix="/misinformation", tags=["Misinformation & Rumor Verification"])


@router.post(
    "/verify",
    response_model=RumorCheckResponse,
    status_code=status.HTTP_200_OK,
    summary="Verify Census 2027 Rumors or Claims",
    description="Fact-checks viral rumors and public claims using Gemini 2.5 Flash against statutory provisions of the Census Act 1948, returning verdict, official explanation, and legal citations."
)
async def verify_rumor(request: RumorCheckRequest) -> RumorCheckResponse:
    try:
        response = await verify_census_claim(request)
        return response
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to verify claim: {str(exc)}"
        )
