import { Client, Databases } from "node-appwrite";
import { config } from "dotenv";

// Load from env for security
config();

const client = new Client();

const databases = new Databases(client);

client
  .setEndpoint(process.env.APPWRITE_ENDPOINT || "")
  .setProject(process.env.APPWRITE_PROJECT_ID || "")
  .setKey(process.env.APPWRITE_API_KEY || "");

export { databases };
