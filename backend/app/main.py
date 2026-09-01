from fastapi import FastAPI, status
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.api.ai import router as ai_router
from app.api.citizen import router as citizen_router
from app.api.admin import router as admin_router
from app.api.schedule import router as schedule_router
from app.api.misinformation import router as misinformation_router

# Initialize FastAPI Application
app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.PROJECT_VERSION,
    description=(
        "Production-ready backend API for JanCensus AI — India's Census 2027 Intelligent Citizen & Administrative Platform. "
        "Powered by Google Gemini 2.5 Flash, grounded RAG knowledge base, digital self-enumeration workflows, "
        "regional administration campaign generation, and misinformation fact-checking."
    ),
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_url="/openapi.json"
)

# CORS Middleware Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register All API Routers under prefix /api/v1
API_V1_PREFIX = "/api/v1"

app.include_router(ai_router, prefix=API_V1_PREFIX)
app.include_router(citizen_router, prefix=API_V1_PREFIX)
app.include_router(admin_router, prefix=API_V1_PREFIX)
app.include_router(schedule_router, prefix=API_V1_PREFIX)
app.include_router(misinformation_router, prefix=API_V1_PREFIX)


@app.get(
    "/",
    status_code=status.HTTP_200_OK,
    tags=["Root & Health"],
    summary="Root API Discovery"
)
async def root():
    return {
        "project": settings.PROJECT_NAME,
        "version": settings.PROJECT_VERSION,
        "environment": settings.ENVIRONMENT,
        "documentation": "/docs",
        "gemini_model": settings.GEMINI_MODEL,
        "gemini_active": settings.is_gemini_configured,
        "endpoints": {
            "ai_chat": "/api/v1/ai/chat",
            "self_enumeration": "/api/v1/citizen/self-enumerate",
            "admin_campaign": "/api/v1/admin/campaign",
            "admin_analytics": "/api/v1/admin/analytics",
            "schedules_all": "/api/v1/schedule/all",
            "schedule_by_state": "/api/v1/schedule/{state_name}",
            "misinformation_verify": "/api/v1/misinformation/verify"
        }
    }


@app.get(
    "/health",
    status_code=status.HTTP_200_OK,
    tags=["Root & Health"],
    summary="Service Health Check"
)
async def health_check():
    return {
        "status": "healthy",
        "service": "jancensus-backend",
        "version": settings.PROJECT_VERSION,
        "gemini_ready": settings.is_gemini_configured,
        "model": settings.GEMINI_MODEL
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=settings.PORT, reload=True)
