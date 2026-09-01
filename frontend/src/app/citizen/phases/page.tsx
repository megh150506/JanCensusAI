"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Layers,
  Home,
  Users,
  CheckCircle2,
  FileText,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  Info,
  MapPin,
  Flame,
  Droplets,
  Zap,
  Tv,
  GraduationCap,
  Briefcase,
  Globe2
} from "lucide-react";
import { CitizenLayout } from "@/components/layout/CitizenLayout";

export default function CensusPhasesPage() {
  const [activeTab, setActiveTab] = useState<"phase1" | "phase2" | "comparison">("phase1");

  const phase1Parameters = [
    { name: "Building & Census House Number", icon: Home, desc: "Identification and numerical labeling of the residential structure" },
    { name: "Predominant Material of Floor, Wall & Roof", icon: Layers, desc: "Pucca / Kutcha categorization for infrastructure planning" },
    { name: "Main Source of Drinking Water", icon: Droplets, desc: "Treated tap water, well, handpump, within or outside premises" },
    { name: "Main Source of Lighting", icon: Zap, desc: "Electricity grid, solar, kerosene, or other power sources" },
    { name: "Access to Latrine Facility", icon: CheckCircle2, desc: "Flush latrine, pit latrine, private vs community toilets" },
    { name: "Main Type of Fuel Used for Cooking", icon: Flame, desc: "LPG/PNG connection, biogas, electricity, firewood" },
    { name: "Availability of Kitchen with Piped Gas", icon: Home, desc: "Dedicated cooking area and clean fuel usage" },
    { name: "Assets Owned by Household", icon: Tv, desc: "Radio/transistor, television, computer/laptop, telephone/mobile, 2-wheeler, 4-wheeler, internet access" },
    { name: "Digital Geo-Tagging", icon: MapPin, desc: "GPS coordinates recorded via the official surveyor mobile app" }
  ];

  const phase2Parameters = [
    { name: "Individual Demographics", icon: Users, desc: "Full Name, Relationship to Head, Sex (Male/Female/Transgender), Date of Birth/Age" },
    { name: "Marital Status & Age at Marriage", icon: Users, desc: "Currently Married, Widowed, Divorced, Separated, Never Married" },
    { name: "Religion & Mother Tongue", icon: Globe2, desc: "Mother tongue, up to two other languages known, and religious affiliation" },
    { name: "Scheduled Caste (SC) / Scheduled Tribe (ST)", icon: FileText, desc: "Identification as recognized under Constitution Order" },
    { name: "Literacy & Educational Attainment", icon: GraduationCap, desc: "Highest educational level passed (Primary, Secondary, Graduate, Professional)" },
    { name: "Economic Activity & Occupation", icon: Briefcase, desc: "Main worker, Marginal worker, Non-worker, Industry category, Nature of work" },
    { name: "Migration Reasons & Place of Birth", icon: MapPin, desc: "Place of last residence, duration of stay, reasons (employment, marriage, education, family)" },
    { name: "Fertility Metrics (For Married Females)", icon: Users, desc: "Number of children surviving, total children ever born, births in last 12 months" }
  ];

  return (
    <CitizenLayout>
      <div className="space-y-8">
        {/* Header Section */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-3">
                <Layers className="w-3.5 h-3.5" />
                <span>Census 2027 Operations Architecture</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                Census Phases Breakdown: Phase 1 vs Phase 2
              </h2>
              <p className="text-xs md:text-sm text-slate-500 mt-1 max-w-3xl">
                The Census of India 2027 is conducted in two distinct, sequential phases to capture comprehensive structural amenities and socio-demographic indicators.
              </p>
            </div>

            <Link
              href="/citizen/guide"
              className="px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/20 flex items-center gap-2 shrink-0 transition-all hover:scale-105"
            >
              <span>Start Phase 1 Self-Enumeration</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Tab Navigation */}
          <div className="flex border-b border-slate-200 mt-8 gap-8 text-xs font-bold">
            <button
              onClick={() => setActiveTab("phase1")}
              className={`pb-3.5 transition-colors relative flex items-center gap-2 ${
                activeTab === "phase1" ? "text-emerald-700 border-b-2 border-emerald-600" : "text-slate-500 hover:text-slate-900"
              }`}
            >
              <Home className="w-4 h-4" />
              <span>Phase 1: House Listing & Housing Census (HLH)</span>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] px-2 py-0.5 rounded-full">Active</span>
            </button>

            <button
              onClick={() => setActiveTab("phase2")}
              className={`pb-3.5 transition-colors relative flex items-center gap-2 ${
                activeTab === "phase2" ? "text-emerald-700 border-b-2 border-emerald-600" : "text-slate-500 hover:text-slate-900"
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Phase 2: Population Enumeration (PE)</span>
              <span className="bg-slate-100 text-slate-600 text-[10px] px-2 py-0.5 rounded-full">Feb 2028</span>
            </button>

            <button
              onClick={() => setActiveTab("comparison")}
              className={`pb-3.5 transition-colors relative flex items-center gap-2 ${
                activeTab === "comparison" ? "text-emerald-700 border-b-2 border-emerald-600" : "text-slate-500 hover:text-slate-900"
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Side-by-Side Comparison Matrix</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Phase 1 Details */}
        {activeTab === "phase1" && (
          <div className="space-y-6 animate-in fade-in">
            <div className="bg-gradient-to-br from-emerald-500/10 via-green-500/5 to-transparent border border-emerald-200 rounded-3xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-emerald-600/20">
                  <Home className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Phase 1: House Listing & Housing Census (HLH) & NPR Update
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Conducted first across all states and union territories. The objective is to identify and assign unique geo-tagged IDs to every structure, assess housing conditions, and record household amenities across 31 standardized parameters.
                  </p>
                </div>
              </div>
            </div>

            {/* Parameters Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {phase1Parameters.map((param, idx) => {
                const Icon = param.icon;
                return (
                  <div key={idx} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover-lift">
                    <div className="flex items-center gap-3 mb-2.5">
                      <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-bold text-slate-400">Parameter #{idx + 1}</span>
                    </div>
                    <h4 className="text-xs font-bold text-slate-900">{param.name}</h4>
                    <p className="text-[11px] text-slate-500 mt-1 leading-normal">{param.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 2: Phase 2 Details */}
        {activeTab === "phase2" && (
          <div className="space-y-6 animate-in fade-in">
            <div className="bg-gradient-to-br from-blue-500/10 via-indigo-500/5 to-transparent border border-blue-200 rounded-3xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-blue-600/20">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Phase 2: Population Enumeration (PE)
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Conducted synchronously nationwide. Every individual resident within the territorial boundary of India is counted and detailed socio-demographic, cultural, and economic characteristics are recorded.
                  </p>
                </div>
              </div>
            </div>

            {/* Parameters Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {phase2Parameters.map((param, idx) => {
                const Icon = param.icon;
                return (
                  <div key={idx} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover-lift">
                    <div className="flex items-center gap-3 mb-2.5">
                      <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-bold text-slate-400">Question #{idx + 1}</span>
                    </div>
                    <h4 className="text-xs font-bold text-slate-900">{param.name}</h4>
                    <p className="text-[11px] text-slate-500 mt-1 leading-normal">{param.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 3: Comparison Matrix */}
        {activeTab === "comparison" && (
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm overflow-x-auto animate-in fade-in">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 uppercase font-bold text-[10px]">
                  <th className="py-3 px-4">Feature / Dimension</th>
                  <th className="py-3 px-4 text-emerald-800 bg-emerald-50/50">Phase 1: House Listing (HLH)</th>
                  <th className="py-3 px-4 text-blue-800 bg-blue-50/50">Phase 2: Population Enumeration (PE)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                <tr>
                  <td className="py-3.5 px-4 font-bold text-slate-900">Primary Focus</td>
                  <td className="py-3.5 px-4 bg-emerald-50/20">Housing conditions, building materials, household amenities & assets</td>
                  <td className="py-3.5 px-4 bg-blue-50/20">Individual citizen count, age, literacy, religion, language, occupation</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-bold text-slate-900">Unit of Enumeration</td>
                  <td className="py-3.5 px-4 bg-emerald-50/20">Household and Dwelling Unit</td>
                  <td className="py-3.5 px-4 bg-blue-50/20">Individual Person (including homeless/transient population)</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-bold text-slate-900">Timeline</td>
                  <td className="py-3.5 px-4 bg-emerald-50/20">April – September 2027 (Staggered by state)</td>
                  <td className="py-3.5 px-4 bg-blue-50/20">February 9 – February 28, 2028 (Synchronous national count)</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-bold text-slate-900">Self-Enumeration Support</td>
                  <td className="py-3.5 px-4 bg-emerald-50/20">✅ Yes, available via JanCensus portal with SE-ID & QR code</td>
                  <td className="py-3.5 px-4 bg-blue-50/20">✅ Yes, opening January 2028 prior to field visits</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-bold text-slate-900">Legal Protection</td>
                  <td className="py-3.5 px-4 bg-emerald-50/20">Strictly Confidential (Section 15, Census Act 1948)</td>
                  <td className="py-3.5 px-4 bg-blue-50/20">Strictly Confidential (Section 15, Census Act 1948)</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </CitizenLayout>
  );
}
