import { HfInference } from "@huggingface/inference";
import type { Config, Context } from "@netlify/functions";
import { AxiosError } from "axios";
import { NewConversationInputs, SupportedLanguages } from "../../types/types";

export default async (req: Request, context: Context) => {
  const { KnownLanguage, TargetLanguage }: NewConversationInputs =
    await req.json();

  const huggingFaceApiKey = process.env.HUGGINGFACE_API_KEY;

  if (
    !(KnownLanguage in SupportedLanguages) ||
    !(TargetLanguage in SupportedLanguages)
  )
    return new Response("Language is not supported", { status: 501 });

  if (!huggingFaceApiKey) {
    console.error("No Hugging face api key");
    return new Response("Cannot connect to our chatty robot", { status: 500 });
  }

  try {
    const hf = new HfInference(huggingFaceApiKey);
    const answer = await hf.conversational({
      model: "facebook/blenderbot-400M-distill",
      inputs: {
        past_user_inputs: ["Which movie is the best ?"],
        generated_responses: ["It is Die Hard for sure."],
        text: "Can you explain why ?",
      },
    });

    console.log(answer);
  } catch (e) {
    const error = e as AxiosError;
    console.error("Failed in new conversation: ", error.message);
  }

  return new Response("Hello, world!");
};

export const config: Config = {
  path: "/new-conversation",
};
