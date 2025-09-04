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
  cancelAppointment,
  createAppointment,
  getAppointmentsOfDay,
  updateAppointment,
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
    description: "Reschedule an existing appointment for a patient",
    inputSchema: {
      dentistName: z
        .string()
        .describe(
          "The name of the dentist whose appointment is to be rescheduled"
        ),
      patientName: z
        .string()
        .describe(
          "The name of the patient whose appointment is to be rescheduled"
        ),
      patientPhone: z.string().describe("The phone number of the patient"),
      oldAppointmentDate: z
        .string()
        .describe("The current date of the appointment"),
      oldAppointmentTime: z
        .string()
        .describe("The current time of the appointment"),
      newAppointmentDate: z
        .string()
        .describe("The new date for the appointment"),
      newAppointmentTime: z
        .string()
        .describe("The new time for the appointment"),
    },
    async callback(params, extra) {
      const {
        patientName,
        patientPhone,
        dentistName,
        newAppointmentDate,
        newAppointmentTime,
        oldAppointmentDate,
        oldAppointmentTime,
      } = params;

      // check date is not older than today
      if (dayjs(newAppointmentDate).isBefore(dayjs(), "day")) {
        return {
          content: [
            {
              type: "text" as const,
              text: "Error: New appointment date cannot be in the past.",
            },
          ],
          isError: true,
        };
      }

      if (dayjs(oldAppointmentDate).isBefore(dayjs(), "day")) {
        return {
          content: [
            {
              type: "text" as const,
              text: "Error: Appointment in the past cannot be rescheduled.",
            },
          ],
          isError: true,
        };
      }

      // get doctor by name
      const dentists = await searchDentist(dentistName);

      if (dentists.documents.length === 0) {
        return {
          content: [
            {
              type: "text",
              text: `No dentist found with the name ${dentistName}.`,
            },
          ],
        };
      }

      const dentistId = dentists.documents[0].$id;

      // get patient by name
      const patients = await getPatientByNameAndPhone(
        patientName,
        patientPhone
      );

      if (patients.documents.length == 0) {
        return {
          content: [
            {
              type: "text",
              text: `No patient found with the name ${patientName} and phone ${patientPhone}.`,
            },
          ],
        };
      }

      const patientId = patients.documents[0].$id;

      // get appointment by patientId and doctorId
      const newStart = dayjs(
        `${oldAppointmentDate} ${oldAppointmentTime}`,
        "YYYY-MM-DD HH:mm"
      );
      const newEnd = newStart.add(30, "minutes");

      // 1. Query appointments on that day
      const sameDayAppointments = await getAppointmentsOfDay(
        newStart,
        newEnd,
        dentistId
      );

      if (sameDayAppointments.total == 0) {
        return {
          content: [
            {
              type: "text",
              text: `No existing appointment found for ${patientName} with ${dentistName} on ${oldAppointmentDate} at ${oldAppointmentTime}.`,
            },
          ],
          isError: true,
        };
      }

      const checkUserAppointment = sameDayAppointments.documents.find(
        (appt) => appt?.users?.$id === patientId
      );

      if (!checkUserAppointment) {
        return {
          content: [
            {
              type: "text",
              text: `No existing appointment found for ${patientName} with ${dentistName} on ${oldAppointmentDate} at ${oldAppointmentTime}.`,
            },
          ],
          isError: true,
        };
      }

      // check if new slot is available
      // get appointment by patientId and doctorId
      const newAStart = dayjs(
        `${newAppointmentDate} ${newAppointmentTime}`,
        "YYYY-MM-DD HH:mm"
      );
      const newAEnd = newStart.add(30, "minutes");

      // 1. Query appointments on that day
      const sameDayAppointmentsNew = await getAppointmentsOfDay(
        newAStart,
        newAEnd,
        dentistId
      );

      if (sameDayAppointmentsNew.total > 0) {
        return {
          content: [
            {
              type: "text",
              text: `Appointment conflict: Another appointment already exists between ${newAStart.format(
                "HH:mm"
              )} and ${newAEnd.format("HH:mm")}.`,
            },
          ],
          isError: true,
        };
      }

      // if available, update appointment
      const updatedAppointment = await updateAppointment(
        checkUserAppointment.$id,
        newAStart,
        newAEnd
      );

      return {
        content: [
          {
            type: "text" as const,
            text:
              "Your Appointment is rescheduled successfully." +
              JSON.stringify(updatedAppointment, null, 2),
          },
        ],
      };
    },
  },
  {
    name: "cancelAppointment",
    description: "Cancel an existing appointment for a patient",
    inputSchema: {
      dentistName: z
        .string()
        .describe(
          "The name of the dentist whose appointment is to be rescheduled"
        ),
      patientName: z
        .string()
        .describe(
          "The name of the patient whose appointment is to be rescheduled"
        ),
      patientPhone: z.string().describe("The phone number of the patient"),
      appointmentDate: z.string().describe("The date of the appointment"),
      appointmentTime: z.string().describe("The time of the appointment"),
    },
    async callback(params, extra) {
      const {
        dentistName,
        patientName,
        patientPhone,
        appointmentDate,
        appointmentTime,
      } = params;
      // check date is not older than today
      if (dayjs(appointmentDate).isBefore(dayjs(), "day")) {
        return {
          content: [
            {
              type: "text" as const,
              text: "Error: appointment date cannot be in the past.",
            },
          ],
          isError: true,
        };
      }

      // get dentist by name
      const dentists = await searchDentist(dentistName);

      if (dentists.documents.length === 0) {
        return {
          content: [
            {
              type: "text",
              text: `No dentist found with the name ${dentistName}.`,
            },
          ],
        };
      }

      const dentistId = dentists.documents[0].$id;

      // get patient by name
      const patients = await getPatientByNameAndPhone(
        patientName,
        patientPhone
      );

      if (patients.documents.length == 0) {
        return {
          content: [
            {
              type: "text",
              text: `No patient found with the name ${patientName} and phone ${patientPhone}.`,
            },
          ],
        };
      }

      const patientId = patients.documents[0].$id;

      // check appointment exists for that patient with that doctor at that time
      // get appointment by patientId and doctorId
      const newStart = dayjs(
        `${appointmentDate} ${appointmentTime}`,
        "YYYY-MM-DD HH:mm"
      );
      const newEnd = newStart.add(30, "minutes");

      // 1. Query appointments on that day
      const sameDayAppointments = await getAppointmentsOfDay(
        newStart,
        newEnd,
        dentistId
      );

      if (sameDayAppointments.total == 0) {
        return {
          content: [
            {
              type: "text",
              text: `No existing appointment found for ${patientName} with ${dentistName} on ${appointmentDate} at ${appointmentTime}.`,
            },
          ],
          isError: true,
        };
      }

      const checkUserAppointment = sameDayAppointments.documents.find(
        (appt) => appt?.users?.$id === patientId
      );

      if (!checkUserAppointment) {
        return {
          content: [
            {
              type: "text",
              text: `No existing appointment found for ${patientName} with ${dentistName} on ${appointmentDate} at ${appointmentTime}.`,
            },
          ],
          isError: true,
        };
      }

      const cancelledAppointment = await cancelAppointment(
        checkUserAppointment.$id
      );

      return {
        content: [
          {
            type: "text" as const,
            text:
              "your Appointment is cancelled successfully." +
              JSON.stringify(cancelledAppointment, null, 2),
          },
        ],
      };
    },
  },
];
