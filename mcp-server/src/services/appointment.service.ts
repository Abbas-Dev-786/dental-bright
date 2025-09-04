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
      Query.equal("status", "scheduled"),
    ]
  );

  return sameDayAppointments;
};

export const updateAppointment = async (
  appointmentId: string,
  newStart: dayjs.Dayjs,
  newEnd: dayjs.Dayjs
) => {
  const updatedAppointment = await databases.updateDocument(
    DB_ID!,
    APPOINTMENTS_COLLECTION!,
    appointmentId,
    {
      start_date: newStart.toISOString(),
      end_date: newEnd.toISOString(),
      status: "scheduled",
    }
  );

  return updatedAppointment;
};

export const cancelAppointment = async (appointmentId: string) => {
  const canceledAppointment = await databases.updateDocument(
    DB_ID!,
    APPOINTMENTS_COLLECTION!,
    appointmentId,
    {
      status: "canceled",
    }
  );

  return canceledAppointment;
};
