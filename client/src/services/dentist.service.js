import { DB_ID } from "constants";
import { databases } from "./appwrite";
import { DENTISTS_COLLECTION } from "constants";

export const getAllDentists = async () => {
  const docs = await databases.listDocuments(DB_ID, DENTISTS_COLLECTION, []);

  return docs;
};

export const getSingleDentists = async ({ queryKey }) => {
  const id = queryKey[1];
  const docs = await databases.getDocument(DB_ID, DENTISTS_COLLECTION, id);

  return docs;
};
