import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(StatusCodes.UNAUTHORIZED).json({ message: "Unauthorized" });

    return;
  }

  const token = authHeader.split(" ")[1];
  // static valid token for testing purposes
  if (token !== "valid-token") {
    res.status(StatusCodes.FORBIDDEN).json({ message: "Forbidden" });

    return;
  }

  next();
};
