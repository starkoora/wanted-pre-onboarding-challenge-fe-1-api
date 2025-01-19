import { Low, JSONFile } from "lowdb";
import fs from "fs/promises";
import { join } from "path";
import { nanoid } from "nanoid";
import path from "path";

import type { Todo } from "../types/todos.js";
import type { User } from "../types/users.js";

const __dirname = path.resolve();

export interface Data {
  todos: Todo[];
  users: User[];
}

export namespace DB {
  export let instance: Low<Data>;

  export const initDatabase = async ({ filename }: { filename: string }) => {
    // Use JSON file for storage
    const dbFolderPath = join(__dirname, "./db");
    const filePath = join(__dirname, `./db/${filename}`);
    const dbFolder = await fs.readdir(dbFolderPath).catch(() => void 0);
    const file = await fs.readFile(filePath).catch(() => void 0);

    if (!dbFolder) {
      await fs.mkdir(dbFolderPath);
    }
    if (!file) {
      await fs.writeFile(filePath, JSON.stringify({ todos: [], users: [] }));
    }

    return filePath;
  };

  export const createConnection = async (options: {
    filename?: string;
    preserve?: boolean;
  }) => {
    const filePath = await initDatabase({
      filename: options.filename ?? "db.json",
    });

    const adapter = new JSONFile<Data>(filePath);
    instance = new Low<Data>(adapter);

    // Read data from JSON file, this will set db.data content
    await instance.read();

    if (options.preserve) {
      instance.data ||= { todos: [], users: [] };
    } else {
      instance.data = { todos: [], users: [] };
    }
    // Write db.data content to db.json
    await instance.write();
  };

  export const getConnection = () => instance;

  export const create = <T>(content: any): T => {
    const timestamp = new Date().toISOString();
    return {
      ...content,
      id: nanoid(),
      createdAt: timestamp,
      updatedAt: timestamp,
    };
  };

  export const update = <T>(content: any): T => {
    const timestamp = new Date().toISOString();
    return {
      ...content,
      updatedAt: timestamp,
    };
  };
}
