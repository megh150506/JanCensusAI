"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Bell,
  Sparkles,
  Bot,
  User,
  ShieldCheck,
  ChevronDown,
  LogOut,
  SlidersHorizontal,
  FileCheck2,
  CheckCircle2,
  AlertTriangle,
  Globe2
} from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { useCensusStore, SUPPORTED_LANGUAGES } from "@/store/useCensusStore";
import { getTranslation } from "@/lib/translations";

const getInitials = (name?: string) => {
  if (!name) return "U";
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
};

export const Header: React.FC = () => {
  const { user, logout } = useAuthStore();
  const {
    currentLanguage,
    setLanguage,
    openAiDrawer,
    unreadNotificationCount,
    toggleNotifications,
    isNotificationsOpen
  } = useCensusStore();

  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const notifications = [
    {
      id: 1,
      title: "Phase 1 Self-Enumeration Active",
      desc: "Pune District self-enumeration window is open until March 31, 2027.",
      time: "10 mins ago",
      type: "success"
    },
    {
      id: 2,
      title: "PIB Fact-Check Update",
      desc: "New advisory issued: Census enumeration is 100% free of charge.",
      time: "2 hours ago",
      type: "info"
    },
    {
      id: 3,
      title: "Data Confidentiality Assurance",
      desc: "Section 15 of Census Act 1948 protects all citizen submissions.",
      time: "1 day ago",
      type: "shield"
    }
  ];

  return (
    <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-20 px-8 flex items-center justify-between">
      {/* Left Greeting */}
      <div className="flex items-center gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            {getTranslation(currentLanguage, "headerWelcome")}, {user?.name || "Citizen"}! <span className="animate-bounce">👋</span>
          </h1>
          <p className="text-xs text-slate-500 font-medium">
            {user?.role === "admin"
              ? "National Administration & Field Analytics Center"
              : `Census 2027 Dashboard • ${user?.district || "Pune"}, ${user?.state || "Maharashtra"}`}
          </p>
        </div>
      </div>

      {/* Right Controls & Profile */}
      <div className="flex items-center gap-3">
        {/* Header Language Selector Dropdown */}
        <div className="hidden md:flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5">
          <Globe2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <select
            value={currentLanguage}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-transparent text-xs font-bold text-slate-800 focus:outline-none cursor-pointer"
            aria-label="Select Language"
          >
            {SUPPORTED_LANGUAGES.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name} ({lang.nativeName})
              </option>
            ))}
          </select>
        </div>

        {/* Ask AI Assistant Floating Pill */}
        <button
          onClick={() => openAiDrawer()}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white text-xs font-semibold shadow-md shadow-emerald-500/20 transition-all hover:scale-105 active:scale-95"
        >
          <Bot className="w-4 h-4" />
          <span>{getTranslation(currentLanguage, "headerAskAi")}</span>
          <Sparkles className="w-3 h-3 text-amber-300 animate-spin-slow" />
        </button>

        {/* Notifications Bell */}
        <div className="relative">
          <button
            onClick={toggleNotifications}
            className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors relative"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadNotificationCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center shadow">
                {unreadNotificationCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown Modal */}
          {isNotificationsOpen && (
            <div className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-xl border border-slate-200 py-3 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="px-4 pb-2 border-b border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold uppercase text-slate-500 tracking-wider">
                  {getTranslation(currentLanguage, "headerNotices")}
                </span>
                <span className="text-[11px] font-semibold text-emerald-600">
                  {getTranslation(currentLanguage, "headerMarkRead")}
                </span>
              </div>
              <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto">
                {notifications.map((n) => (
                  <div key={n.id} className="p-3.5 hover:bg-slate-50 transition-colors">
                    <div className="flex items-start gap-2.5">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                      <div>
                        <p className="text-xs font-bold text-slate-900">{n.title}</p>
                        <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">{n.desc}</p>
                        <span className="text-[10px] text-slate-400 mt-1 block">{n.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Avatar & Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-xl hover:bg-slate-100 transition-colors border border-slate-200/80 bg-white"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white font-extrabold text-xs flex items-center justify-center shadow-sm">
              {getInitials(user?.name)}
            </div>
            <div className="text-left hidden sm:block">
              <p className="text-xs font-bold text-slate-900 truncate max-w-[140px]">{user?.name || "Citizen User"}</p>
              <p className="text-[10px] font-semibold text-emerald-600 uppercase tracking-wider">{user?.role === "admin" ? "Local Admin" : "Citizen"}</p>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {/* Profile Menu Dropdown */}
          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/50">
                <p className="text-xs font-bold text-slate-900">{user?.name || "Citizen User"}</p>
                <p className="text-[11px] text-slate-500">{user?.emailOrPhone || "Verified Account"}</p>
                <div className="mt-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                  <ShieldCheck className="w-3 h-3" /> {getTranslation(currentLanguage, "headerAadhaarVerified")}
                </div>
              </div>

              <div className="py-1 text-xs text-slate-700">
                <Link
                  href="/citizen/privacy"
                  className="flex items-center gap-2.5 px-4 py-2 hover:bg-slate-100 transition-colors"
                  onClick={() => setIsProfileOpen(false)}
                >
                  <User className="w-3.5 h-3.5 text-slate-500" />
                  <span>{getTranslation(currentLanguage, "headerMyProfile")}</span>
                </Link>
                <Link
                  href="/login"
                  className="flex items-center gap-2.5 px-4 py-2 hover:bg-slate-100 transition-colors"
                  onClick={() => setIsProfileOpen(false)}
                >
                  <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500" />
                  <span>{getTranslation(currentLanguage, "headerSettings")}</span>
                </Link>
              </div>

              <div className="pt-1 border-t border-slate-100">
                <button
                  onClick={() => {
                    setIsProfileOpen(false);
                    logout();
                  }}
                  className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>{getTranslation(currentLanguage, "headerLogout")}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

