import { create, db } from "../models/db";
import type { User } from "../types/users";

export const userRepository = {
  create: async ({ email, password }: Pick<User, "email" | "password">) => {
    const newUser = create<User>({ email, password });

    db.data?.users.push(newUser);
    await db.write();

    return newUser;
  },
  find: (predicate: (user: User) => boolean) => {
    return db.data?.users.find(predicate);
  },
};
