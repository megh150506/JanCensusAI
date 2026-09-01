"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ShieldCheck,
  Phone,
  Mail,
  Lock,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Building2,
  UserCheck,
  RefreshCw,
  User,
  Sparkles
} from "lucide-react";
import { useAuthStore, UserRole } from "@/store/useAuthStore";

function LoginFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuthStore();

  const roleParam = searchParams.get("role");
  const [role, setRole] = useState<UserRole>(roleParam === "admin" ? "admin" : "citizen");
  const [authTab, setAuthTab] = useState<"phone" | "google" | "email">("phone");

  useEffect(() => {
    if (roleParam === "admin") {
      setRole("admin");
    } else if (roleParam === "citizen") {
      setRole("citizen");
    }
  }, [roleParam]);

  // Form Inputs
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // OTP State
  const [otpStep, setOtpStep] = useState(false);
  const [otp, setOtp] = useState(["4", "8", "2", "0", "2", "7"]);
  const [formError, setFormError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // 1. Phone OTP Submit
  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!fullName.trim()) {
      setFormError("Please enter your Full Name.");
      return;
    }
    if (!phoneNumber || phoneNumber.replace(/\D/g, "").length < 10) {
      setFormError("Please enter a valid 10-digit mobile number.");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setOtpStep(true);
    }, 400);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const cleanPhone = phoneNumber.startsWith("+91") ? phoneNumber : `+91 ${phoneNumber}`;
      login({
        name: fullName.trim() || (role === "admin" ? "Local Administrator" : "Citizen User"),
        emailOrPhone: cleanPhone,
        role: role,
      });
      router.push(role === "admin" ? "/admin" : "/citizen");
    }, 400);
  };

  // 2. Email & Password Submit
  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!fullName.trim()) {
      setFormError("Please enter your Full Name.");
      return;
    }
    if (!email.includes("@")) {
      setFormError("Please enter a valid email address.");
      return;
    }
    if (!password || password.length < 4) {
      setFormError("Password must be at least 4 characters.");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      login({
        name: fullName.trim(),
        emailOrPhone: email,
        role: role,
      });
      router.push(role === "admin" ? "/admin" : "/citizen");
    }, 400);
  };

  // 3. Google Login Submit
  const handleGoogleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    const resolvedName = fullName.trim() || (role === "admin" ? "Dr. Sunita Rao (IAS)" : "Meghna Agarwal");
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      login({
        name: resolvedName,
        emailOrPhone: `${resolvedName.toLowerCase().replace(/\s+/g, ".")}@gmail.com`,
        role: role,
        avatarUrl: "https://lh3.googleusercontent.com/a/default-user=s96-c",
      });
      router.push(role === "admin" ? "/admin" : "/citizen");
    }, 400);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-10 px-4 sm:px-6 lg:px-8">
      {/* Header Badge & Title */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center mb-6">
        <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-md mb-3 text-2xl">
          🇮🇳
        </div>
        <h2 className="text-2xl font-black tracking-tight text-slate-900">
          JanCensus AI Portal
        </h2>
        <p className="mt-1 text-xs text-slate-500 font-medium">
          Office of the Registrar General & Census Commissioner, India (2027)
        </p>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-lg rounded-3xl border border-slate-200">
          {/* Portal Switcher Toggle */}
          <div className="mb-6">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 text-center">
              Select Portal Access Role
            </label>
            <div className="grid grid-cols-2 gap-2 bg-slate-100 p-1.5 rounded-2xl">
              <button
                type="button"
                onClick={() => {
                  setRole("citizen");
                  setOtpStep(false);
                  setFormError("");
                }}
                className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  role === "citizen"
                    ? "bg-white text-emerald-700 shadow-sm border border-slate-200"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                <UserCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Citizen</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setRole("admin");
                  setOtpStep(false);
                  setFormError("");
                }}
                className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  role === "admin"
                    ? "bg-white text-amber-700 shadow-sm border border-slate-200"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                <Building2 className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Local Administrator</span>
              </button>
            </div>
          </div>

          {/* Login Methods Tab Bar */}
          <div className="flex border-b border-slate-200 mb-6 text-xs font-semibold">
            <button
              type="button"
              onClick={() => {
                setAuthTab("phone");
                setOtpStep(false);
                setFormError("");
              }}
              className={`flex-1 pb-3 text-center transition-colors relative flex items-center justify-center gap-1.5 ${
                authTab === "phone" ? "text-emerald-700 font-bold border-b-2 border-emerald-600" : "text-slate-400 hover:text-slate-700"
              }`}
            >
              <Phone className="w-3.5 h-3.5 shrink-0" />
              <span>Phone + OTP</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setAuthTab("google");
                setOtpStep(false);
                setFormError("");
              }}
              className={`flex-1 pb-3 text-center transition-colors relative flex items-center justify-center gap-1.5 ${
                authTab === "google" ? "text-emerald-700 font-bold border-b-2 border-emerald-600" : "text-slate-400 hover:text-slate-700"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 shrink-0 text-amber-500" />
              <span>Google Sign-In</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setAuthTab("email");
                setOtpStep(false);
                setFormError("");
              }}
              className={`flex-1 pb-3 text-center transition-colors relative flex items-center justify-center gap-1.5 ${
                authTab === "email" ? "text-emerald-700 font-bold border-b-2 border-emerald-600" : "text-slate-400 hover:text-slate-700"
              }`}
            >
              <Mail className="w-3.5 h-3.5 shrink-0" />
              <span>Email & Password</span>
            </button>
          </div>

          {/* Error Banner */}
          {formError && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 text-red-700 text-xs flex items-center gap-2 border border-red-200">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{formError}</span>
            </div>
          )}

          {/* TAB 1: Phone + OTP */}
          {authTab === "phone" && (
            <div>
              {!otpStep ? (
                <form onSubmit={handleSendOtp} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Full Name *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Meghna Agarwal"
                        className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 pl-9 text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:outline-none"
                        required
                      />
                      <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      10-Digit Indian Mobile Number *
                    </label>
                    <div className="flex rounded-xl shadow-sm">
                      <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-slate-200 bg-slate-100 text-slate-600 text-xs font-bold">
                        +91
                      </span>
                      <input
                        type="tel"
                        maxLength={10}
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ""))}
                        placeholder="9876543210"
                        className="flex-1 min-w-0 block w-full px-3.5 py-2.5 rounded-none rounded-r-xl text-xs bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:outline-none"
                        required
                      />
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">
                      A 6-digit verification OTP will be sent to this number.
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full mt-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md flex items-center justify-center gap-2 transition-all"
                  >
                    {isLoading ? (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        <span>Send OTP</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <form onSubmit={handleVerifyOtp} className="space-y-4">
                  <div className="text-center p-3 bg-emerald-50 rounded-2xl border border-emerald-200">
                    <p className="text-xs font-bold text-emerald-900">
                      OTP Sent to +91 {phoneNumber}
                    </p>
                    <p className="text-[11px] text-emerald-700 mt-0.5">
                      Use mock OTP: <strong className="tracking-widest">4 8 2 0 2 7</strong>
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-2 text-center">
                      Enter 6-Digit OTP
                    </label>
                    <div className="flex justify-center gap-2">
                      {otp.map((digit, idx) => (
                        <input
                          key={idx}
                          type="text"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => {
                            const newOtp = [...otp];
                            newOtp[idx] = e.target.value;
                            setOtp(newOtp);
                          }}
                          className="w-10 h-11 text-center font-bold text-base bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:outline-none"
                        />
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md flex items-center justify-center gap-2 transition-all"
                  >
                    {isLoading ? (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Verify & Enter {role === "admin" ? "Admin Portal" : "Dashboard"}</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setOtpStep(false)}
                    className="w-full text-center text-xs text-slate-500 hover:text-slate-800 font-medium py-1"
                  >
                    ← Change Mobile Number
                  </button>
                </form>
              )}
            </div>
          )}

          {/* TAB 2: Google Sign-In */}
          {authTab === "google" && (
            <form onSubmit={handleGoogleLogin} className="space-y-4 py-1">
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-center">
                <p className="text-xs font-medium text-slate-600 leading-relaxed">
                  Sign in instantly with your verified Google account as{" "}
                  <strong className="text-slate-900">{role === "admin" ? "Local Administrator" : "Citizen"}</strong>.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Full Name (Account Display Name)
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Meghna Agarwal"
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 pl-9 text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:outline-none"
                  />
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 font-bold text-xs shadow-sm flex items-center justify-center gap-3 transition-all"
              >
                {isLoading ? (
                  <RefreshCw className="w-4 h-4 animate-spin text-emerald-600" />
                ) : (
                  <>
                    <svg className="w-5 h-5 shrink-0" style={{ width: "20px", height: "20px" }} viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                      />
                    </svg>
                    <span>Sign In with Google</span>
                  </>
                )}
              </button>
            </form>
          )}

          {/* TAB 3: Email & Password */}
          {authTab === "email" && (
            <form onSubmit={handleEmailLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Meghna Agarwal"
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 pl-9 text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:outline-none"
                    required
                  />
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Email Address *
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="meghna@example.com"
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 pl-9 text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:outline-none"
                    required
                  />
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Password *
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 pl-9 text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:outline-none"
                    required
                  />
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md flex items-center justify-center gap-2 transition-all"
              >
                {isLoading ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <span>Sign In to {role === "admin" ? "Admin Portal" : "Citizen Portal"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* Legal Notice */}
          <div className="mt-6 pt-4 border-t border-slate-100 flex items-start gap-2 text-[11px] text-slate-500 leading-snug">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>
              Your identity and responses are protected under <strong>Section 15 of the Census Act, 1948</strong>.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-emerald-600 border-t-transparent animate-spin" />
        </div>
      }
    >
      <LoginFormContent />
    </Suspense>
  );
}
