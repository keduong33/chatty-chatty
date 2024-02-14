# Backend

`This README.md is a consolidation of notes I wrote to explain my trials & errors and how I reached the decisions. Since those knowledge could be wrong, this README will provide me explanations why I did it so I can learn form it`

## transcribeSpeech.mts

* Notes
  * I tried using this space [https://huggingface.co/spaces/openai/whisper](https://huggingface.co/spaces/openai/whisper) but the documentation was weird since I followed every steps but it kept failing without reason & very slow also
  * I also tried HF Inference Endpoints (underneath is the implementation)  Why i did not use it:
    * it is slow
    * it is auto translating to English before transcribing? --> cannot find a way to specify the task
  * I ended up with [`abidlabs space`](https://huggingface.co/spaces/abidlabs/whisper) that duplicated the openai space but
    * has different endpoint & input payload and it WORKS
    * it is much faster than the HF Inference also
* Hugging Face Inference Endpoints
  * Documentation: [Link]()
  * ```typescript
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
    ```
