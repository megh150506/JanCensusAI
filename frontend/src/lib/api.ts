const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:8000/api/v1";


export interface ChatRequest {
  query: string;
  conversation_id?: string;
  language?: string;
  context_state?: string;
}

export interface ChatResponse {
  answer: string;
  conversation_id: string;
  sources: string[];
  suggested_followups: string[];
  timestamp: string;
}

export interface FamilyMember {
  full_name: string;
  relationship_to_head: string;
  gender: string;
  age: number;
  marital_status?: string;
  education_level?: string;
  occupation?: string;
}

export interface SelfEnumRequest {
  head_name: string;
  mobile_number: string;
  email?: string;
  state: string;
  district: string;
  sub_district?: string;
  town_village?: string;
  pincode: string;
  house_number: string;
  dwelling_type: string;
  drinking_water_source?: string;
  electricity_source?: string;
  latrine_facility?: string;
  total_family_members: number;
  members: FamilyMember[];
  preferred_language?: string;
}

export interface SelfEnumResponse {
  success: boolean;
  se_id: string;
  head_name: string;
  submission_timestamp: string;
  status: string;
  qr_code_link: string;
  acknowledgment_url: string;
  message: string;
}

export interface CampaignRequest {
  topic: string;
  target_region: string;
  target_audience?: string;
  language?: string;
  tone?: string;
  key_points?: string[];
}

export interface CampaignContent {
  sms: string;
  social_post: string;
  bulletin: string;
  key_takeaways: string[];
}

export interface CampaignResponse {
  campaign_id: string;
  topic: string;
  target_region: string;
  language: string;
  generated_at: string;
  content: CampaignContent;
  model_used: string;
}

export interface RegionProgress {
  region_name: string;
  state: string;
  total_households_target: number;
  self_enumerated_count: number;
  self_enumeration_pct: number;
  physical_verified_count: number;
  active_enumerators: number;
  rumors_flagged_count: number;
  phase_status: string;
}

export interface DailyTrend {
  date: string;
  self_enumerations: number;
  physical_verifications: number;
}

export interface AnalyticsResponse {
  disclaimer: string;
  total_national_target_households: number;
  total_self_enumerated: number;
  national_self_enum_rate_pct: number;
  active_field_enumerators: number;
  total_rumors_debunked: number;
  regions_breakdown: RegionProgress[];
  daily_trends: DailyTrend[];
  top_performing_districts: string[];
  last_updated: string;
}

export interface DistrictSchedule {
  district_name: string;
  phase1_start: string;
  phase1_end: string;
  phase2_start: string;
  phase2_end: string;
  self_enumeration_open: string;
  self_enumeration_close: string;
  status: string;
}

export interface StateSchedule {
  state_name: string;
  state_code: string;
  phase1_houselisting_window: string;
  phase2_population_enumeration_window: string;
  self_enumeration_window: string;
  current_status: string;
  total_districts: number;
  nodal_officer: string;
  helpline: string;
  districts: DistrictSchedule[];
}

export interface RumorCheckRequest {
  claim: string;
  source_url?: string;
  language?: string;
  claimed_location?: string;
}

export interface RumorCheckResponse {
  claim: string;
  verdict: "FACT" | "MISINFORMATION" | "PARTIALLY_ACCURATE";
  official_explanation: string;
  source_reference: string;
  debunk_points: string[];
  warning_alert?: string;
  verified_at: string;
}

// Generic Fetch Wrapper
async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  try {
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        ...(options?.headers || {}),
      },
      ...options,
    });

    if (!res.ok) {
      const errorBody = await res.text();
      throw new Error(`API Error ${res.status}: ${errorBody || res.statusText}`);
    }

    return await res.json();
  } catch (err: any) {
    console.error(`Fetch failed for ${url}:`, err);
    throw err;
  }
}

// API Methods
export const api = {
  chatWithAI: (data: ChatRequest): Promise<ChatResponse> =>
    fetchApi<ChatResponse>("/ai/chat", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  submitSelfEnumeration: (data: SelfEnumRequest): Promise<SelfEnumResponse> =>
    fetchApi<SelfEnumResponse>("/citizen/self-enumerate", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  generateCampaign: (data: CampaignRequest): Promise<CampaignResponse> =>
    fetchApi<CampaignResponse>("/admin/campaign", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  getAnalytics: (): Promise<AnalyticsResponse> =>
    fetchApi<AnalyticsResponse>("/admin/analytics", {
      method: "GET",
    }),

  getAllSchedules: (): Promise<StateSchedule[]> =>
    fetchApi<StateSchedule[]>("/schedule/all", {
      method: "GET",
    }),

  getStateSchedule: (stateName: string): Promise<StateSchedule> =>
    fetchApi<StateSchedule>(`/schedule/${encodeURIComponent(stateName)}`, {
      method: "GET",
    }),

  verifyRumor: (data: RumorCheckRequest): Promise<RumorCheckResponse> =>
    fetchApi<RumorCheckResponse>("/misinformation/verify", {
      method: "POST",
      body: JSON.stringify(data),
    }),
};
