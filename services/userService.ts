import { userRepository } from "../repositories/userRepository";
import type { User } from "../types/users";

export const createUser = async ({
  email,
  password,
}: Pick<User, "email" | "password">) => {
  return userRepository.create({ email, password });
};

export const findUser = (predicate: (user: User) => boolean) => {
  return userRepository.find(predicate);
};
