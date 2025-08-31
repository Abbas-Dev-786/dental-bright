import { RequestHandlerExtra } from "@modelcontextprotocol/sdk/shared/protocol.js";
import {
  ServerNotification,
  ServerRequest,
} from "@modelcontextprotocol/sdk/types.js";
import dayjs from "dayjs";
import z from "zod";

type ToolResult = {
  content: Array<{
    type: "text";
    text: string;
  }>;
  isError?: boolean;
  _meta?: Record<string, unknown>;
};

// Define proper types for the tool structure
interface DateToolDefinition {
  name: string;
  description: string;
  inputSchema: Record<string, z.ZodType>;
  callback: (
    params: Record<string, any>,
    extra: RequestHandlerExtra<ServerRequest, ServerNotification>
  ) => Promise<ToolResult>;
}

export const dateTools: DateToolDefinition[] = [
  {
    name: "getCurrentDate",
    description: "Get the current date in YYYY-MM-DD format",
    inputSchema: {},
    callback: async (params, extra) => {
      const currentDate = dayjs().format("YYYY-MM-DD");
      return {
        content: [
          {
            type: "text",
            text: currentDate,
          },
        ],
      };
    },
  },
  {
    name: "getCurrentTime",
    description: "Get the current time in HH:mm:ss format",
    inputSchema: {},
    callback: async (params, extra) => {
      const currentTime = dayjs().format("HH:mm:ss");
      return {
        content: [
          {
            type: "text",
            text: currentTime,
          },
        ],
      };
    },
  },
];
