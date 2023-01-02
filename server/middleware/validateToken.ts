import jwt from "jsonwebtoken";
import type { NextFunction, Request, Response } from "express";

import { JWT_TOKEN_SALT } from "../utils/authorizeUtils";
import { StatusCodes } from "http-status-codes";
import { createError } from "../utils/responseUtils";

export const validateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;
  if (!token) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send(createError("Token is missing"));
  }
  next();
};
