"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  CalendarDays,
  Layers,
  FileCheck2,
  Bot,
  ShieldCheck,
  ChevronRight,
  Sparkles,
  ArrowRight,
  Clock,
  CheckCircle2,
  MapPin,
  HelpCircle,
  QrCode,
  Share2,
  TrendingUp,
  Award,
  AlertCircle
} from "lucide-react";
import { CitizenLayout } from "@/components/layout/CitizenLayout";
import { useCensusStore } from "@/store/useCensusStore";
import { useAuthStore } from "@/store/useAuthStore";
import { api, StateSchedule } from "@/lib/api";

export default function CitizenDashboard() {
  const { openAiDrawer, selectedState, setSelectedState } = useCensusStore();
  const { user } = useAuthStore();

  const [scheduleData, setScheduleData] = useState<StateSchedule | null>(null);
  const [allStates, setAllStates] = useState<string[]>([
    "Maharashtra",
    "NCT of Delhi",
    "Uttar Pradesh",
    "Karnataka",
    "Tamil Nadu",
    "Gujarat",
    "Bihar"
  ]);
  const [isLoadingSchedule, setIsLoadingSchedule] = useState(false);

  useEffect(() => {
    async function loadSchedule() {
      setIsLoadingSchedule(true);
      try {
        const data = await api.getStateSchedule(selectedState || "Maharashtra");
        setScheduleData(data);
      } catch (err) {
        console.error("Failed to load schedule:", err);
        // Fallback default
        setScheduleData({
          state_name: selectedState || "Maharashtra",
          state_code: "MH",
          phase1_houselisting_window: "April 1, 2027 – May 15, 2027",
          phase2_population_enumeration_window: "February 9, 2028 – February 28, 2028",
          self_enumeration_window: "March 1, 2027 – March 31, 2027",
          current_status: "Phase 1 - Active Verification",
          total_districts: 36,
          nodal_officer: "Director of Census Operations, Maharashtra",
          helpline: "1800-11-2027",
          districts: [
            {
              district_name: "Pune",
              phase1_start: "2027-04-01",
              phase1_end: "2027-05-15",
              phase2_start: "2028-02-09",
              phase2_end: "2028-02-28",
              self_enumeration_open: "2027-03-01",
              self_enumeration_close: "2027-03-31",
              status: "Phase 1 Active"
            }
          ]
        });
      } finally {
        setIsLoadingSchedule(false);
      }
    }
    loadSchedule();
  }, [selectedState]);

  const quickActionCards = [
    {
      title: "Check Schedule",
      subtitle: "State & district timeline for Census 2027",
      href: "/citizen/schedule",
      icon: CalendarDays,
      color: "from-blue-600 to-indigo-600",
      accent: "text-blue-600 bg-blue-50 border-blue-200",
      badge: "2027 Timeline"
    },
    {
      title: "Understand Phases",
      subtitle: "Detailed breakdown of Phase 1 vs Phase 2",
      href: "/citizen/phases",
      icon: Layers,
      color: "from-emerald-600 to-teal-600",
      accent: "text-emerald-600 bg-emerald-50 border-emerald-200",
      badge: "House Listing & Demographics"
    },
    {
      title: "Self-Enumeration Guide",
      subtitle: "Pre-fill questionnaire & generate SE-ID QR",
      href: "/citizen/guide",
      icon: FileCheck2,
      color: "from-amber-500 to-orange-600",
      accent: "text-amber-700 bg-amber-50 border-amber-200",
      badge: "Fast 2-Min Verification"
    },
    {
      title: "Ask AI Assistant",
      subtitle: "Grounded instant answers with JanCensus Mitra",
      onClick: () => openAiDrawer(),
      icon: Bot,
      color: "from-purple-600 to-fuchsia-600",
      accent: "text-purple-600 bg-purple-50 border-purple-200",
      badge: "Gemini 2.5 Flash"
    },
  ];

  return (
    <CitizenLayout>
      <div className="space-y-8">
        {/* Top Hero Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-800 via-emerald-700 to-green-600 text-white p-8 md:p-10 shadow-xl shadow-emerald-900/10">
          {/* Subtle Decorative Geometric Pattern */}
          <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-10 pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
          <div className="absolute -right-10 -bottom-10 w-64 h-64 rounded-full bg-emerald-500/30 blur-3xl" />
          <div className="absolute -left-10 -top-10 w-48 h-48 rounded-full bg-green-400/20 blur-2xl" />

          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-xs font-semibold text-emerald-100 mb-4">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>India's 16th National Census • First Fully Digital Census</span>
            </div>

            <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight text-white leading-tight">
              Digitally Empowering Every Indian Citizen
            </h2>
            <p className="mt-3 text-sm md:text-base text-emerald-100/90 leading-relaxed">
              Participate in nation-building from the comfort of your home. Self-enumerate online, receive an instant verification QR Code, and ensure accurate representation.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                href="/citizen/guide"
                className="px-6 py-3 rounded-2xl bg-white text-emerald-900 font-bold text-xs shadow-lg hover:bg-emerald-50 transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
              >
                <FileCheck2 className="w-4 h-4 text-emerald-700" />
                <span>Start Self-Enumeration Now</span>
                <ArrowRight className="w-3.5 h-3.5 text-emerald-700" />
              </Link>

              <button
                onClick={() => openAiDrawer("What is Census 2027 and how does it work?")}
                className="px-5 py-3 rounded-2xl bg-emerald-900/40 hover:bg-emerald-900/60 backdrop-blur-md border border-white/20 text-white font-bold text-xs transition-all flex items-center gap-2"
              >
                <Bot className="w-4 h-4 text-emerald-300" />
                <span>Explore with AI Mitra</span>
              </button>
            </div>
          </div>
        </div>

        {/* 4 Grid Action Cards */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                Citizen Action Hub
              </h3>
              <p className="text-xs text-slate-500">
                Key services and informational portals for Census of India 2027
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {quickActionCards.map((card) => {
              const Icon = card.icon;
              const content = (
                <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm hover-lift flex flex-col justify-between h-full group cursor-pointer">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${card.accent}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                        {card.badge}
                      </span>
                    </div>

                    <h4 className="font-bold text-slate-900 text-base group-hover:text-emerald-700 transition-colors">
                      {card.title}
                    </h4>
                    <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                      {card.subtitle}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-700 group-hover:text-emerald-600">
                    <span>Access Feature</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );

              if (card.href) {
                return (
                  <Link key={card.title} href={card.href}>
                    {content}
                  </Link>
                );
              }

              return (
                <button
                  key={card.title}
                  onClick={card.onClick}
                  className="text-left w-full h-full"
                >
                  {content}
                </button>
              );
            })}
          </div>
        </div>

        {/* Dedicated Census Schedule Comparative Section */}
        <div className="bg-white rounded-3xl p-7 border border-slate-200/80 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <CalendarDays className="w-5 h-5 text-emerald-600" />
                <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                  Census 2027 State Timeline Explorer
                </h3>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Official Phase 1 (House Listing) and Phase 2 (Population Enumeration) schedules
              </p>
            </div>

            {/* State Selector */}
            <div className="flex items-center gap-3">
              <label className="text-xs font-bold text-slate-600 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-600" /> State:
              </label>
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="text-xs font-semibold bg-slate-50 border border-slate-300 text-slate-900 rounded-xl px-3.5 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none cursor-pointer"
              >
                {allStates.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Comparative Schedule Cards */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Phase 1 Card */}
            <div className="bg-gradient-to-br from-emerald-50/70 to-green-50/30 rounded-2xl p-6 border border-emerald-200/80 relative overflow-hidden">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-emerald-600 text-white tracking-wider">
                  Phase 1: Active
                </span>
                <span className="text-xs font-bold text-emerald-800 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-emerald-600" /> Current Stage
                </span>
              </div>

              <h4 className="text-base font-bold text-slate-900">
                House Listing & Housing Census (HLH)
              </h4>
              <p className="text-xs text-slate-600 mt-1">
                Lists all housing structures, amenities, and drinking water/latrine facilities.
              </p>

              <div className="mt-4 space-y-2.5 text-xs bg-white/80 p-4 rounded-xl border border-emerald-200">
                <div className="flex justify-between">
                  <span className="text-slate-500">Digital Self-Enumeration Window:</span>
                  <span className="font-bold text-emerald-700">
                    {scheduleData?.self_enumeration_window || "March 1 – March 31, 2027"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Field Surveyor Verification:</span>
                  <span className="font-bold text-slate-900">
                    {scheduleData?.phase1_houselisting_window || "April 1 – May 15, 2027"}
                  </span>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <Link
                  href="/citizen/guide"
                  className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1"
                >
                  <span>Pre-Fill Household Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Phase 2 Card */}
            <div className="bg-gradient-to-br from-slate-50 to-blue-50/30 rounded-2xl p-6 border border-slate-200 relative overflow-hidden">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-slate-700 text-white tracking-wider">
                  Phase 2: Upcoming
                </span>
                <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> National Synchronous
                </span>
              </div>

              <h4 className="text-base font-bold text-slate-900">
                Population Enumeration (PE)
              </h4>
              <p className="text-xs text-slate-600 mt-1">
                Comprehensive count of every individual, demographics, education, and occupation.
              </p>

              <div className="mt-4 space-y-2.5 text-xs bg-white/80 p-4 rounded-xl border border-slate-200">
                <div className="flex justify-between">
                  <span className="text-slate-500">Self-Enumeration Portal:</span>
                  <span className="font-bold text-slate-700">January 2028</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Physical Enumeration:</span>
                  <span className="font-bold text-slate-900">
                    {scheduleData?.phase2_population_enumeration_window || "Feb 9 – Feb 28, 2028"}
                  </span>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <Link
                  href="/citizen/phases"
                  className="text-xs font-bold text-slate-700 hover:text-slate-900 flex items-center gap-1"
                >
                  <span>Learn about Phase 2 Questions</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Legal Safety Guarantee Ribbon */}
          <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-emerald-50 via-slate-50 to-emerald-50 border border-emerald-200/60 flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h5 className="text-xs font-bold text-slate-900">
                  Your Information is 100% Statutorily Safe & Confidential
                </h5>
                <p className="text-[11px] text-slate-600">
                  Under <strong>Section 15 of the Census Act 1948</strong>, individual records cannot be shared with police, courts, or tax authorities.
                </p>
              </div>
            </div>
            <Link
              href="/citizen/privacy"
              className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1"
            >
              <span>Read Legal Protections</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </CitizenLayout>
  );
}
