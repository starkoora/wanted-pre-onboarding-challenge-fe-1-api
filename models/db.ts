import { Low, JSONFile } from "lowdb";
import { join } from "path";
import { nanoid } from "nanoid";
import path from "path";

const __dirname = path.resolve();

export interface Data {
  todos: any[];
}

export let db: Low<Data>;

export const createConnection = async () => {
  // Use JSON file for storage
  const file = join(__dirname, "./db/db.json");
  const adapter = new JSONFile<Data>(file);
  db = new Low<Data>(adapter);

  // Read data from JSON file, this will set db.data content
  await db.read();

  db.data ||= { todos: [] };
  // Write db.data content to db.json
  await db.write();
};

export const getConnection = () => db;

export const create = (content: any) => {
  const timestamp = new Date().toISOString();
  return {
    ...content,
    id: nanoid(),
    createdAt: timestamp,
    updatedAt: timestamp,
  };
};

export const update = (content: any) => {
  const timestamp = new Date().toISOString();
  return {
    ...content,
    updatedAt: timestamp,
  };
};
