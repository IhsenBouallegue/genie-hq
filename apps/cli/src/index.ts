// client.ts

import { serve } from "bun";
import { getProfile, getProfiles, installApp } from "./backend-core";
import { type HttpResponse, OperationStatus } from "./types";

const PORT = 8080;

serve({
  port: PORT,
  fetch(req) {
    const url = new URL(req.url);
    const path = url.pathname;
    const method = req.method;

    if (method === "GET" && path === "/profiles") {
      return new Response(JSON.stringify(getProfiles()), {
        headers: { "Content-Type": "application/json" },
      });
    }

    if (method === "POST" && path.startsWith("/install/")) {
      const profileName = path.split("/")[2];
      if (!profileName) {
        return new Response("Profile name not provided", { status: 400 });
      }
      const profile = getProfile(profileName);

      if (!profile) {
        const response: HttpResponse = {
          status: OperationStatus.FAILURE,
          message: `Profile ${profileName} not found`,
        };
        return new Response(JSON.stringify(response), {
          status: 404,
          headers: { "Content-Type": "application/json" },
        });
      }

      let overallStatus = OperationStatus.SUCCESS;
      const messages = [];

      for (const app of profile.apps) {
        const result = installApp(app);
        if (result.status === OperationStatus.FAILURE) {
          overallStatus = OperationStatus.FAILURE;
        }
        messages.push(result.message);
      }

      const response: HttpResponse = {
        status: overallStatus,
        message: messages.join("\n"),
      };

      return new Response(JSON.stringify(response), {
        status: overallStatus === OperationStatus.SUCCESS ? 200 : 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response("Not Found", { status: 404 });
  },
});

console.log(`Client HTTP server running at http://localhost:${PORT}`);
