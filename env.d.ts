declare namespace NodeJS {
  export interface ProcessEnv {
    HUGGINGFACE_API_KEY: `hf_${string}` | undefined;
  }
}
