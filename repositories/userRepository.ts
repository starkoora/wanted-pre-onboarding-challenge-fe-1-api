import { DB } from "../models/db";
import type { User } from "../types/users";

export const userRepository = {
  create: async ({ email, password }: Pick<User, "email" | "password">) => {
    const newUser = DB.create<User>({ email, password });

    DB.instance.data?.users.push(newUser);
    await DB.instance.write();

    return newUser;
  },
  find: (predicate: (user: User) => boolean) => {
    return DB.instance.data?.users.find(predicate);
  },
};
