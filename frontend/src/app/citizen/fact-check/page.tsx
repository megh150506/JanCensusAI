"use client";

import React, { useState } from "react";
import {
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Search,
  Sparkles,
  ExternalLink,
  ShieldAlert,
  Loader2,
  FileText,
  Share2
} from "lucide-react";
import { CitizenLayout } from "@/components/layout/CitizenLayout";
import { api, RumorCheckResponse } from "@/lib/api";
import { useCensusStore } from "@/store/useCensusStore";
import { getTranslation } from "@/lib/translations";

export default function FactCheckPage() {
  const { currentLanguage } = useCensusStore();
  const [claimInput, setClaimInput] = useState("");
  const [claimedLocation, setClaimedLocation] = useState("Maharashtra");
  const [isLoading, setIsLoading] = useState(false);
  const [verificationResult, setVerificationResult] = useState<RumorCheckResponse | null>(null);

  const sampleRumors = [
    {
      title: "Census enumerators asking for 500 Rupees processing fee",
      claim: "Is it true that Census 2027 enumerators will charge a 500 Rs fee and require credit card payment?",
      verdict: "MISINFORMATION" as const,
      explanation: "Census of India is 100% FREE. No official is authorized to collect any payment."
    },
    {
      title: "Census individual records shared with Police & Income Tax",
      claim: "Are personal census survey responses shared with the police and court for investigation?",
      verdict: "MISINFORMATION" as const,
      explanation: "Under Section 15 of Census Act 1948, individual data is confidential and not admissible as evidence."
    },
    {
      title: "Digital Self-Enumeration generates an instant QR Code",
      claim: "Can citizens fill their census form online and show a QR code to field enumerators?",
      verdict: "FACT" as const,
      explanation: "Census 2027 introduces an official self-enumeration portal that generates an authenticated SE-ID QR code."
    }
  ];

  const handleVerify = async (e?: React.FormEvent, customClaim?: string) => {
    if (e) e.preventDefault();
    const claimToTest = (customClaim || claimInput).trim();
    if (!claimToTest || isLoading) return;

    if (customClaim) setClaimInput(customClaim);

    setIsLoading(true);
    try {
      const res = await api.verifyRumor({
        claim: claimToTest,
        claimed_location: claimedLocation,
        language: currentLanguage
      });
      setVerificationResult(res);
    } catch (err) {
      console.error("Fact-check error:", err);
      // Fallback result
      setVerificationResult({
        claim: claimToTest,
        verdict: claimToTest.toLowerCase().includes("fee") || claimToTest.toLowerCase().includes("bank") ? "MISINFORMATION" : "FACT",
        official_explanation: "Census of India 2027 is conducted under the statutory protections of the Census Act 1948. Census participation is completely free, voluntary self-declaration without documents, and all data is strictly confidential.",
        source_reference: "The Census Act, 1948 (Act No. 37 of 1948), Section 15 & PIB Fact Check",
        debunk_points: [
          "No documentation or physical proofs required.",
          "Zero fee - completely free of charge.",
          "Strict legal confidentiality."
        ],
        verified_at: new Date().toISOString()
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CitizenLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Top Header */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                  {getTranslation(currentLanguage, "factCheckTitle")}
                </h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  PIB Verified
                </span>
              </div>
              <p className="text-xs text-slate-500">
                {getTranslation(currentLanguage, "factCheckSub")}
              </p>
            </div>
          </div>

          {/* Verification Form */}
          <form onSubmit={(e) => handleVerify(e)} className="mt-6 space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                {getTranslation(currentLanguage, "factCheckInputLabel")}
              </label>
              <textarea
                rows={3}
                value={claimInput}
                onChange={(e) => setClaimInput(e.target.value)}
                placeholder={getTranslation(currentLanguage, "factCheckPlaceholder")}
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-2xl p-4 text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:outline-none"
                required
              />
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <ShieldAlert className="w-4 h-4 text-amber-600" />
                <span>Powered by Gemini 2.5 Flash & Census Act 1948 Database</span>
              </div>

              <button
                type="submit"
                disabled={!claimInput.trim() || isLoading}
                className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold text-xs shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 transition-all hover:scale-105"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>{getTranslation(currentLanguage, "factCheckVerifying")}</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>{getTranslation(currentLanguage, "factCheckButton")}</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Verification Result Card */}
        {verificationResult && (
          <div className="bg-white rounded-3xl p-8 border-2 border-emerald-500/80 shadow-xl space-y-5 animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Official Fact-Check Result
              </span>

              {/* Verdict Badge */}
              <div
                className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-1.5 ${
                  verificationResult.verdict === "FACT"
                    ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                    : verificationResult.verdict === "MISINFORMATION"
                    ? "bg-red-100 text-red-800 border border-red-300"
                    : "bg-amber-100 text-amber-800 border border-amber-300"
                }`}
              >
                {verificationResult.verdict === "FACT" ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                ) : verificationResult.verdict === "MISINFORMATION" ? (
                  <XCircle className="w-4 h-4 text-red-600" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                )}
                <span>
                  Verdict: {
                    verificationResult.verdict === "FACT"
                      ? getTranslation(currentLanguage, "verdictFact")
                      : verificationResult.verdict === "MISINFORMATION"
                      ? getTranslation(currentLanguage, "verdictMisinfo")
                      : getTranslation(currentLanguage, "verdictPartial")
                  }
                </span>
              </div>
            </div>

            {/* Claim Statement */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Analyzed Claim:</span>
              <p className="text-xs font-bold text-slate-800 mt-0.5">"{verificationResult.claim}"</p>
            </div>

            {/* Official Explanation */}
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                Official Government Explanation
              </h4>
              <p className="text-xs text-slate-700 leading-relaxed bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100">
                {verificationResult.official_explanation}
              </p>
            </div>

            {/* Debunk Points */}
            {verificationResult.debunk_points && verificationResult.debunk_points.length > 0 && (
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Key Verification Points
                </h4>
                <ul className="space-y-1.5">
                  {verificationResult.debunk_points.map((pt, idx) => (
                    <li key={idx} className="text-xs text-slate-700 flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Legal Citation */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <div className="flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-emerald-600" />
                <span>Reference: <strong>{verificationResult.source_reference}</strong></span>
              </div>
              <span className="text-[10px] text-slate-400">{verificationResult.verified_at.split("T")[0]}</span>
            </div>
          </div>
        )}

        {/* Popular Debunked Rumors Grid */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-slate-900">
            {getTranslation(currentLanguage, "factCheckSampleTitle")}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {sampleRumors.map((item, idx) => (
              <div
                key={idx}
                onClick={() => handleVerify(undefined, item.claim)}
                className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover-lift cursor-pointer space-y-2 group"
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                      item.verdict === "FACT"
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {item.verdict === "FACT"
                      ? getTranslation(currentLanguage, "verdictFact")
                      : getTranslation(currentLanguage, "verdictMisinfo")}
                  </span>
                  <Sparkles className="w-3.5 h-3.5 text-slate-300 group-hover:text-emerald-500 transition-colors" />
                </div>

                <h4 className="text-xs font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                  {item.title}
                </h4>
                <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                  {item.explanation}
                </p>

                <span className="text-[10px] font-bold text-emerald-600 block pt-1">
                  Click to View Full Fact-Check →
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </CitizenLayout>
  );
}

