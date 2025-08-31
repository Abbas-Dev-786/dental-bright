import { ID, Permission, Query, Role } from "appwrite";
import { USERS_COLLECTION } from "constants";
import { DB_ID } from "constants";
import { databases } from "./appwrite";
import { APPOINTMENTS_COLLECTION } from "constants";

export const getUser = async ({ name, phone }) => {
  const query = await databases.listDocuments(DB_ID, USERS_COLLECTION, [
    Query.equal("full_name", name),
    Query.equal("phone", phone),
  ]);

  return query;
};

export const createUser = async ({ name, phone, email }) => {
  const user = {
    full_name: name,
    phone,
    email,
  };

  const response = await databases.createDocument(
    DB_ID,
    USERS_COLLECTION,
    ID.unique(),
    user,
    [Permission.write(Role.any())]
  );
  return response;
};

export const createBooking = async ({
  name,
  phone,
  email,
  dentistId,
  startDate,
  endDate,
  notes,
}) => {
  let user = await getUser({ name, phone });

  if (user.total === 0) {
    user = await createUser({ name, phone, email });
  } else {
    user = user.documents[0];
  }

  const appointment = await databases.createDocument(
    DB_ID,
    APPOINTMENTS_COLLECTION,
    ID.unique(),
    {
      users: user.$id,
      dentists: dentistId,
      dentistId: dentistId,
      start_date: startDate,
      end_date: endDate,
      notes,
      status: "scheduled",
      isBookedByCall: false,
    },
    [Permission.write(Role.any())]
  );

  return appointment;
};
