"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  CalendarDays,
  Search,
  MapPin,
  Clock,
  CheckCircle2,
  PhoneCall,
  UserCheck,
  ShieldCheck,
  ArrowRight,
  ChevronRight,
  Filter
} from "lucide-react";
import { CitizenLayout } from "@/components/layout/CitizenLayout";
import { api, StateSchedule } from "@/lib/api";

export default function StateSchedulePage() {
  const [schedules, setSchedules] = useState<StateSchedule[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStateData, setSelectedStateData] = useState<StateSchedule | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadAllSchedules() {
      setIsLoading(true);
      try {
        const data = await api.getAllSchedules();
        setSchedules(data);
        if (data.length > 0) {
          setSelectedStateData(data[0]);
        }
      } catch (err) {
        console.error("Failed to load all schedules:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadAllSchedules();
  }, []);

  const filteredStates = schedules.filter((s) =>
    s.state_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.state_code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <CitizenLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold mb-2">
              <CalendarDays className="w-3.5 h-3.5" />
              <span>National Operations Calendar</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              Census 2027 State & District Schedule Directory
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Track Phase 1 (House Listing) and Phase 2 (Population Enumeration) dates across all 36 States and Union Territories.
            </p>
          </div>

          <div className="relative w-full md:w-72">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search state (e.g., Maharashtra, Delhi)..."
              className="w-full text-xs bg-slate-50 border border-slate-200 rounded-2xl py-3 pl-9 pr-4 text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:outline-none"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
          </div>
        </div>

        {/* State Grid & Detail Split View */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* States List */}
          <div className="lg:col-span-1 space-y-3">
            <h3 className="text-xs font-bold uppercase text-slate-400 tracking-wider px-1">
              Select State ({filteredStates.length})
            </h3>

            <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
              {filteredStates.map((st) => {
                const isSelected = selectedStateData?.state_code === st.state_code;
                return (
                  <button
                    key={st.state_code}
                    onClick={() => setSelectedStateData(st)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all ${
                      isSelected
                        ? "bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-600/20 font-bold"
                        : "bg-white text-slate-800 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-extrabold ${
                          isSelected ? "bg-white/20 text-white" : "bg-slate-100 text-slate-700"
                        }`}>
                          {st.state_code}
                        </span>
                        <span className="text-xs font-bold">{st.state_name}</span>
                      </div>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                        isSelected ? "bg-white/20 text-white" : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      }`}>
                        {st.total_districts} Dists
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Selected State Detailed Overview */}
          <div className="lg:col-span-2">
            {selectedStateData ? (
              <div className="bg-white rounded-3xl p-7 border border-slate-200 shadow-sm space-y-6 animate-in fade-in">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div>
                    <span className="text-xs font-extrabold text-emerald-700 uppercase tracking-wider">
                      {selectedStateData.state_code} • Official Schedule
                    </span>
                    <h3 className="text-2xl font-black text-slate-900 mt-1">
                      {selectedStateData.state_name}
                    </h3>
                  </div>

                  <span className="px-3.5 py-1.5 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold">
                    {selectedStateData.current_status}
                  </span>
                </div>

                {/* Timeline Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200">
                    <span className="text-[10px] font-bold uppercase text-emerald-800">
                      Phase 1 (House Listing & Housing Census)
                    </span>
                    <p className="text-sm font-extrabold text-slate-900 mt-1">
                      {selectedStateData.phase1_houselisting_window}
                    </p>
                    <p className="text-[11px] text-slate-600 mt-2">
                      Self-Enumeration Open: <strong className="text-emerald-800">{selectedStateData.self_enumeration_window}</strong>
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-blue-50/70 border border-blue-200">
                    <span className="text-[10px] font-bold uppercase text-blue-800">
                      Phase 2 (Population Enumeration)
                    </span>
                    <p className="text-sm font-extrabold text-slate-900 mt-1">
                      {selectedStateData.phase2_population_enumeration_window}
                    </p>
                    <p className="text-[11px] text-slate-600 mt-2">
                      National Synchronous Enumeration
                    </p>
                  </div>
                </div>

                {/* District Breakdown Table */}
                {selectedStateData.districts && selectedStateData.districts.length > 0 && (
                  <div>
                    <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-3">
                      District Operations Schedule
                    </h4>
                    <div className="border border-slate-200 rounded-2xl overflow-hidden">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 text-[10px] uppercase font-bold">
                          <tr>
                            <th className="py-2.5 px-4">District</th>
                            <th className="py-2.5 px-4">Self-Enum Window</th>
                            <th className="py-2.5 px-4">Field Verification</th>
                            <th className="py-2.5 px-4">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-slate-700">
                          {selectedStateData.districts.map((d, idx) => (
                            <tr key={idx} className="hover:bg-slate-50">
                              <td className="py-3 px-4 font-bold text-slate-900">{d.district_name}</td>
                              <td className="py-3 px-4 text-emerald-700 font-medium">{d.self_enumeration_open} to {d.self_enumeration_close}</td>
                              <td className="py-3 px-4">{d.phase1_start} to {d.phase1_end}</td>
                              <td className="py-3 px-4">
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                                  {d.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* State Contact Info */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-slate-400 font-medium">Nodal Authority:</span>
                    <p className="font-bold text-slate-800">{selectedStateData.nodal_officer}</p>
                  </div>
                  <div className="flex items-center gap-2 font-bold text-emerald-700">
                    <PhoneCall className="w-4 h-4" />
                    <span>{selectedStateData.helpline}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-12 text-center text-slate-400 border border-slate-200">
                Select a state to view its complete schedule.
              </div>
            )}
          </div>
        </div>
      </div>
    </CitizenLayout>
  );
}
