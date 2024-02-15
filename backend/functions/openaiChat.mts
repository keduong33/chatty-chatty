import type { Config } from "@netlify/functions";
import OpenAI, { AuthenticationError, RateLimitError } from "openai";
import {
  ChatCompletionMessageParam,
  ChatCompletionSystemMessageParam,
} from "openai/resources/index.mjs";
import {
  ConversationHistoryResponse,
  ConversationInputs,
  SupportedLanguages,
} from "../../types/types";

const openAI = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const mergeHistories = (userHistory: string[], aiHistory: string[]) => {
  const mergedHistory: OpenAI.Chat.Completions.ChatCompletionMessageParam[] =
    [];
  userHistory.forEach((userText, index) => {
    mergedHistory.push({ role: "user", content: userText });
    if (aiHistory[index])
      mergedHistory.push({ role: "assistant", content: aiHistory[index] });
  });
  return mergedHistory;
};

export default async (req: Request) => {
  const {
    userText,
    knownLanguage,
    targetLanguage,
    userHistory,
    aiHistory,
  }: ConversationInputs = await req.json();

  const newUserHistory = userHistory.concat([userText]);

  const mergedHistory = mergeHistories(newUserHistory, aiHistory);

  console.log(mergedHistory);

  if (
    !(knownLanguage in SupportedLanguages) ||
    !(targetLanguage in SupportedLanguages)
  )
    return new Response("Language is not supported", { status: 501 });

  try {
    const messages: ChatCompletionMessageParam[] = [
      {
        role: "system",
        content: `Reply friendly in ${targetLanguage}`,
      } as ChatCompletionSystemMessageParam,
      ...mergedHistory,
    ];

    const completion = await openAI.chat.completions.create({
      messages: messages,
      model: "gpt-3.5-turbo",
      temperature: 0.8,
      max_tokens: 90,
      top_p: 1,
      frequency_penalty: 0.66,
      presence_penalty: 0.43,
    });
    const aiResponse = completion.choices[0].message.content ?? "";
    const newAiHistory = aiHistory.concat([aiResponse]);
    const newChatHistory: ConversationHistoryResponse = {
      userHistory: newUserHistory,
      aiHistory: newAiHistory,
    };
    return new Response(JSON.stringify(newChatHistory));
  } catch (e) {
    console.log("Failed to send message to OpenAI", e);
    if (e instanceof AuthenticationError) {
      return new Response("Authentication Error", { status: 401 });
    } else if (e instanceof RateLimitError) {
      return new Response(e.message, { status: 429 });
    } else {
      return new Response("Failed to send message to Chatty Chatty", {
        status: 500,
      });
    }
  }
};

export const config: Config = {
  path: "/openai-chat",
};
