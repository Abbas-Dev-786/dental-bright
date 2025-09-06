import { DB_ID } from "constants";
import { databases } from "./appwrite";
import { APPOINTMENTS_COLLECTION } from "constants";
import { Query } from "appwrite";
import { format } from "date-fns/format";

export const getBookedAppointmentsOfTheDay = async ({ queryKey }) => {
  const { date, dentistId } = queryKey[1];

  const formattedDate = format(date, "yyyy-MM-dd");
  const startOfDay = new Date(`${formattedDate}T00:00:00.000Z`).toISOString();
  const endOfDay = new Date(`${formattedDate}T23:59:59.999Z`).toISOString();

  const data = await databases.listDocuments(DB_ID, APPOINTMENTS_COLLECTION, [
    Query.greaterThanEqual("start_date", startOfDay),
    Query.lessThanEqual("end_date", endOfDay),
    Query.equal("dentistId", dentistId),
    Query.select(["*", "users.*"]),
  ]);

  return data;
};

export const getAllAppointments = async ({ queryKey }) => {
  const { dentistId } = queryKey[1];

  const data = await databases.listDocuments(DB_ID, APPOINTMENTS_COLLECTION, [
    Query.equal("dentistId", dentistId),
    Query.select(["*", "users.*"]),
  ]);

  return data;
};
