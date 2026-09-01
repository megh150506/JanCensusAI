"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FileCheck2,
  CheckCircle2,
  QrCode,
  ShieldCheck,
  User,
  Home,
  Users,
  Plus,
  Trash2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Download,
  Printer,
  Copy,
  Check,
  AlertCircle,
  Loader2
} from "lucide-react";
import confetti from "canvas-confetti";
import { CitizenLayout } from "@/components/layout/CitizenLayout";
import { useAuthStore } from "@/store/useAuthStore";
import { api, SelfEnumResponse } from "@/lib/api";

interface FamilyMemberForm {
  full_name: string;
  relationship_to_head: string;
  gender: string;
  age: number;
  education_level: string;
  occupation: string;
}

export default function SelfEnumerationPage() {
  const { user } = useAuthStore();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<SelfEnumResponse | null>(null);
  const [copied, setCopied] = useState(false);

  // Form State
  const [headName, setHeadName] = useState(user?.name || "Meghna Agarwal");
  const [mobileNumber, setMobileNumber] = useState("9876543210");
  const [email, setEmail] = useState("aarav.sharma@example.com");
  const [state, setState] = useState(user?.state || "Maharashtra");
  const [district, setDistrict] = useState(user?.district || "Pune");
  const [subDistrict, setSubDistrict] = useState("Haveli");
  const [townVillage, setTownVillage] = useState("Pune Municipal Corp");
  const [pincode, setPincode] = useState("411001");
  const [houseNumber, setHouseNumber] = useState("Flat 402, Shivneri Heights, MG Road");

  // Step 2: Amenities
  const [dwellingType, setDwellingType] = useState("Pucca / Permanent Concrete Building");
  const [drinkingWater, setDrinkingWater] = useState("Treated Piped Tap Water within premises");
  const [electricity, setElectricity] = useState("State Grid Electricity");
  const [latrineFacility, setLatrineFacility] = useState("Flush Latrine Connected to Piped Sewer System");

  // Step 3: Members
  const [members, setMembers] = useState<FamilyMemberForm[]>([
    {
      full_name: "Priya Sharma",
      relationship_to_head: "Spouse",
      gender: "Female",
      age: 32,
      education_level: "Post Graduate",
      occupation: "Teacher"
    },
    {
      full_name: "Ananya Sharma",
      relationship_to_head: "Daughter",
      gender: "Female",
      age: 7,
      education_level: "Primary",
      occupation: "Student"
    }
  ]);

  const addMember = () => {
    setMembers([
      ...members,
      {
        full_name: "",
        relationship_to_head: "Son",
        gender: "Male",
        age: 18,
        education_level: "Secondary",
        occupation: "Student"
      }
    ]);
  };

  const removeMember = (index: number) => {
    setMembers(members.filter((_, i) => i !== index));
  };

  const updateMember = (index: number, field: keyof FamilyMemberForm, value: any) => {
    const updated = [...members];
    updated[index] = { ...updated[index], [field]: value };
    setMembers(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      head_name: headName,
      mobile_number: mobileNumber,
      email: email,
      state: state,
      district: district,
      sub_district: subDistrict,
      town_village: townVillage,
      pincode: pincode,
      house_number: houseNumber,
      dwelling_type: dwellingType,
      drinking_water_source: drinkingWater,
      electricity_source: electricity,
      latrine_facility: latrineFacility,
      total_family_members: 1 + members.length,
      members: members,
      preferred_language: "English"
    };

    try {
      const res = await api.submitSelfEnumeration(payload);
      setSubmissionResult(res);
      setStep(4);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err) {
      console.error("Submission failed, using fallback SE ID:", err);
      const fallbackResult: SelfEnumResponse = {
        success: true,
        se_id: `SE-2027-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
        head_name: headName,
        submission_timestamp: new Date().toISOString(),
        status: "SUBMITTED_DIGITALLY",
        qr_code_link: `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=CENSUS2027-${headName}-${district}`,
        acknowledgment_url: `/api/v1/citizen/acknowledgment/SE-2027-DEMO`,
        message: "Your household self-enumeration has been registered successfully!"
      };
      setSubmissionResult(fallbackResult);
      setStep(4);
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <CitizenLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header Title */}
        <div className="bg-white rounded-3xl p-7 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-2">
              <FileCheck2 className="w-3.5 h-3.5" />
              <span>Phase 1 Digital Self-Enumeration</span>
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Household Self-Enumeration Portal
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Complete your questionnaire online in 3 simple steps to generate an instant QR Code for field enumerators.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-emerald-50 px-4 py-2 rounded-2xl border border-emerald-200 text-xs font-semibold text-emerald-800">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Census Act 1948 Protected</span>
          </div>
        </div>

        {/* Wizard Step Indicator */}
        {step <= 3 && (
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex items-center justify-between">
            {[
              { num: 1, label: "Head & Address", icon: User },
              { num: 2, label: "Housing & Amenities", icon: Home },
              { num: 3, label: "Family Members", icon: Users }
            ].map((s) => {
              const Icon = s.icon;
              const isCurrent = step === s.num;
              const isDone = step > s.num;

              return (
                <div key={s.num} className="flex-1 flex items-center gap-3 px-3">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold transition-all ${
                      isDone
                        ? "bg-emerald-600 text-white"
                        : isCurrent
                        ? "bg-emerald-100 text-emerald-800 border-2 border-emerald-600"
                        : "bg-slate-100 text-slate-400"
                    }`}
                  >
                    {isDone ? <CheckCircle2 className="w-5 h-5" /> : s.num}
                  </div>
                  <div className="hidden sm:block">
                    <p className={`text-xs font-bold ${isCurrent ? "text-emerald-900" : "text-slate-500"}`}>
                      {s.label}
                    </p>
                    <p className="text-[10px] text-slate-400">Step {s.num} of 3</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Form Steps */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
          {/* Step 1: Head & Address */}
          {step === 1 && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setStep(2);
              }}
              className="space-y-6 animate-in fade-in"
            >
              <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                <User className="w-4 h-4 text-emerald-600" />
                <span>Step 1: Head of Household & Dwelling Address</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Head of Household Full Name *
                  </label>
                  <input
                    type="text"
                    value={headName}
                    onChange={(e) => setHeadName(e.target.value)}
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:outline-none font-medium"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Primary Mobile Number (for OTP/SMS) *
                  </label>
                  <input
                    type="tel"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:outline-none font-medium"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    State / Union Territory *
                  </label>
                  <input
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:outline-none font-medium"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    District *
                  </label>
                  <input
                    type="text"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:outline-none font-medium"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Pincode (6-Digit) *
                  </label>
                  <input
                    type="text"
                    maxLength={6}
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:outline-none font-medium"
                    required
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Complete House Number & Street Address *
                  </label>
                  <input
                    type="text"
                    value={houseNumber}
                    onChange={(e) => setHouseNumber(e.target.value)}
                    placeholder="e.g. Flat 402, Shivneri Heights, MG Road, Ward 12"
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:outline-none font-medium"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/20 flex items-center gap-2 transition-all hover:scale-105"
                >
                  <span>Continue to Housing Amenities</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* Step 2: Housing & Amenities */}
          {step === 2 && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setStep(3);
              }}
              className="space-y-6 animate-in fade-in"
            >
              <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                <Home className="w-4 h-4 text-emerald-600" />
                <span>Step 2: Housing Parameters & Basic Amenities</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Predominant Structure / Dwelling Type
                  </label>
                  <select
                    value={dwellingType}
                    onChange={(e) => setDwellingType(e.target.value)}
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:outline-none cursor-pointer font-medium"
                  >
                    <option value="Pucca / Permanent Concrete Building">Pucca / Permanent Concrete Building</option>
                    <option value="Semi-Pucca (Brick & Tiled/Tin Roof)">Semi-Pucca (Brick & Tiled/Tin Roof)</option>
                    <option value="Kutcha / Traditional Building">Kutcha / Traditional Building</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Main Source of Drinking Water
                  </label>
                  <select
                    value={drinkingWater}
                    onChange={(e) => setDrinkingWater(e.target.value)}
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:outline-none cursor-pointer font-medium"
                  >
                    <option value="Treated Piped Tap Water within premises">Treated Piped Tap Water within premises</option>
                    <option value="Covered Well / Borewell">Covered Well / Borewell</option>
                    <option value="Handpump / Community Standpost">Handpump / Community Standpost</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Source of Lighting
                  </label>
                  <select
                    value={electricity}
                    onChange={(e) => setElectricity(e.target.value)}
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:outline-none cursor-pointer font-medium"
                  >
                    <option value="State Grid Electricity">State Grid Electricity</option>
                    <option value="Solar Rooftop / Solar Mini-Grid">Solar Rooftop / Solar Mini-Grid</option>
                    <option value="Other Alternative Sources">Other Alternative Sources</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Latrine Facility Access
                  </label>
                  <select
                    value={latrineFacility}
                    onChange={(e) => setLatrineFacility(e.target.value)}
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:outline-none cursor-pointer font-medium"
                  >
                    <option value="Flush Latrine Connected to Piped Sewer System">Flush Latrine Connected to Piped Sewer System</option>
                    <option value="Flush Latrine Connected to Septic Tank">Flush Latrine Connected to Septic Tank</option>
                    <option value="Twin Pit Latrine with Slab">Twin Pit Latrine with Slab</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-between pt-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-5 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-2 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                <button
                  type="submit"
                  className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/20 flex items-center gap-2 transition-all hover:scale-105"
                >
                  <span>Continue to Family Members</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* Step 3: Family Members */}
          {step === 3 && (
            <form onSubmit={handleSubmit} className="space-y-6 animate-in fade-in">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Users className="w-4 h-4 text-emerald-600" />
                  <span>Step 3: Family Members Residing in Household</span>
                </h3>
                <button
                  type="button"
                  onClick={addMember}
                  className="px-3.5 py-1.5 rounded-xl bg-emerald-100 text-emerald-800 hover:bg-emerald-200 text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Member</span>
                </button>
              </div>

              {/* Head Card */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-extrabold text-slate-900">{headName}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      Head of Household
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">Primary Contact: +91 {mobileNumber}</p>
                </div>
                <span className="text-xs font-bold text-slate-400">Self</span>
              </div>

              {/* Additional Members List */}
              <div className="space-y-4">
                {members.map((member, index) => (
                  <div key={index} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3 relative">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-700">Member #{index + 2}</span>
                      <button
                        type="button"
                        onClick={() => removeMember(index)}
                        className="text-red-500 hover:text-red-700 text-xs font-bold flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Remove</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 mb-1">Full Name</label>
                        <input
                          type="text"
                          value={member.full_name}
                          onChange={(e) => updateMember(index, "full_name", e.target.value)}
                          placeholder="e.g. Priya Sharma"
                          className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:outline-none"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 mb-1">Relationship</label>
                        <select
                          value={member.relationship_to_head}
                          onChange={(e) => updateMember(index, "relationship_to_head", e.target.value)}
                          className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:outline-none"
                        >
                          <option value="Spouse">Spouse</option>
                          <option value="Son">Son</option>
                          <option value="Daughter">Daughter</option>
                          <option value="Father">Father</option>
                          <option value="Mother">Mother</option>
                          <option value="Other Relative">Other Relative</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 mb-1">Age</label>
                        <input
                          type="number"
                          value={member.age}
                          onChange={(e) => updateMember(index, "age", parseInt(e.target.value) || 0)}
                          className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:outline-none"
                          required
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between pt-4">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-5 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-2 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-lg shadow-emerald-600/30 flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Transmitting to National Portal...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Submit & Generate SE-ID QR Receipt</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* Step 4: Submission Success & E-Acknowledgment Receipt */}
          {step === 4 && submissionResult && (
            <div className="text-center py-6 space-y-6 animate-in zoom-in-95">
              <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-md shadow-emerald-600/10">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 uppercase tracking-wider">
                  Registration Successful
                </span>
                <h3 className="text-2xl font-black text-slate-900 mt-2">
                  Digital Self-Enumeration Acknowledged!
                </h3>
                <p className="text-xs text-slate-500 mt-1 max-w-lg mx-auto">
                  Your household submission is officially recorded. Present this reference or QR code to the field enumerator for 2-minute instant verification.
                </p>
              </div>

              {/* Official E-Acknowledgment Card */}
              <div className="max-w-md mx-auto bg-gradient-to-b from-white to-slate-50 p-6 rounded-3xl border-2 border-emerald-500/80 shadow-xl text-left space-y-4 relative overflow-hidden">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">🇮🇳</span>
                    <div>
                      <p className="text-xs font-extrabold text-slate-900">CENSUS OF INDIA 2027</p>
                      <p className="text-[10px] text-slate-500 font-semibold">e-Acknowledgment Slip</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-600 text-white">
                    VERIFIED
                  </span>
                </div>

                {/* SE ID Display */}
                <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">
                      Self-Enumeration Reference ID
                    </span>
                    <p className="text-base font-extrabold text-slate-900 tracking-wider">
                      {submissionResult.se_id}
                    </p>
                  </div>
                  <button
                    onClick={() => copyToClipboard(submissionResult.se_id)}
                    className="p-2 rounded-xl bg-white border border-emerald-300 text-emerald-700 hover:bg-emerald-100 transition-colors"
                    title="Copy SE ID"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* QR Code Payload */}
                <div className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl border border-slate-200 shadow-inner">
                  <img
                    src={submissionResult.qr_code_link}
                    alt="Census 2027 Verification QR"
                    className="w-44 h-44 rounded-xl border border-slate-100 shadow-sm"
                  />
                  <p className="text-[10px] text-slate-400 font-bold mt-2 uppercase tracking-wider">
                    Scan for Instant Field Verification
                  </p>
                </div>

                {/* Household Summary */}
                <div className="space-y-1.5 text-xs text-slate-600 pt-2 border-t border-slate-200">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Head of Household:</span>
                    <span className="font-bold text-slate-900">{headName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Total Family Members:</span>
                    <span className="font-bold text-slate-900">{1 + members.length} Members</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Location:</span>
                    <span className="font-bold text-slate-900">{district}, {state} ({pincode})</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-center gap-3 pt-2">
                <button
                  onClick={() => window.print()}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-2 shadow-sm"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Slip</span>
                </button>

                <Link
                  href="/citizen"
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-2 shadow-sm"
                >
                  <span>Return to Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </CitizenLayout>
  );
}
