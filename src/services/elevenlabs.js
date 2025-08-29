import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";

export const client = new ElevenLabsClient({
  apiKey: import.meta.env.VITE_ELEVENLABS_API_KEY,
});
