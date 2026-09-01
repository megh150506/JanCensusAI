"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { AIChatDrawer } from "../ai/AIChatDrawer";
import { useAuthStore } from "@/store/useAuthStore";

export const CitizenLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const { isAuthenticated, initializeAuth } = useAuthStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    initializeAuth();
    setMounted(true);
  }, [initializeAuth]);

  useEffect(() => {
    if (mounted && !isAuthenticated) {
      router.replace("/login");
    }
  }, [mounted, isAuthenticated, router]);

  if (!mounted || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-emerald-600 border-t-transparent animate-spin" />
          <span className="text-xs font-semibold text-slate-500">Verifying session...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col">
      <Sidebar role="citizen" />
      <div className="pl-64 flex flex-col flex-1">
        <Header />
        <main className="p-8 max-w-7xl mx-auto w-full flex-1">
          {children}
        </main>
      </div>
      <AIChatDrawer />
    </div>
  );
};
