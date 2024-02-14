import { Config } from "@netlify/functions";
import axios, { AxiosError } from "axios";

type abidlabsWhisperResponse = {
  data: [
    string // represents text string of the Textbox component
  ];
  duration: number; // number of seconds to run function call
};

export default async (req: Request) => {
  const speech = await req.text();
  try {
    const response = await axios<abidlabsWhisperResponse>(
      "https://abidlabs-whisper.hf.space/run/predict",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: JSON.stringify({
          data: [
            {
              name: "audio.wav",
              data: speech,
            },
          ],
        }),
      }
    );

    const text = response.data["data"].join(" ").trim();

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
