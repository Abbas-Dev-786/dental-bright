// main server file
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { dentistTools } from "./tools/dentist.tool";
import { appointmentTools } from "./tools/appointment.tool";
import { dateTools } from "./tools/date.tool";

// Optional: If you have user-level config, define it here
// This should map to the config in your smithery.yaml file
export const configSchema = z.object({
  debug: z.boolean().default(false).describe("Enable debug logging"),
});

export default function createStatelessServer({
  config,
  sessionId,
}: {
  config: z.infer<typeof configSchema>; // Define your config in smithery.yaml
  sessionId: string; // Use the sessionId field for mapping requests to stateful processes
}) {
  const server = new McpServer({
    name: "DentalBright MCP Server",
    version: "1.0.0",
  });

  // Register dentist tools using the same pattern
  dentistTools.forEach((tool) =>
    server.tool(tool.name, tool.description, tool.inputSchema, tool.callback)
  );

  appointmentTools.forEach((tool) =>
    server.tool(tool.name, tool.description, tool.inputSchema, tool.callback)
  );

  dateTools.forEach((tool) =>
    server.tool(tool.name, tool.description, tool.inputSchema, tool.callback)
  );

  return server.server;
}
