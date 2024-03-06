import { Config } from "@netlify/functions";
import axios, { AxiosError } from "axios";

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
  const speech = base64ToArrayBuffer(await req.text());

  try {
    const response = await axios(
      "https://api-inference.huggingface.co/models/openai/whisper-small",
      {
        method: "POST",
        headers: { Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}` },
        data: speech,
      }
    );

    const text = response.data["text"].trim();

    return new Response(text);
  } catch (e) {
    const error = e as AxiosError;
    console.log("Failed to transcribe:", error.message);
    return new Response(`${error.message}`, {
      status: parseInt(error.code ?? "500"),
    });
  }
};

export const config: Config = {
  path: "/transcribe-speech",
};
