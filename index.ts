import { serve } from "@hono/node-server";

import { DB } from "./models/db";
import app from "./app";

DB.createConnection();

const port = parseInt(String(process.env.PORT)) || 8080;

serve({ fetch: app.fetch, port }, (info) => {
  console.log(`Listening on http://localhost:${info.port}`); // Listening on http://localhost:3000
});
