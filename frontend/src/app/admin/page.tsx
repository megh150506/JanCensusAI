"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  BarChart3,
  TrendingUp,
  Users,
  ShieldCheck,
  AlertTriangle,
  Send,
  Sparkles,
  RefreshCw,
  Copy,
  Check,
  MapPin,
  Calendar,
  Layers,
  MessageSquare,
  FileText,
  Share2,
  CheckCircle2,
  PieChart as PieIcon,
  Activity,
  ArrowUpRight,
  Filter,
  Download,
  Loader2
} from "lucide-react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  BarChart,
  Bar
} from "recharts";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { useAuthStore } from "@/store/useAuthStore";
import {
  api,
  AnalyticsResponse,
  CampaignRequest,
  CampaignResponse
} from "@/lib/api";

const PROGRESS_COLORS = ["#16A34A", "#F59E0B", "#94A3B8"];
const MISINFO_COLORS = ["#EF4444", "#F59E0B", "#10B981"];

export default function AdminDashboardPage() {
  const { user } = useAuthStore();

  const [analytics, setAnalytics] = useState<AnalyticsResponse | null>(null);
  const [selectedState, setSelectedState] = useState("Maharashtra");
  const [dateRange, setDateRange] = useState("Last 30 Days (Active Phase 1)");
  const [isLoadingAnalytics, setIsLoadingAnalytics] = useState(true);

  // Campaign Generator State
  const [campaignTopic, setCampaignTopic] = useState("Launch of Self-Enumeration Portal in Pune District");
  const [campaignRegion, setCampaignRegion] = useState("Maharashtra - Pune");
  const [campaignAudience, setCampaignAudience] = useState("Urban & Suburban Residents");
  const [campaignLanguage, setCampaignLanguage] = useState("English & Marathi");
  const [campaignTone, setCampaignTone] = useState("Official, encouraging, and clear");
  const [isGeneratingCampaign, setIsGeneratingCampaign] = useState(false);
  const [campaignResult, setCampaignResult] = useState<CampaignResponse | null>(null);
  const [copiedTab, setCopiedTab] = useState<string | null>(null);

  useEffect(() => {
    async function loadAnalytics() {
      setIsLoadingAnalytics(true);
      try {
        const data = await api.getAnalytics();
        setAnalytics(data);
      } catch (err) {
        console.error("Failed to load analytics:", err);
      } finally {
        setIsLoadingAnalytics(false);
      }
    }
    loadAnalytics();
  }, []);

  const handleGenerateCampaign = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGeneratingCampaign(true);
    try {
      const payload: CampaignRequest = {
        topic: campaignTopic,
        target_region: campaignRegion,
        target_audience: campaignAudience,
        language: campaignLanguage,
        tone: campaignTone,
      };
      const res = await api.generateCampaign(payload);
      setCampaignResult(res);
    } catch (err) {
      console.error("Campaign generation error:", err);
    } finally {
      setIsGeneratingCampaign(false);
    }
  };

  const copyText = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedTab(type);
    setTimeout(() => setCopiedTab(null), 2000);
  };

  // Mock Recharts Datasets
  const enumerationProgressData = [
    { name: "Completed Self-Enumerated", value: 58 },
    { name: "Field Surveyor In Progress", value: 27 },
    { name: "Pending Verification", value: 15 },
  ];

  const misinformationBreakdownData = [
    { name: "Debunked False Rumors", value: 68 },
    { name: "Partially Misleading", value: 21 },
    { name: "Verified Facts", value: 11 },
  ];

  const topDistrictsProgressData = [
    { district: "Bengaluru Urban", progress: 77.6, selfEnum: 22.5 },
    { district: "South Delhi", progress: 76.8, selfEnum: 14.2 },
    { district: "Chennai Metro", progress: 73.3, selfEnum: 15.4 },
    { district: "Mumbai Sub.", progress: 72.2, selfEnum: 23.1 },
    { district: "Pune District", progress: 68.6, selfEnum: 16.8 },
  ];

  const commonCitizenQueries = [
    { query: "Is my personal data confidential under Census Act 1948?", volume: "34,210 queries", resolution: "99.4%" },
    { query: "How to self-enumerate online and generate QR Code?", volume: "28,940 queries", resolution: "98.8%" },
    { query: "Difference between Phase 1 (Housing) and Phase 2 (Demographics)", volume: "19,820 queries", resolution: "99.1%" },
    { query: "Do enumerators ask for bank account details or fees?", volume: "14,190 queries", resolution: "100% (PIB Alert)" },
    { query: "Documents required for Census verification", volume: "12,650 queries", resolution: "99.7% (Zero Docs)" }
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* MANDATORY DISCLAIMER BANNER */}
        <div className="rounded-2xl bg-amber-500 text-slate-950 p-4 shadow-md flex items-center justify-between font-bold text-xs tracking-wide">
          <div className="flex items-center gap-3">
            <span className="text-xl">⚠️</span>
            <span>
              {analytics?.disclaimer || "Demonstration Dashboard — Aggregated & Mock Data"}
            </span>
          </div>
          <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-lg bg-black/10 text-[10px] uppercase tracking-wider font-extrabold">
            National Prototype v1.0
          </span>
        </div>

        {/* Top Control Bar with Filters */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <span>National Operations & Analytics Command</span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Live regional synchronization • Office of the Registrar General of India
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* State Filter */}
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-2xl px-3 py-1.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-600" />
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="bg-transparent text-xs font-bold text-slate-800 focus:outline-none cursor-pointer"
              >
                <option value="Maharashtra">Maharashtra Zone</option>
                <option value="NCT of Delhi">NCT of Delhi</option>
                <option value="Karnataka">Karnataka Zone</option>
                <option value="Tamil Nadu">Tamil Nadu Zone</option>
                <option value="Uttar Pradesh">Uttar Pradesh Zone</option>
                <option value="All India">All India Aggregate</option>
              </select>
            </div>

            {/* Date Range */}
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-2xl px-3 py-1.5">
              <Calendar className="w-3.5 h-3.5 text-blue-600" />
              <span className="text-xs font-bold text-slate-800">{dateRange}</span>
            </div>

            <button
              onClick={() => window.print()}
              className="px-4 py-2 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-sm flex items-center gap-1.5 transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Report</span>
            </button>
          </div>
        </div>

        {/* 4 Metric Summary KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Card 1: Total Households */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm hover-lift flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Total Households Target
              </span>
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                {analytics?.total_national_target_households.toLocaleString() || "1,75,80,000"}
              </p>
              <div className="flex items-center gap-1.5 text-emerald-600 text-xs font-bold mt-1">
                <ArrowUpRight className="w-3.5 h-3.5" />
                <span>+32.6% vs previous month</span>
              </div>
            </div>
          </div>

          {/* Card 2: Self-Enumeration Completed */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm hover-lift flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Self-Enumeration Completed
              </span>
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                {analytics?.total_self_enumerated.toLocaleString() || "1,23,10,000"}
              </p>
              <div className="mt-2 w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-600 h-full rounded-full"
                  style={{ width: `${analytics?.national_self_enum_rate_pct || 70}%` }}
                />
              </div>
              <p className="text-[10px] text-slate-400 font-bold mt-1">
                {analytics?.national_self_enum_rate_pct || "70.03"}% Digital Adoption Rate
              </p>
            </div>
          </div>

          {/* Card 3: Active Field Enumerators */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm hover-lift flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Active Field Surveyors
              </span>
              <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <Activity className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                {analytics?.active_field_enumerators.toLocaleString() || "46,000"}
              </p>
              <div className="flex items-center gap-1.5 text-purple-600 text-xs font-bold mt-1">
                <span>99.2% Active Geo-synchronized</span>
              </div>
            </div>
          </div>

          {/* Card 4: Rumor Reports Resolved */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm hover-lift flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Rumor Reports Debunked
              </span>
              <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                {analytics?.total_rumors_debunked || "170"} Resolved
              </p>
              <div className="flex items-center gap-1.5 text-amber-700 text-xs font-bold mt-1">
                <span>87% Resolved via AI Fact-Check</span>
              </div>
            </div>
          </div>
        </div>

        {/* Visualizations Grid (Recharts) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chart 1: Donut Enumeration Progress */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-sm font-bold text-slate-900">Enumeration Progress</h3>
                <span className="text-[10px] font-bold text-slate-400">Target Share</span>
              </div>
              <p className="text-xs text-slate-400">Digital vs Field Verification</p>
            </div>

            <div className="h-56 my-2">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={enumerationProgressData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {enumerationProgressData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={PROGRESS_COLORS[index % PROGRESS_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-1.5 text-xs">
              {enumerationProgressData.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: PROGRESS_COLORS[idx] }}
                    />
                    <span className="text-slate-600">{item.name}</span>
                  </div>
                  <span className="font-bold text-slate-900">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Chart 2: Progress Over Time Line Chart */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between lg:col-span-2">
            <div>
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-sm font-bold text-slate-900">Daily Enumeration Trends (Last 7 Days)</h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  +18.4% WoW
                </span>
              </div>
              <p className="text-xs text-slate-400">Digital Self-Enumeration vs Physical Surveyor Verification</p>
            </div>

            <div className="h-64 my-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={analytics?.daily_trends || []}>
                  <defs>
                    <linearGradient id="colorSelf" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#16A34A" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#16A34A" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorPhys" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                  <XAxis dataKey="date" tick={{ fontSize: 10 }} stroke="#94A3B8" />
                  <YAxis tick={{ fontSize: 10 }} stroke="#94A3B8" />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="self_enumerations"
                    stroke="#16A34A"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorSelf)"
                    name="Self-Enumerations"
                  />
                  <Area
                    type="monotone"
                    dataKey="physical_verifications"
                    stroke="#3B82F6"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorPhys)"
                    name="Physical Verifications"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="flex items-center justify-center gap-6 text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-600" />
                <span>Self-Enumerations</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-blue-500" />
                <span>Physical Verifications</span>
              </div>
            </div>
          </div>
        </div>

        {/* Second Row of Charts: Top Districts & Misinformation Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Top 5 Districts by Progress */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Top Performing Districts by Progress %</h3>
                <p className="text-xs text-slate-400">Leading districts in Phase 1 self-enumeration adoption</p>
              </div>
              <span className="text-xs font-bold text-emerald-600">Top 5 Leaders</span>
            </div>

            <div className="h-60">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topDistrictsProgressData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" horizontal={false} />
                  <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 10 }} stroke="#94A3B8" />
                  <YAxis type="category" dataKey="district" tick={{ fontSize: 11, fontWeight: "bold" }} width={110} stroke="#475569" />
                  <Tooltip />
                  <Bar dataKey="progress" fill="#16A34A" radius={[0, 8, 8, 0]} barSize={18} name="Progress %" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Donut Chart: Misinformation Overview */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Misinformation Rumor Monitor</h3>
              <p className="text-xs text-slate-400">Fact-Check classifications</p>
            </div>

            <div className="h-48 my-2">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={misinformationBreakdownData}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={70}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {misinformationBreakdownData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={MISINFO_COLORS[index % MISINFO_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-1.5 text-xs">
              {misinformationBreakdownData.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: MISINFO_COLORS[idx] }} />
                    <span className="text-slate-600">{item.name}</span>
                  </div>
                  <span className="font-bold text-slate-900">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Third Row: Common Citizen Queries Table & AI Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Common Citizen Queries */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm lg:col-span-2">
            <h3 className="text-sm font-bold text-slate-900 mb-1">Ranked Citizen Inquiry Themes</h3>
            <p className="text-xs text-slate-400 mb-4">Real-time NLP query clustering from JanCensus AI chatbot</p>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 text-[10px] uppercase font-bold">
                  <tr>
                    <th className="py-2.5 px-3 rounded-l-xl">Ranked Topic</th>
                    <th className="py-2.5 px-3">Monthly Volume</th>
                    <th className="py-2.5 px-3 rounded-r-xl">AI Resolution Rate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                  {commonCitizenQueries.map((q, idx) => (
                    <tr key={idx} className="hover:bg-slate-50">
                      <td className="py-3 px-3 font-bold text-slate-900 flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-600 text-[10px] flex items-center justify-center font-bold">
                          {idx + 1}
                        </span>
                        <span>{q.query}</span>
                      </td>
                      <td className="py-3 px-3 text-slate-600">{q.volume}</td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                          {q.resolution}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* AI Insights Card */}
          <div className="bg-gradient-to-br from-emerald-800 to-green-900 text-white rounded-3xl p-6 shadow-xl space-y-4 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-emerald-200 text-xs font-bold mb-3">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Gemini 2.5 Flash Field Intelligence</span>
              </div>
              <h3 className="text-lg font-black leading-snug">
                Key Administrative Insights & Action Recommendations
              </h3>
              <p className="text-xs text-emerald-100 mt-2 leading-relaxed">
                • <strong>Urban self-enumeration is surging</strong> in Pune and Bengaluru (+42% this week), saving ~14 mins per household physical visit.
              </p>
              <p className="text-xs text-emerald-100 mt-2 leading-relaxed">
                • <strong>Rumor mitigation recommendation:</strong> Broadcast SMS campaigns clarifying the <em>Zero-Fee Policy</em> in peri-urban wards of Lucknow and Patna.
              </p>
            </div>

            <button
              onClick={() => {
                const el = document.getElementById("campaign-generator");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
              className="w-full py-2.5 rounded-xl bg-white text-emerald-950 font-bold text-xs shadow-md hover:bg-emerald-50 transition-colors flex items-center justify-center gap-2"
            >
              <span>Launch Outreach Campaign</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* AI Campaign Generator Section */}
        <div id="campaign-generator" className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                AI Public Awareness Campaign Generator (Gemini 2.5 Flash)
              </h3>
              <p className="text-xs text-slate-500">
                Generate localized multi-channel collateral (SMS under 160 chars, Social Media posts, and Official Bulletins) for district collectors.
              </p>
            </div>
          </div>

          <form onSubmit={handleGenerateCampaign} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Campaign Objective / Topic *
              </label>
              <input
                type="text"
                value={campaignTopic}
                onChange={(e) => setCampaignTopic(e.target.value)}
                placeholder="e.g. Awareness drive for Self-Enumeration portal"
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:outline-none font-medium"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Target State & District *
              </label>
              <input
                type="text"
                value={campaignRegion}
                onChange={(e) => setCampaignRegion(e.target.value)}
                placeholder="e.g. Maharashtra - Pune District"
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:outline-none font-medium"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Target Audience Profile
              </label>
              <input
                type="text"
                value={campaignAudience}
                onChange={(e) => setCampaignAudience(e.target.value)}
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Languages to Produce
              </label>
              <input
                type="text"
                value={campaignLanguage}
                onChange={(e) => setCampaignLanguage(e.target.value)}
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:outline-none"
              />
            </div>

            <div className="md:col-span-2 flex justify-end">
              <button
                type="submit"
                disabled={isGeneratingCampaign}
                className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold text-xs shadow-md shadow-emerald-600/20 flex items-center gap-2 transition-all hover:scale-105"
              >
                {isGeneratingCampaign ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Gemini 2.5 Flash is Crafting Multi-Channel Copy...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>Generate Structured Campaign Materials</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Generated Campaign Output */}
          {campaignResult && (
            <div className="mt-8 space-y-6 pt-6 border-t border-slate-200 animate-in fade-in">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  Campaign ID: {campaignResult.campaign_id} • Model: {campaignResult.model_used}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {/* SMS Channel Card */}
                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-extrabold text-slate-900 flex items-center gap-1.5">
                        <Send className="w-3.5 h-3.5 text-emerald-600" /> SMS Broadcast
                      </span>
                      <span className="text-[10px] font-bold text-slate-400">
                        {campaignResult.content.sms.length} / 160 Chars
                      </span>
                    </div>
                    <p className="text-xs text-slate-700 bg-white p-3.5 rounded-xl border border-slate-200 font-mono leading-relaxed">
                      {campaignResult.content.sms}
                    </p>
                  </div>
                  <button
                    onClick={() => copyText(campaignResult.content.sms, "sms")}
                    className="mt-3 w-full py-2 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                  >
                    {copiedTab === "sms" ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedTab === "sms" ? "Copied!" : "Copy SMS"}</span>
                  </button>
                </div>

                {/* Social Media Post Card */}
                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-extrabold text-slate-900 flex items-center gap-1.5">
                        <Share2 className="w-3.5 h-3.5 text-blue-600" /> Social Post
                      </span>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                        Hashtags Included
                      </span>
                    </div>
                    <p className="text-xs text-slate-700 bg-white p-3.5 rounded-xl border border-slate-200 leading-relaxed whitespace-pre-line max-h-48 overflow-y-auto">
                      {campaignResult.content.social_post}
                    </p>
                  </div>
                  <button
                    onClick={() => copyText(campaignResult.content.social_post, "social")}
                    className="mt-3 w-full py-2 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                  >
                    {copiedTab === "social" ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedTab === "social" ? "Copied!" : "Copy Social Post"}</span>
                  </button>
                </div>

                {/* Official Bulletin Notice Card */}
                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-extrabold text-slate-900 flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5 text-amber-600" /> Official Bulletin
                      </span>
                      <span className="text-[10px] font-bold text-slate-400">Panchayat Circular</span>
                    </div>
                    <p className="text-xs text-slate-700 bg-white p-3.5 rounded-xl border border-slate-200 leading-relaxed whitespace-pre-line max-h-48 overflow-y-auto font-sans">
                      {campaignResult.content.bulletin}
                    </p>
                  </div>
                  <button
                    onClick={() => copyText(campaignResult.content.bulletin, "bulletin")}
                    className="mt-3 w-full py-2 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                  >
                    {copiedTab === "bulletin" ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedTab === "bulletin" ? "Copied!" : "Copy Bulletin"}</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
