import { serve } from "@hono/node-server";

import { DB } from "./models/db.js";
import app from "./app.js";

DB.createConnection({
  preserve: true,
  filename: "db.json",
});

const port = parseInt(String(process.env.PORT)) || 8080;

serve({ fetch: app.fetch, port }, (info) => {
  console.log(`Listening on http://localhost:${info.port}`);
});
