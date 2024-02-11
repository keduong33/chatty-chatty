export enum SupportedLanguages {
  English = "English",
  German = "German",
  Vietnamese = "Vietnamese",
}

export type NewConversationInputs = {
  TargetLanguage: SupportedLanguages;
  KnownLanguage: SupportedLanguages;
};
