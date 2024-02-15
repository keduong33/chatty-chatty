declare namespace NodeJS {
  export interface ProcessEnv {
    HUGGINGFACE_API_KEY: `hf_${string}` | undefined;
    OPENAI_API_KEY: `sk_${string}` | undefined;
  }
}
