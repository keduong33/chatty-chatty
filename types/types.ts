export enum SupportedLanguages {
  English = "English",
  German = "German",
  Vietnamese = "Vietnamese",
}

export enum Topic {
  Sport = "Sport",
  Art = "Art",
  Gaming = "Gaming",
  Anything = "Anything",
}

export type ConversationInputs = {
  userText: string;
  targetLanguage: SupportedLanguages;
  knownLanguage: SupportedLanguages;
  userHistory: string[];
  aiHistory: string[];
  topic?: Topic;
  startMessage?: boolean;
};

export type ConversationHistoryResponse = {
  userHistory: string[];
  aiHistory: string[];
};
