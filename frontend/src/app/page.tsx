"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight, ShieldCheck, UserCheck, Building2, Sparkles } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";

export default function RootPage() {
  const router = useRouter();
  const { isAuthenticated, user, initializeAuth } = useAuthStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    initializeAuth();
    setMounted(true);
  }, [initializeAuth]);

  useEffect(() => {
    if (mounted && isAuthenticated) {
      if (user?.role === "admin") {
        router.replace("/admin");
      } else {
        router.replace("/citizen");
      }
    }
  }, [mounted, isAuthenticated, user, router]);

  if (!mounted || isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-emerald-600 border-t-transparent animate-spin" />
          <span className="text-xs font-semibold text-slate-500">Connecting to JanCensus AI...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-between py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto w-full text-center space-y-8 my-auto">
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-emerald-700 via-emerald-600 to-green-500 text-white flex items-center justify-center mx-auto shadow-xl shadow-emerald-600/20">
          <span className="text-4xl">🇮🇳</span>
        </div>

        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Census of India 2027 • Official AI Platform</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
            JanCensus AI
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto leading-relaxed font-medium">
            The official digital self-enumeration, state scheduling, and public awareness portal powered by Gemini AI and protected under Section 15 of the Census Act 1948.
          </p>
        </div>

        {/* Portals CTA Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto">
          <Link
            href="/login?role=citizen"
            className="p-4 sm:p-5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-lg shadow-emerald-600/25 flex items-center justify-center gap-3 transition-all hover:scale-105 active:scale-95 group"
          >
            <UserCheck className="w-5 h-5 text-emerald-200" />
            <span>Citizen Portal →</span>
          </Link>

          <Link
            href="/login?role=admin"
            className="p-4 sm:p-5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-lg shadow-slate-900/25 flex items-center justify-center gap-3 transition-all hover:scale-105 active:scale-95 group"
          >
            <Building2 className="w-5 h-5 text-slate-400" />
            <span>Admin Dashboard →</span>
          </Link>
        </div>

        <div className="pt-6 border-t border-slate-200/60 max-w-md mx-auto flex items-center justify-center gap-2 text-xs text-slate-500">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Statutorily Protected under Section 15, Census Act 1948</span>
        </div>
      </div>
    </div>
  );
}
