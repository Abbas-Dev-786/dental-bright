import { ID, Query } from "node-appwrite";
import { databases } from "../config/appwrite.config";
import { APPOINTMENTS_COLLECTION, DB_ID } from "../config/constants";
import dayjs from "dayjs";

export const createAppointment = async (
  patientId: string,
  dentistId: string,
  startDate: string,
  endDate: string,
  notes?: string
) => {
  const appointment = await databases.createDocument(
    DB_ID!,
    APPOINTMENTS_COLLECTION!,
    ID.unique(),
    {
      users: patientId,
      dentists: dentistId,
      dentistId: dentistId,
      start_date: startDate,
      end_date: endDate,
      notes,
      status: "scheduled",
      isBookedByCall: true,
    }
  );

  return appointment;
};

export const getAppointmentsOfDay = async (
  newStart: dayjs.Dayjs,
  newEnd: dayjs.Dayjs,
  dentistId: string
) => {
  const sameDayAppointments = await databases.listDocuments(
    DB_ID!,
    APPOINTMENTS_COLLECTION!,
    [
      Query.greaterThan("end_date", newStart.toISOString()), // end after newStart
      Query.lessThan("start_date", newEnd.toISOString()), // start before newEnd
      Query.equal("status", "scheduled"),
      Query.equal("dentistId", dentistId),
    ]
  );

  return sameDayAppointments;
};
