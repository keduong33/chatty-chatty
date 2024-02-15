import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ConversationHistoryResponse } from "../../types/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const convertConversationResponse = (
  conversation: ConversationHistoryResponse
) => {
  const userText = conversation.userHistory;
  const responses = conversation.aiHistory;

  return {
    userHistory: userText ?? [],
    aiHistory: responses ?? [],
  };
};
