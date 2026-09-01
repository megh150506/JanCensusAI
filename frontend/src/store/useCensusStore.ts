import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface SupportedLanguage {
  code: string;
  name: string;
  nativeName: string;
}

export const SUPPORTED_LANGUAGES: SupportedLanguage[] = [
  { code: "en", name: "English", nativeName: "English" },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी" },
  { code: "mr", name: "Marathi", nativeName: "मराठी" },
  { code: "ta", name: "Tamil", nativeName: "தமிழ்" },
  { code: "bn", name: "Bengali", nativeName: "বাংলা" },
  { code: "te", name: "Telugu", nativeName: "తెలుగు" },
  { code: "gu", name: "Gujarati", nativeName: "ગુજરાતી" },
  { code: "kn", name: "Kannada", nativeName: "ಕನ್ನಡ" },
];

export const normalizeLanguageCode = (lang: string): string => {
  if (!lang) return "en";
  const lower = lang.trim().toLowerCase();
  const matched = SUPPORTED_LANGUAGES.find(
    (l) => l.code.toLowerCase() === lower || l.name.toLowerCase() === lower || l.nativeName.toLowerCase() === lower
  );
  return matched ? matched.code : "en";
};

export const getLanguageName = (langCode: string): string => {
  const code = normalizeLanguageCode(langCode);
  const matched = SUPPORTED_LANGUAGES.find((l) => l.code === code);
  return matched ? matched.name : "English";
};

export interface ChatMessage {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: string;
  sources?: string[];
  suggestedFollowups?: string[];
}

interface CensusState {
  currentLanguage: string;
  selectedState: string;
  isAiDrawerOpen: boolean;
  isNotificationsOpen: boolean;
  chatMessages: ChatMessage[];
  unreadNotificationCount: number;
  setLanguage: (lang: string) => void;
  setSelectedState: (state: string) => void;
  openAiDrawer: (initialQuery?: string) => void;
  closeAiDrawer: () => void;
  toggleNotifications: () => void;
  addChatMessage: (msg: Omit<ChatMessage, "id" | "timestamp">) => void;
  clearChat: () => void;
}

export const useCensusStore = create<CensusState>()(
  persist(
    (set, get) => ({
      currentLanguage: "en",
      selectedState: "Maharashtra",
      isAiDrawerOpen: false,
      isNotificationsOpen: false,
      unreadNotificationCount: 3,
      chatMessages: [
        {
          id: "welcome_msg",
          sender: "bot",
          text: "Namaste! 🙏 I am **JanCensus AI Mitra**, your official guide for the Census of India 2027. How can I assist you today? You can ask about Phase 1 vs Phase 2, how to self-enumerate, or data privacy under the Census Act 1948.",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          sources: ["Census of India 2027 Portal", "Census Act 1948, Section 15"],
          suggestedFollowups: [
            "What is the difference between Phase 1 and Phase 2?",
            "Is my personal information confidential under law?",
            "How do I complete Digital Self-Enumeration?",
          ],
        },
      ],

      setLanguage: (lang: string) => {
        const normalized = normalizeLanguageCode(lang);
        set({ currentLanguage: normalized });
      },
      setSelectedState: (state: string) => set({ selectedState: state }),

      openAiDrawer: (initialQuery?: string) => {
        set({ isAiDrawerOpen: true });
        if (initialQuery) {
          // You can auto-trigger or queue query
        }
      },

      closeAiDrawer: () => set({ isAiDrawerOpen: false }),
      toggleNotifications: () => set((state) => ({ isNotificationsOpen: !state.isNotificationsOpen })),

      addChatMessage: (msg) =>
        set((state) => ({
          chatMessages: [
            ...state.chatMessages,
            {
              ...msg,
              id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
              timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            },
          ],
        })),

      clearChat: () =>
        set({
          chatMessages: [
            {
              id: "welcome_msg_reset",
              sender: "bot",
              text: "Chat cleared! How can I assist you with Census 2027?",
              timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            },
          ],
        }),
    }),
    {
      name: "census_language_store",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ currentLanguage: state.currentLanguage, selectedState: state.selectedState }),
    }
  )
);

