import { ID, Query } from "node-appwrite";
import { databases } from "../config/appwrite.config";
import { DB_ID, USERS_COLLECTION } from "../config/constants";

export const getPatientByNameAndPhone = async (name: string, phone: string) => {
  const query = await databases.listDocuments(DB_ID!, USERS_COLLECTION!, [
    Query.equal("full_name", name),
    Query.equal("phone", phone),
  ]);

  return query;
};

export const createPatient = async (name: string, phone: string) => {
  const patient = await databases.createDocument(
    DB_ID!,
    USERS_COLLECTION!,
    ID.unique(),
    {
      full_name: name,
      phone: phone,
    }
  );

  return patient;
};
