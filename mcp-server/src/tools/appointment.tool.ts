import { z } from "zod";
import {
  ServerNotification,
  ServerRequest,
} from "@modelcontextprotocol/sdk/types.js";
import { RequestHandlerExtra } from "@modelcontextprotocol/sdk/shared/protocol.js";
import { config } from "dotenv";
import dayjs from "dayjs";
import {
  createPatient,
  getPatientByNameAndPhone,
} from "../services/user.service";
import {
  createAppointment,
  getAppointmentsOfDay,
} from "../services/appointment.service";
import { searchDentist } from "../services/dentist.service";

config();

type ToolResult = {
  content: Array<{
    type: "text";
    text: string;
  }>;
  isError?: boolean;
  _meta?: Record<string, unknown>;
};

// Define proper types for the tool structure
interface AppointmentToolDefinition {
  name: string;
  description: string;
  inputSchema: Record<string, z.ZodType>;
  callback: (
    params: Record<string, any>,
    extra: RequestHandlerExtra<ServerRequest, ServerNotification>
  ) => Promise<ToolResult>;
}

// suggestAlternativeSlots
// cancelAppointment
// rescheduleAppointment

export const appointmentTools: AppointmentToolDefinition[] = [
  {
    name: "createAppointment",
    description: "Book an appointment for a patient",
    inputSchema: {
      dentistName: z.string().describe("The name of the doctor"),
      patientName: z.string().describe("The name of the patient"),
      patientPhone: z.string().describe("The phone number of the patient"),
      date: z
        .string()
        .describe("The date of the appointment. It should be a valid date."),
      time: z
        .string()
        .describe(
          "The time of the appointment. It should be a valid time in HH:MM format."
        ),
      notes: z
        .string()
        .optional()
        .describe("Additional notes for the appointment"),
    },
    async callback(params, extra) {
      const { patientName, patientPhone, date, notes, time, dentistName } =
        params;

      try {
        // 1. Find the patient by fullName + phone
        const patientQuery = await getPatientByNameAndPhone(
          patientName,
          patientPhone
        );

        let patient;

        if (patientQuery.total === 0) {
          patient = await createPatient(patientName, patientPhone);
        } else {
          patient = patientQuery.documents[0];
        }

        // inside createAppointment callback, before creating appointment
        const newStart = dayjs(`${date} ${time}`, "YYYY-MM-DD HH:mm");
        const newEnd = newStart.add(30, "minutes");

        const dentist = await searchDentist(dentistName);

        if (dentist.documents.length === 0) {
          return {
            content: [
              {
                type: "text" as const,
                text: `No dentist found with the name ${dentistName}.`,
              },
            ],
          };
        }

        // 1. Query appointments on that day
        const sameDayAppointments = await getAppointmentsOfDay(
          newStart,
          newEnd,
          dentist.documents[0].$id
        );

        // 2. If any overlap found → block
        if (sameDayAppointments.total > 0) {
          return {
            content: [
              {
                type: "text",
                text: `⚠️ Appointment conflict: Another appointment already exists between ${newStart.format(
                  "HH:mm"
                )} and ${newEnd.format("HH:mm")}.`,
              },
            ],
            isError: true,
          };
        }

        const appointment = await createAppointment(
          patient.$id,
          dentist.documents[0].$id,
          newStart.toISOString(),
          newEnd.toISOString(),
          notes ?? ""
        );

        return {
          content: [
            {
              type: "text" as const,
              text: JSON.stringify(appointment, null, 2),
            },
          ],
        };
      } catch (error) {
        return {
          content: [
            {
              type: "text" as const,
              text: `Error fetching dentists: ${
                error instanceof Error ? error.message : "Unknown error"
              }`,
            },
          ],
          isError: true,
        };
      }
    },
  },
  {
    name: "rescheduleAppointment",
    description: "Reschedule an existing appointment",
    inputSchema: {
      appointmentId: z
        .string()
        .describe("The ID of the appointment to reschedule"),
      newDate: z
        .string()
        .describe(
          "The new date of the appointment. It should be a valid date."
        ),
      newTime: z
        .string()
        .describe(
          "The new time of the appointment. It should be a valid time in HH:MM format."
        ),
      notes: z
        .string()
        .optional()
        .describe("Additional notes for the appointment"),
    },
    async callback(params, extra) {
      const { appointmentId, newDate, newTime, notes } = params;

      try {
        // 1. Find the existing appointment
        const appointmentQuery = await databases.getDocument(
          DB_ID!,
          APPOINTMENTS_COLLECTION!,
          appointmentId
        );

        if (!appointmentQuery) {
          return {
            content: [
              {
                type: "text" as const,
                text: `No appointment found with ID ${appointmentId}.`,
              },
            ],
            isError: true,
          };
        }

        // 2. Check for conflicts with existing appointments
        const newStart = dayjs(`${newDate} ${newTime}`, "YYYY-MM-DD HH:mm");
        const newEnd = newStart.add(30, "minutes");

        const sameDayAppointments = await getAppointmentsOfDay(
          newStart,
          newEnd,
          appointmentQuery.dentistId
        );

        if (sameDayAppointments.total > 0) {
          return {
            content: [
              {
                type: "text",
                text: `⚠️ Appointment conflict: Another appointment already exists between ${newStart.format(
                  "HH:mm"
                )} and ${newEnd.format("HH:mm")}.`,
              },
            ],
            isError: true,
          };
        }

        // 3. Update the appointment
        const updatedAppointment = await databases.updateDocument(
          DB_ID!,
          APPOINTMENTS_COLLECTION!,
          appointmentId,
          {
            start_date: newStart.toISOString(),
            end_date: newEnd.toISOString(),
            notes,
          }
        );

        return {
          content: [
            {
              type: "text" as const,
              text: JSON.stringify(updatedAppointment, null, 2),
            },
          ],
        };
      } catch (error) {
        return {
          content: [
            {
              type: "text" as const,
              text: `Error fetching dentists: ${
                error instanceof Error ? error.message : "Unknown error"
              }`,
            },
          ],
          isError: true,
        };
      }
    },
  },
];
