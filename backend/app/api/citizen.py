import random
import string
import urllib.parse
from datetime import datetime
from fastapi import APIRouter, HTTPException, status
from app.schemas.citizen_schema import SelfEnumRequest, SelfEnumResponse

router = APIRouter(prefix="/citizen", tags=["Citizen Portal & Self-Enumeration"])


def generate_se_id() -> str:
    """Generate official Census 2027 format Self-Enumeration ID: SE-2027-XXXXXX"""
    random_part = "".join(random.choices(string.ascii_uppercase + string.digits, k=6))
    return f"SE-2027-{random_part}"


@router.post(
    "/self-enumerate",
    response_model=SelfEnumResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Submit Household Digital Self-Enumeration",
    description="Submits citizen self-enumeration questionnaire and returns generated SE Reference ID (SE-2027-XXXXXX) and verification QR code payload."
)
async def submit_self_enumeration(request: SelfEnumRequest) -> SelfEnumResponse:
    try:
        se_id = generate_se_id()
        timestamp = datetime.utcnow().isoformat()

        # Generate mock QR code verification link
        qr_payload = {
            "se_id": se_id,
            "head": request.head_name,
            "members": request.total_family_members,
            "district": request.district,
            "state": request.state,
            "pincode": request.pincode
        }
        encoded_data = urllib.parse.quote(str(qr_payload))
        qr_link = f"https://api.qrserver.com/v1/create-qr-code/?size=250x250&data={encoded_data}"
        acknowledgment_url = f"/api/v1/citizen/acknowledgment/{se_id}"

        return SelfEnumResponse(
            success=True,
            se_id=se_id,
            head_name=request.head_name,
            submission_timestamp=timestamp,
            status="SUBMITTED_DIGITALLY",
            qr_code_link=qr_link,
            acknowledgment_url=acknowledgment_url,
            message=(
                f"Congratulations {request.head_name}! Your household self-enumeration has been registered under {se_id}. "
                "Please save this reference or QR code to show to the enumerator during physical verification."
            )
        )
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to submit self-enumeration: {str(exc)}"
        )
