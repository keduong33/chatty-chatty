import { client } from "@gradio/client";
import type { Config } from "@netlify/functions";
import { createRequire } from "node:module";
import { ConversationData, SupportedLanguages } from "../../types/types";

type QwenResponse = {
  type: string;
  time: string;
  data: QwenChatData;
  endpoint: string;
  fn_index: number;
};

type QwenChatData = [
  string, //get cleared when response is there
  ConversationData["ChatHistory"],
  string
];

export default async (req: Request) => {
  const { UserText, KnownLanguage, TargetLanguage }: ConversationData =
    await req.json();

  //Temporary fix for the @gradio/client issue
  //https://github.com/gradio-app/gradio/issues/7103
  const require = createRequire(import.meta.url);
  global.EventSource = require("eventsource");
  //remove eventsource after upgrade @gradio/client

  if (
    !(KnownLanguage in SupportedLanguages) ||
    !(TargetLanguage in SupportedLanguages)
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
      UserText,
      [],
      `You only speak ${TargetLanguage}.`,
    ])) as QwenResponse;

    const [, chatHistory] = response.data;

    return new Response(JSON.stringify(chatHistory));
  } catch (e) {
    console.error("Failed to send message:", e);
    return new Response("Failed to send message", { status: 500 });
  }
};

export const config: Config = {
  path: "/chat",
};
