import { automaticSpeechRecognition } from "@huggingface/inference";
import { Config } from "@netlify/functions";
import { AxiosError } from "axios";

const transcribeModel = "openai/whisper-tiny";

function base64ToArrayBuffer(base64: string): ArrayBuffer {
  const binaryString = atob(base64);
  const length = binaryString.length;
  const bytes = new Uint8Array(length);
  for (let i = 0; i < length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
}

export default async (req: Request) => {
  const speech = await req.text();
  const data = base64ToArrayBuffer(speech);

  try {
    const response = await automaticSpeechRecognition({
      accessToken: process.env.HUGGINGFACE_API_KEY,
      model: transcribeModel,
      data: data,
    });

    console.log(response["text"]);
    return new Response(response["text"]);
  } catch (e) {
    const error = e as AxiosError;
    console.error("Failed to transcribe", e);
    if (error.code === "503") {
      return new Response(`Failed to transcribe: ${error.message}`, {
        status: 503,
      });
    } else {
      return new Response(`Failed to transcribe: ${error.message}`, {
        status: 500,
      });
    }
  }
};

export const config: Config = {
  path: "/transcribe-speech",
};
