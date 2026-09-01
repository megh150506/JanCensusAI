"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Layers,
  CalendarDays,
  FileCheck2,
  Bot,
  ShieldCheck,
  HelpCircle,
  PhoneCall,
  Globe2,
  ExternalLink,
  ChevronDown,
  Sparkles,
  BarChart3,
  LogOut,
  UserCheck
} from "lucide-react";
import { SUPPORTED_LANGUAGES, useCensusStore } from "@/store/useCensusStore";
import { useAuthStore } from "@/store/useAuthStore";

interface SidebarProps {
  role?: "citizen" | "admin";
}

interface NavItem {
  name: string;
  href: string;
  icon: React.ElementType;
  badge?: string;
  isAction?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ role = "citizen" }) => {
  const pathname = usePathname();
  const { currentLanguage, setLanguage, openAiDrawer } = useCensusStore();
  const { user, logout } = useAuthStore();

  const citizenNavItems: NavItem[] = [
    { name: "Dashboard", href: "/citizen", icon: LayoutDashboard },
    { name: "Census Phases", href: "/citizen/phases", icon: Layers },
    { name: "State Schedule", href: "/citizen/schedule", icon: CalendarDays },
    { name: "Self-Enumeration", href: "/citizen/guide", icon: FileCheck2, badge: "Phase 1" },
    { name: "AI Assistant", href: "#ai", icon: Bot, isAction: true },
    { name: "Fact Check", href: "/citizen/fact-check", icon: ShieldCheck, badge: "PIB Verified" },
    { name: "Privacy & Safety", href: "/citizen/privacy", icon: UserCheck },
  ];

  const adminNavItems: NavItem[] = [
    { name: "Analytics Dashboard", href: "/admin", icon: BarChart3 },
    { name: "State Schedules", href: "/citizen/schedule", icon: CalendarDays },
    { name: "Citizen Preview", href: "/citizen", icon: LayoutDashboard },
    { name: "Fact Check Monitor", href: "/citizen/fact-check", icon: ShieldCheck },
  ];

  const navItems: NavItem[] = role === "admin" ? adminNavItems : citizenNavItems;

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col h-screen fixed left-0 top-0 z-30 select-none">
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-100 flex items-center justify-between">
        <Link href={role === "admin" ? "/admin" : "/citizen"} className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-700 via-emerald-600 to-green-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
            <span className="font-extrabold text-xl tracking-tight">🇮🇳</span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-slate-900 text-lg tracking-tight">JanCensus</span>
              <span className="text-xs font-semibold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">AI</span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium">Census of India 2027</p>
          </div>
        </Link>
      </div>

      {/* Role Badge Indicator */}
      <div className="px-5 py-2.5 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">Active Portal</span>
        <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
          role === "admin" ? "bg-amber-100 text-amber-800" : "bg-emerald-100 text-emerald-800"
        }`}>
          {role === "admin" ? "Administrator" : "Citizen Portal"}
        </span>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          if (item.isAction) {
            return (
              <button
                key={item.name}
                onClick={() => openAiDrawer()}
                className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all text-emerald-700 bg-emerald-50/80 hover:bg-emerald-100/80 group"
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 text-emerald-600 group-hover:scale-110 transition-transform" />
                  <span>{item.name}</span>
                </div>
                <span className="flex items-center gap-1 text-[10px] font-bold uppercase bg-emerald-600 text-white px-2 py-0.5 rounded-full">
                  <Sparkles className="w-2.5 h-2.5" />
                  Live
                </span>
              </button>
            );
          }

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? "bg-emerald-600 text-white shadow-sm shadow-emerald-600/20 font-semibold"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-slate-400"}`} />
                <span>{item.name}</span>
              </div>
              {item.badge && (
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-slate-100 text-slate-600 border border-slate-200"
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </div>

      {/* Language Selector Dropdown */}
      <div className="px-4 py-3 border-t border-slate-100">
        <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
          <span className="flex items-center gap-1 font-medium">
            <Globe2 className="w-3.5 h-3.5" /> Language
          </span>
          <span className="font-semibold text-emerald-600">{SUPPORTED_LANGUAGES.find(l => l.code === currentLanguage)?.nativeName}</span>
        </div>
        <select
          value={currentLanguage}
          onChange={(e) => setLanguage(e.target.value)}
          className="w-full text-xs bg-slate-50 border border-slate-200 text-slate-800 rounded-lg p-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none cursor-pointer"
        >
          {SUPPORTED_LANGUAGES.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.name} ({lang.nativeName})
            </option>
          ))}
        </select>
      </div>

      {/* Need Help Helpline Card */}
      <div className="p-4 border-t border-slate-100">
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-3.5 shadow-sm">
          <div className="flex items-center gap-2 mb-1.5">
            <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <PhoneCall className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">National Helpline</span>
          </div>
          <p className="text-base font-extrabold tracking-wide">1800-11-2027</p>
          <p className="text-[10px] text-slate-300 mt-0.5">Toll-free • 24x7 Multi-lingual</p>
        </div>
      </div>
    </aside>
  );
};
