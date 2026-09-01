from datetime import datetime, timedelta
from typing import List
from app.schemas.admin_schema import AnalyticsResponse, DailyTrend, RegionProgress


def get_regional_analytics_data() -> AnalyticsResponse:
    """
    Generate mock regional engagement insights, self-enumeration rates,
    field enumerator metrics, and rumor debunk statistics.
    Labeled with mandatory disclaimer.
    """
    regions: List[RegionProgress] = [
        RegionProgress(
            region_name="Pune District",
            state="Maharashtra",
            total_households_target=2450000,
            self_enumerated_count=1680000,
            self_enumeration_pct=68.57,
            physical_verified_count=1240000,
            active_enumerators=6200,
            rumors_flagged_count=14,
            phase_status="Phase 1 - Active Verification"
        ),
        RegionProgress(
            region_name="Mumbai Suburban",
            state="Maharashtra",
            total_households_target=3200000,
            self_enumerated_count=2310000,
            self_enumeration_pct=72.19,
            physical_verified_count=1890000,
            active_enumerators=8400,
            rumors_flagged_count=23,
            phase_status="Phase 1 - Active Verification"
        ),
        RegionProgress(
            region_name="South Delhi & Central",
            state="NCT of Delhi",
            total_households_target=1850000,
            self_enumerated_count=1420000,
            self_enumeration_pct=76.76,
            physical_verified_count=1150000,
            active_enumerators=4800,
            rumors_flagged_count=9,
            phase_status="Phase 1 - Active Verification"
        ),
        RegionProgress(
            region_name="Bengaluru Urban",
            state="Karnataka",
            total_households_target=2900000,
            self_enumerated_count=2250000,
            self_enumeration_pct=77.59,
            physical_verified_count=1710000,
            active_enumerators=7100,
            rumors_flagged_count=11,
            phase_status="Phase 1 - Active Verification"
        ),
        RegionProgress(
            region_name="Lucknow Urban & Rural",
            state="Uttar Pradesh",
            total_households_target=1420000,
            self_enumerated_count=820000,
            self_enumeration_pct=57.75,
            physical_verified_count=610000,
            active_enumerators=4200,
            rumors_flagged_count=37,
            phase_status="Phase 1 - Field Outreach"
        ),
        RegionProgress(
            region_name="Chennai Metro",
            state="Tamil Nadu",
            total_households_target=2100000,
            self_enumerated_count=1540000,
            self_enumeration_pct=73.33,
            physical_verified_count=1290000,
            active_enumerators=5600,
            rumors_flagged_count=16,
            phase_status="Phase 1 - Active Verification"
        ),
        RegionProgress(
            region_name="Ahmedabad District",
            state="Gujarat",
            total_households_target=1980000,
            self_enumerated_count=1380000,
            self_enumeration_pct=69.70,
            physical_verified_count=1100000,
            active_enumerators=5100,
            rumors_flagged_count=18,
            phase_status="Phase 1 - Active Verification"
        ),
        RegionProgress(
            region_name="Patna District",
            state="Bihar",
            total_households_target=1650000,
            self_enumerated_count=890000,
            self_enumeration_pct=53.94,
            physical_verified_count=650000,
            active_enumerators=4600,
            rumors_flagged_count=42,
            phase_status="Phase 1 - Field Outreach"
        )
    ]

    total_target = sum(r.total_households_target for r in regions)
    total_self = sum(r.self_enumerated_count for r in regions)
    nat_pct = round((total_self / total_target) * 100, 2)
    active_enum = sum(r.active_enumerators for r in regions)
    total_rumors = sum(r.rumors_flagged_count for r in regions)

    # 7-day daily trend
    today = datetime.utcnow().date()
    daily_trends: List[DailyTrend] = []
    for i in range(6, -1, -1):
        day = today - timedelta(days=i)
        base_self = 180000 + (6 - i) * 15000 + (i * 3200)
        base_phys = 140000 + (6 - i) * 12000 + (i * 2100)
        daily_trends.append(
            DailyTrend(
                date=day.strftime("%Y-%m-%d"),
                self_enumerations=base_self,
                physical_verifications=base_phys
            )
        )

    return AnalyticsResponse(
        disclaimer="Demonstration Dashboard — Aggregated & Mock Data",
        total_national_target_households=total_target,
        total_self_enumerated=total_self,
        national_self_enum_rate_pct=nat_pct,
        active_field_enumerators=active_enum,
        total_rumors_debunked=total_rumors,
        regions_breakdown=regions,
        daily_trends=daily_trends,
        top_performing_districts=["Bengaluru Urban (77.6%)", "South Delhi (76.8%)", "Chennai Metro (73.3%)", "Mumbai Suburban (72.2%)"]
    )
