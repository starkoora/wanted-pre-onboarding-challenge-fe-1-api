import jwt from "jsonwebtoken";

const JWT_TOKEN_SALT = "jwtTokenSalt";

export const createToken = (value: string) => {
  return jwt.sign(value, JWT_TOKEN_SALT);
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, JWT_TOKEN_SALT);
};
