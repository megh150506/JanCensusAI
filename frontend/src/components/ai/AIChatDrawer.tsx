"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  X,
  Send,
  Bot,
  User,
  Sparkles,
  RefreshCw,
  HelpCircle,
  ShieldCheck,
  ExternalLink,
  ChevronRight,
  Loader2
} from "lucide-react";
import { useCensusStore } from "@/store/useCensusStore";
import { api } from "@/lib/api";
import { getTranslation } from "@/lib/translations";

export const AIChatDrawer: React.FC = () => {
  const {
    isAiDrawerOpen,
    closeAiDrawer,
    chatMessages,
    addChatMessage,
    clearChat,
    currentLanguage
  } = useCensusStore();

  const [inputQuery, setInputQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isAiDrawerOpen) {
      scrollToBottom();
    }
  }, [chatMessages, isAiDrawerOpen]);

  const handleSendMessage = async (queryText?: string) => {
    const textToSend = (queryText || inputQuery).trim();
    if (!textToSend || isLoading) return;

    setInputQuery("");
    addChatMessage({
      sender: "user",
      text: textToSend,
    });

    setIsLoading(true);

    try {
      const response = await api.chatWithAI({
        query: textToSend,
        language: currentLanguage,
      });

      addChatMessage({
        sender: "bot",
        text: response.answer,
        sources: response.sources,
        suggestedFollowups: response.suggested_followups,
      });
    } catch (err: any) {
      console.error("AI chat error:", err);
      addChatMessage({
        sender: "bot",
        text: (
          "⚠️ **Connection Notice:** Unable to reach the Census AI service. Please ensure the backend is running.\n\n" +
          "**Standard Guideline:** Census of India 2027 operates in two phases (House Listing & Housing Census, followed by Population Enumeration). All data is strictly confidential under Section 15 of Census Act 1948."
        ),
        sources: ["Census Act 1948, Section 15"],
        suggestedFollowups: [
          "What is the difference between Phase 1 and Phase 2?",
          "How do I complete Digital Self-Enumeration?"
        ]
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAiDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={closeAiDrawer}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl border-l border-slate-200 flex flex-col">
          {/* Drawer Header */}
          <div className="p-4 bg-gradient-to-r from-emerald-700 to-green-700 text-white flex items-center justify-between shadow-md">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center text-white backdrop-blur-md">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-sm">{getTranslation(currentLanguage, "aiAssistantTitle")}</h3>
                  <span className="text-[10px] font-bold bg-amber-400 text-slate-900 px-1.5 py-0.2 rounded-full uppercase">
                    2.5 Flash
                  </span>
                </div>
                <p className="text-[11px] text-emerald-100 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-ping inline-block" />
                  {getTranslation(currentLanguage, "aiAssistantSub")}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={clearChat}
                title="Reset Chat"
                className="p-1.5 rounded-lg text-emerald-100 hover:text-white hover:bg-white/10 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <button
                onClick={closeAiDrawer}
                className="p-1.5 rounded-lg text-emerald-100 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Legal Safety Ribbon */}
          <div className="px-4 py-2 bg-emerald-50 border-b border-emerald-100 text-[11px] text-emerald-800 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{getTranslation(currentLanguage, "aiLegalRibbon")}</span>
          </div>

          {/* Chat Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
            {chatMessages.map((msg) => {
              const isBot = msg.sender === "bot";
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isBot ? "items-start" : "items-end"}`}
                >
                  <div className="flex items-start gap-2.5 max-w-[88%]">
                    {isBot && (
                      <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm text-xs font-bold">
                        🇮🇳
                      </div>
                    )}
                    <div
                      className={`p-3.5 rounded-2xl text-xs leading-relaxed ${
                        isBot
                          ? "bg-white text-slate-800 border border-slate-200/80 shadow-sm"
                          : "bg-emerald-600 text-white shadow-sm"
                      }`}
                    >
                      <div className="whitespace-pre-line font-normal">{msg.text}</div>

                      {/* Source Citations */}
                      {isBot && msg.sources && msg.sources.length > 0 && (
                        <div className="mt-2.5 pt-2 border-t border-slate-100">
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                            Authoritative Sources:
                          </p>
                          <ul className="space-y-0.5">
                            {msg.sources.map((src, idx) => (
                              <li
                                key={idx}
                                className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded flex items-center gap-1 font-medium"
                              >
                                <ShieldCheck className="w-2.5 h-2.5" />
                                <span className="truncate">{src}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Suggested Followups */}
                      {isBot && msg.suggestedFollowups && msg.suggestedFollowups.length > 0 && (
                        <div className="mt-3 pt-2 border-t border-slate-100">
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                            Suggested Questions:
                          </p>
                          <div className="space-y-1">
                            {msg.suggestedFollowups.map((q, idx) => (
                              <button
                                key={idx}
                                onClick={() => handleSendMessage(q)}
                                className="w-full text-left text-[11px] text-emerald-800 bg-white hover:bg-emerald-50 p-2 rounded-lg border border-emerald-200 transition-colors flex items-center justify-between group"
                              >
                                <span className="line-clamp-1">{q}</span>
                                <ChevronRight className="w-3 h-3 text-emerald-500 group-hover:translate-x-0.5 transition-transform" />
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      <span
                        className={`text-[9px] mt-1.5 block text-right ${
                          isBot ? "text-slate-400" : "text-emerald-100"
                        }`}
                      >
                        {msg.timestamp}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}

            {isLoading && (
              <div className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm text-xs">
                  🇮🇳
                </div>
                <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-2 text-xs text-slate-500">
                  <Loader2 className="w-4 h-4 animate-spin text-emerald-600" />
                  <span>JanCensus AI is consulting official records...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Bar */}
          <div className="px-4 py-2 bg-slate-100/70 border-t border-slate-200 flex items-center gap-1.5 overflow-x-auto text-[11px] no-scrollbar">
            <span className="font-semibold text-slate-500 text-[10px] uppercase shrink-0">
              {getTranslation(currentLanguage, "aiQuickTitle")}
            </span>
            <button
              onClick={() => handleSendMessage("What is Phase 1 vs Phase 2?")}
              className="bg-white hover:bg-emerald-50 border border-slate-200 text-slate-700 px-2.5 py-1 rounded-full whitespace-nowrap transition-colors"
            >
              Phase 1 vs 2
            </button>
            <button
              onClick={() => handleSendMessage("Is my data confidential under Census Act?")}
              className="bg-white hover:bg-emerald-50 border border-slate-200 text-slate-700 px-2.5 py-1 rounded-full whitespace-nowrap transition-colors"
            >
              Data Privacy
            </button>
            <button
              onClick={() => handleSendMessage("How does Self-Enumeration QR work?")}
              className="bg-white hover:bg-emerald-50 border border-slate-200 text-slate-700 px-2.5 py-1 rounded-full whitespace-nowrap transition-colors"
            >
              Self-Enum QR
            </button>
          </div>

          {/* Input Box Footer */}
          <div className="p-4 bg-white border-t border-slate-200">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                placeholder={getTranslation(currentLanguage, "aiPlaceholder")}
                className="flex-1 text-xs bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={!inputQuery.trim() || isLoading}
                className="w-9 h-9 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white flex items-center justify-center transition-all shadow-md shadow-emerald-600/20 active:scale-95 shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

