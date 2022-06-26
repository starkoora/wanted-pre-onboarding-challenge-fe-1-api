import fs from "fs";
import path from "path";
import { JSONFile, Low } from "lowdb";

const __dirname = path.resolve();

const dbDirectory = path.join(__dirname, "../db");

export interface Data {
  todos: any[];
}

/**
 * Creates Database directory if it doesn't exist.
 */
if (!fs.existsSync(dbDirectory)) {
  fs.mkdirSync(dbDirectory);
}

const fileDirectory = path.join(__dirname, `../db/db.json`);

const adapter = new JSONFile<Data>(fileDirectory);
const db = new Low(adapter);

(async () => {
  await db.read();

  db.data?.todos.push([]);

  await db.write();
})();

export default db;
