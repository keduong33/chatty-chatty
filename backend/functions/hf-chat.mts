import { client } from "@gradio/client";
import type { Config } from "@netlify/functions";
import { ConversationInputs, SupportedLanguages } from "../../types/types";

type QwenResponse = {
  type: string;
  time: string;
  data: QwenChatData;
  endpoint: string;
  fn_index: number;
};

export type QwenChatData = [
  string, //get cleared when response is there
  [userHistory: string, aiHistory: string][],
  string
];

const mergeHistories = (userHistory: string[], aiHistory: string[]) => {
  return userHistory.map((chat, index) => [chat, aiHistory[index]]);
};

export default async (req: Request) => {
  const {
    userText,
    knownLanguage,
    targetLanguage,
    userHistory,
    aiHistory,
  }: ConversationInputs = await req.json();

  const mergedHistory = mergeHistories(userHistory, aiHistory);

  if (
    !(knownLanguage in SupportedLanguages) ||
    !(targetLanguage in SupportedLanguages)
  )
    return new Response("Language is not supported", { status: 501 });

  try {
    const app = await client(
      "https://qwen-qwen-1-8b-chat-demo.hf.space/--replicas/tf6yk/",
      {
        hf_token: process.env.HUGGINGFACE_API_KEY,
      }
    );
    const response = (await app.predict("/model_chat", [
      userText,
      mergedHistory,
      `You only speak ${targetLanguage}.`,
    ])) as QwenResponse;

    const [, chatHistory] = response.data;

    return new Response(JSON.stringify(chatHistory));
  } catch (e) {
    console.error("Failed to send message:", e);
    return new Response("Failed to send message", { status: 500 });
  }
};

export const config: Config = {
  path: "/hf-chat",
};
