import { Query } from "node-appwrite";
import { databases } from "../config/appwrite.config";
import { DB_ID, DENTISTS_COLLECTION } from "../config/constants";

export const getDentistList = async () => {
  const docs = await databases.listDocuments(DB_ID, DENTISTS_COLLECTION, []);

  return docs;
};

export const searchDentist = async (name: string) => {
  const docs = await databases.listDocuments(DB_ID, DENTISTS_COLLECTION, [
    Query.search("name", name),
  ]);

  return docs;
};
