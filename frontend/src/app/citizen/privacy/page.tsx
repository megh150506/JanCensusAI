"use client";

import React from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Lock,
  Scale,
  FileCheck,
  AlertOctagon,
  CheckCircle2,
  ArrowRight,
  EyeOff,
  UserCheck
} from "lucide-react";
import { CitizenLayout } from "@/components/layout/CitizenLayout";

export default function PrivacyPage() {
  const privacyPillars = [
    {
      title: "Section 15: Statutory Inadmissibility in Courts",
      icon: Scale,
      desc: "No individual census record is open to inspection or admissible as evidence in any judicial proceeding, court of law, or tribunal."
    },
    {
      title: "Total Protection from Police & Tax Authorities",
      icon: EyeOff,
      desc: "Personal data collected cannot be shared with, subpoenaed by, or accessed by police, Income Tax department, or immigration authorities."
    },
    {
      title: "Section 11: Criminal Penalties for Breach",
      icon: AlertOctagon,
      desc: "Any census officer or staff member who improperly discloses citizen information faces mandatory criminal prosecution and imprisonment."
    },
    {
      title: "Aggregated Statistical Publication Only",
      icon: FileCheck,
      desc: "Government agencies only publish anonymized, aggregated demographic statistics at national, state, district, and ward levels."
    }
  ];

  return (
    <CitizenLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>The Census Act, 1948 (Act No. 37 of 1948)</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
            Citizen Data Privacy & Statutory Legal Protections
          </h2>
          <p className="text-xs md:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Your personal information is protected by one of India's strictest statutory confidentiality frameworks. Understand your legal rights during Census 2027.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {privacyPillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div key={idx} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover-lift space-y-3">
                <div className="w-11 h-11 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-slate-900">{pillar.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{pillar.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Verification Checklist */}
        <div className="bg-gradient-to-br from-emerald-50 to-green-50/40 rounded-3xl p-7 border border-emerald-200/80 space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-emerald-600" />
            <span>How to Verify an Official Census Enumerator</span>
          </h3>

          <ul className="space-y-2.5 text-xs text-slate-700">
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Official Government Photo ID Card containing QR code verification.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Dedicated Census Mobile Tablet / App with Ministry of Home Affairs seal.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>ZERO FEES:</strong> Enumerators will NEVER ask for payment, fees, bank accounts, or OTPs.</span>
            </li>
          </ul>

          <div className="pt-3">
            <Link
              href="/citizen/guide"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition-all hover:scale-105"
            >
              <span>Self-Enumerate Online First</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </CitizenLayout>
  );
}
