import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { SupportedLanguages } from "../../types/types";

export type ConversationState = {
  targetLanguage: SupportedLanguages;
  knownLanguage: SupportedLanguages;
  userHistory: string[];
  aiHistory: string[];
};

type Actions = {
  setUserHistory: (inputs: string[]) => void;
  setAiHistory: (responses: string[]) => void;
  setKnownLanguage: (language: SupportedLanguages) => void;
  setTargetLanguage: (language: SupportedLanguages) => void;
};

export const initialConversation: ConversationState = {
  userHistory: [],
  aiHistory: [],
  knownLanguage: SupportedLanguages.English,
  targetLanguage: SupportedLanguages.English,
};

export const useConversation = create<ConversationState & Actions>()(
  persist(
    (set) => ({
      ...initialConversation,
      setAiHistory(responses) {
        set({ aiHistory: responses });
      },
      setUserHistory(inputs) {
        set({ userHistory: inputs });
      },

      setKnownLanguage(language) {
        set({ knownLanguage: language });
      },
      setTargetLanguage(language) {
        set({ targetLanguage: language });
      },
    }),
    { name: "current-convo", storage: createJSONStorage(() => sessionStorage) }
  )
);
