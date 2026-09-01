from typing import Dict, List, Optional
from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel, Field

router = APIRouter(prefix="/schedule", tags=["Census 2027 State & District Schedules"])


class DistrictSchedule(BaseModel):
    district_name: str
    phase1_start: str
    phase1_end: str
    phase2_start: str
    phase2_end: str
    self_enumeration_open: str
    self_enumeration_close: str
    status: str


class StateSchedule(BaseModel):
    state_name: str
    state_code: str
    phase1_houselisting_window: str
    phase2_population_enumeration_window: str
    self_enumeration_window: str
    current_status: str
    total_districts: int
    nodal_officer: str
    helpline: str
    districts: List[DistrictSchedule] = Field(default_factory=list)


STATE_SCHEDULES_DATA: Dict[str, StateSchedule] = {
    "maharashtra": StateSchedule(
        state_name="Maharashtra",
        state_code="MH",
        phase1_houselisting_window="April 1, 2027 – May 15, 2027",
        phase2_population_enumeration_window="February 9, 2028 – February 28, 2028",
        self_enumeration_window="March 1, 2027 – March 31, 2027",
        current_status="Phase 1 - Active Verification",
        total_districts=36,
        nodal_officer="Director of Census Operations, Maharashtra",
        helpline="1800-11-2027",
        districts=[
            DistrictSchedule(
                district_name="Pune",
                phase1_start="2027-04-01",
                phase1_end="2027-05-15",
                phase2_start="2028-02-09",
                phase2_end="2028-02-28",
                self_enumeration_open="2027-03-01",
                self_enumeration_close="2027-03-31",
                status="Phase 1 Active"
            ),
            DistrictSchedule(
                district_name="Mumbai Suburban",
                phase1_start="2027-04-01",
                phase1_end="2027-05-15",
                phase2_start="2028-02-09",
                phase2_end="2028-02-28",
                self_enumeration_open="2027-03-01",
                self_enumeration_close="2027-03-31",
                status="Phase 1 Active"
            ),
            DistrictSchedule(
                district_name="Nagpur",
                phase1_start="2027-04-10",
                phase1_end="2027-05-25",
                phase2_start="2028-02-09",
                phase2_end="2028-02-28",
                self_enumeration_open="2027-03-10",
                self_enumeration_close="2027-04-09",
                status="Phase 1 Upcoming"
            )
        ]
    ),
    "delhi": StateSchedule(
        state_name="NCT of Delhi",
        state_code="DL",
        phase1_houselisting_window="April 1, 2027 – May 15, 2027",
        phase2_population_enumeration_window="February 9, 2028 – February 28, 2028",
        self_enumeration_window="March 1, 2027 – March 31, 2027",
        current_status="Phase 1 - Active Verification",
        total_districts=11,
        nodal_officer="Director of Census Operations, Delhi",
        helpline="1800-11-2027",
        districts=[
            DistrictSchedule(
                district_name="New Delhi & Central",
                phase1_start="2027-04-01",
                phase1_end="2027-05-15",
                phase2_start="2028-02-09",
                phase2_end="2028-02-28",
                self_enumeration_open="2027-03-01",
                self_enumeration_close="2027-03-31",
                status="Phase 1 Active"
            ),
            DistrictSchedule(
                district_name="South Delhi",
                phase1_start="2027-04-01",
                phase1_end="2027-05-15",
                phase2_start="2028-02-09",
                phase2_end="2028-02-28",
                self_enumeration_open="2027-03-01",
                self_enumeration_close="2027-03-31",
                status="Phase 1 Active"
            )
        ]
    ),
    "uttar pradesh": StateSchedule(
        state_name="Uttar Pradesh",
        state_code="UP",
        phase1_houselisting_window="May 1, 2027 – June 15, 2027",
        phase2_population_enumeration_window="February 9, 2028 – February 28, 2028",
        self_enumeration_window="April 1, 2027 – April 30, 2027",
        current_status="Self-Enumeration Open",
        total_districts=75,
        nodal_officer="Director of Census Operations, Uttar Pradesh",
        helpline="1800-11-2027",
        districts=[
            DistrictSchedule(
                district_name="Lucknow",
                phase1_start="2027-05-01",
                phase1_end="2027-06-15",
                phase2_start="2028-02-09",
                phase2_end="2028-02-28",
                self_enumeration_open="2027-04-01",
                self_enumeration_close="2027-04-30",
                status="Self-Enumeration Active"
            ),
            DistrictSchedule(
                district_name="Varanasi",
                phase1_start="2027-05-01",
                phase1_end="2027-06-15",
                phase2_start="2028-02-09",
                phase2_end="2028-02-28",
                self_enumeration_open="2027-04-01",
                self_enumeration_close="2027-04-30",
                status="Self-Enumeration Active"
            ),
            DistrictSchedule(
                district_name="Gautam Buddha Nagar (Noida)",
                phase1_start="2027-05-01",
                phase1_end="2027-06-15",
                phase2_start="2028-02-09",
                phase2_end="2028-02-28",
                self_enumeration_open="2027-04-01",
                self_enumeration_close="2027-04-30",
                status="Self-Enumeration Active"
            )
        ]
    ),
    "karnataka": StateSchedule(
        state_name="Karnataka",
        state_code="KA",
        phase1_houselisting_window="April 15, 2027 – May 30, 2027",
        phase2_population_enumeration_window="February 9, 2028 – February 28, 2028",
        self_enumeration_window="March 15, 2027 – April 14, 2027",
        current_status="Phase 1 - Active Verification",
        total_districts=31,
        nodal_officer="Director of Census Operations, Karnataka",
        helpline="1800-11-2027",
        districts=[
            DistrictSchedule(
                district_name="Bengaluru Urban",
                phase1_start="2027-04-15",
                phase1_end="2027-05-30",
                phase2_start="2028-02-09",
                phase2_end="2028-02-28",
                self_enumeration_open="2027-03-15",
                self_enumeration_close="2027-04-14",
                status="Phase 1 Active"
            ),
            DistrictSchedule(
                district_name="Mysuru",
                phase1_start="2027-04-15",
                phase1_end="2027-05-30",
                phase2_start="2028-02-09",
                phase2_end="2028-02-28",
                self_enumeration_open="2027-03-15",
                self_enumeration_close="2027-04-14",
                status="Phase 1 Active"
            )
        ]
    ),
    "tamil nadu": StateSchedule(
        state_name="Tamil Nadu",
        state_code="TN",
        phase1_houselisting_window="June 1, 2027 – July 15, 2027",
        phase2_population_enumeration_window="February 9, 2028 – February 28, 2028",
        self_enumeration_window="May 1, 2027 – May 31, 2027",
        current_status="Upcoming Phase 1",
        total_districts=38,
        nodal_officer="Director of Census Operations, Tamil Nadu",
        helpline="1800-11-2027",
        districts=[
            DistrictSchedule(
                district_name="Chennai",
                phase1_start="2027-06-01",
                phase1_end="2027-07-15",
                phase2_start="2028-02-09",
                phase2_end="2028-02-28",
                self_enumeration_open="2027-05-01",
                self_enumeration_close="2027-05-31",
                status="Upcoming Phase 1"
            )
        ]
    ),
    "gujarat": StateSchedule(
        state_name="Gujarat",
        state_code="GJ",
        phase1_houselisting_window="May 1, 2027 – June 15, 2027",
        phase2_population_enumeration_window="February 9, 2028 – February 28, 2028",
        self_enumeration_window="April 1, 2027 – April 30, 2027",
        current_status="Self-Enumeration Open",
        total_districts=33,
        nodal_officer="Director of Census Operations, Gujarat",
        helpline="1800-11-2027",
        districts=[
            DistrictSchedule(
                district_name="Ahmedabad",
                phase1_start="2027-05-01",
                phase1_end="2027-06-15",
                phase2_start="2028-02-09",
                phase2_end="2028-02-28",
                self_enumeration_open="2027-04-01",
                self_enumeration_close="2027-04-30",
                status="Self-Enumeration Active"
            )
        ]
    ),
    "bihar": StateSchedule(
        state_name="Bihar",
        state_code="BR",
        phase1_houselisting_window="May 15, 2027 – June 30, 2027",
        phase2_population_enumeration_window="February 9, 2028 – February 28, 2028",
        self_enumeration_window="April 15, 2027 – May 14, 2027",
        current_status="Preparatory Stage",
        total_districts=38,
        nodal_officer="Director of Census Operations, Bihar",
        helpline="1800-11-2027",
        districts=[
            DistrictSchedule(
                district_name="Patna",
                phase1_start="2027-05-15",
                phase1_end="2027-06-30",
                phase2_start="2028-02-09",
                phase2_end="2028-02-28",
                self_enumeration_open="2027-04-15",
                self_enumeration_close="2027-05-14",
                status="Upcoming Phase 1"
            )
        ]
    )
}


@router.get(
    "/all",
    response_model=List[StateSchedule],
    status_code=status.HTTP_200_OK,
    summary="Get All State Census Schedules",
    description="Returns the full national timeline, Phase 1 House Listing dates, Phase 2 Population Enumeration dates, and digital self-enumeration windows across all Indian States."
)
async def get_all_schedules() -> List[StateSchedule]:
    return list(STATE_SCHEDULES_DATA.values())


@router.get(
    "/{state_name}",
    response_model=StateSchedule,
    status_code=status.HTTP_200_OK,
    summary="Get State-Specific Census Schedule",
    description="Returns detailed schedule, district breakdown, and current execution phase for a specific Indian state (e.g., Maharashtra, Delhi, UP)."
)
async def get_state_schedule(state_name: str) -> StateSchedule:
    key = state_name.strip().lower()
    if key in STATE_SCHEDULES_DATA:
        return STATE_SCHEDULES_DATA[key]

    # Partial search fallback
    for name, data in STATE_SCHEDULES_DATA.items():
        if key in name or name in key or data.state_code.lower() == key:
            return data

    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=f"Census schedule for state '{state_name}' not found. Available states include: {', '.join([s.state_name for s in STATE_SCHEDULES_DATA.values()])}"
    )
