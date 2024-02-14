export enum SupportedLanguages {
  English = "English",
  German = "German",
  Vietnamese = "Vietnamese",
}

export type ConversationData = {
  UserText: string;
  TargetLanguage: SupportedLanguages;
  KnownLanguage: SupportedLanguages;
  ChatHistory: [userText: string, botText: string][] | undefined;
};
