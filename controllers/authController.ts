import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { create, db } from "../models/db";
import { createError } from "../utils/responseUtils";
import type { User } from "../types/users";
import { loginValidator } from "../utils/validator";

export const login = async (req: Request, res: Response) => {
  const { email, password }: { email: string; password: string } = req.body;

  const { isValid, message } = loginValidator({ email, password });
  if (!isValid) {
    return res.status(StatusCodes.BAD_REQUEST).send(createError(message));
  }

  const user = db.data?.users.find(
    (user) => user.email === email && user.password === password
  );

  if (user) {
    return res.status(StatusCodes.OK).send(user);
  } else {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send(createError("유저를 찾을 수 없습니다"));
  }
};

export const createUser = async (req: Request, res: Response) => {
  const { email, password }: { email: string; password: string } = req.body;

  console.log(">>>", req);

  const { isValid, message } = loginValidator({ email, password });
  if (!isValid) {
    return res.status(StatusCodes.BAD_REQUEST).send(createError(message));
  }

  const user = create<User>({ email, password });

  if (user) {
    db.data?.users.push(user);
    await db.write();

    return res.status(StatusCodes.OK).send(user);
  } else {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR);
  }
};
