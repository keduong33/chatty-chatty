import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { QwenChatData } from "../../backend/functions/chat.mts";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const convertConversationResponse = (
  conversation: QwenChatData["1"]
) => {
  const userText = conversation?.map((chat) => chat[0]);
  const responses = conversation?.map((chat) => chat[1]);

  return {
    userHistory: userText ?? [],
    aiHistory: responses ?? [],
  };
};
