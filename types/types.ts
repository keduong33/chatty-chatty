export enum SupportedLanguages {
  English = "English",
  German = "German",
  Vietnamese = "Vietnamese",
}

export type ConversationInputs = {
  userText: string;
  targetLanguage: SupportedLanguages;
  knownLanguage: SupportedLanguages;
  userHistory: string[];
  aiHistory: string[];
};
