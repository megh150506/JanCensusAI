from fastapi import APIRouter, HTTPException, status
from app.schemas.citizen_schema import ChatRequest, ChatResponse
from app.services.rag_service import answer_citizen_query

router = APIRouter(prefix="/ai", tags=["AI & Citizen Assistance"])


@router.post(
    "/chat",
    response_model=ChatResponse,
    status_code=status.HTTP_200_OK,
    summary="Interactive Citizen Census Chatbot",
    description="Grounded conversational AI for Census 2027 answering queries on Phase 1 vs 2, legal confidentiality under Census Act 1948, and digital self-enumeration."
)
async def chat_with_census_ai(request: ChatRequest) -> ChatResponse:
    try:
        response = await answer_citizen_query(request)
        return response
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An error occurred while processing your request: {str(exc)}"
        )
