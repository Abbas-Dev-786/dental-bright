import { z } from "zod";
import {
  ServerNotification,
  ServerRequest,
} from "@modelcontextprotocol/sdk/types.js";
import { RequestHandlerExtra } from "@modelcontextprotocol/sdk/shared/protocol.js";
import { config } from "dotenv";
import { getDentistList, searchDentist } from "../services/dentist.service";
import dayjs from "dayjs";
import { getAppointmentsOfDay } from "../services/appointment.service";

config();

// Define the correct return type based on MCP SDK requirements
type ToolResult = {
  content: Array<{
    type: "text";
    text: string;
  }>;
  isError?: boolean;
  _meta?: Record<string, unknown>;
};

// Define proper types for the tool structure
interface DentistToolDefinition {
  name: string;
  description: string;
  inputSchema: Record<string, z.ZodType>;
  callback: (
    params: Record<string, any>,
    extra: RequestHandlerExtra<ServerRequest, ServerNotification>
  ) => Promise<ToolResult>;
}

// checkDentistAvailability

export const dentistTools: DentistToolDefinition[] = [
  {
    name: "getDentistList",
    description: "Fetch a list of available dentists.",
    inputSchema: {
      // date: z.string().describe("Date to check availability for"),
    },
    callback: async (params: Record<string, any>, extra) => {
      // const { date } = params;
      try {
        const docs = await getDentistList();

        const data = docs.documents.map((dentist: any) => ({
          id: dentist.$id,
          name: dentist.name,
          specialization: dentist.specialization,
          priceRange: dentist.priceRange,
          services: dentist.services,
          workingHours: dentist.workingHours,
        }));

        return {
          content: [
            {
              type: "text" as const,
              text: JSON.stringify(data, null, 2),
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
    name: "getDentistDetails",
    description: "Fetch details of a specific dentist by their name",
    inputSchema: {
      dentistName: z.string().describe("The name of the dentist."),
    },
    async callback(params, extra) {
      const { dentistName } = params;
      try {
        const docs = await searchDentist(dentistName);

        return {
          content: [
            {
              type: "text",
              text: docs?.documents.length
                ? JSON.stringify(docs.documents, null, 2)
                : "No data found",
            },
          ],
        };
      } catch (error) {
        return {
          content: [
            {
              type: "text",
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
    name: "checkDentistAvailability",
    description: "Check if a dentist is available on a specific date and time",
    inputSchema: {
      dentistName: z.string().describe("The name of the dentist"),
      date: z.string().describe("The date to check availability for."),
      time: z.string().describe("The time to check availability for."),
    },
    async callback(params, extra) {
      const { dentistName, date, time } = params;

      try {
        const docs = await searchDentist(dentistName);

        if (docs.documents.length === 0) {
          return {
            content: [
              {
                type: "text",
                text: `No dentist found with the name ${dentistName}.`,
              },
            ],
          };
        }

        const dentistId = docs.documents[0].$id;

        try {
          const newStart = dayjs(`${date} ${time}`, "YYYY-MM-DD HH:mm");
          const newEnd = newStart.add(30, "minutes");

          // 1. Query appointments on that day
          const sameDayAppointments = await getAppointmentsOfDay(
            newStart,
            newEnd,
            dentistId
          );

          // 2. If any overlap found → block
          if (sameDayAppointments.total > 0) {
            return {
              content: [
                {
                  type: "text",
                  text: `⚠️ Appointment conflict: Another appointment already exists for this dentist between ${newStart.format(
                    "HH:mm"
                  )} and ${newEnd.format("HH:mm")}.`,
                },
              ],
              isError: true,
            };
          }

          return {
            content: [
              {
                type: "text" as const,
                text: "Dentist is available. ",
              },
            ],
          };
        } catch (error) {
          return {
            content: [
              {
                type: "text" as const,
                text: `Error checking dentist availability: ${
                  error instanceof Error ? error.message : "Unknown error"
                }`,
              },
            ],
            isError: true,
          };
        }
      } catch (error) {
        return {
          content: [
            {
              type: "text",
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
