import { Client, Databases } from "node-appwrite";
import { config } from "dotenv";

// Load from env for security
config();

const client = new Client();

const databases = new Databases(client);

client
  .setEndpoint(
    process.env.APPWRITE_ENDPOINT || "https://nyc.cloud.appwrite.io/v1"
  )
  .setProject(process.env.APPWRITE_PROJECT_ID || "68aaba150020335ae60a")
  .setKey(
    process.env.APPWRITE_API_KEY ||
      "standard_ad7e4889402dcec115b7c773f83f62890075496f192efc726f7f92f4c4ab663f93e092ae8e023955c04f1ee0db1e3e09dca3b0f82694fdf639af02b06197a93ad81bb47e15a4b657fb11b88bf997d2d418423856e8f2d14a97e2d83fe2ac02e2de7d1f7fb35d6bd1e52b90e11b767ed033f3461b091e3755bea9fd6635eed4e3"
  );

export { databases };
