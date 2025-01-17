import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { validateUser } from "../validations/user";
import { createUser as createUserService } from "../services/user.service";

export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { error } = validateUser(req.body);

    if (error) {
      res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
      return;
    }

    const { name, email, age } = req.body;

    const createdUser = await createUserService({
      age,
      email,
      name,
    });

    res
      .status(StatusCodes.CREATED)
      .json({ message: "User created successfully", user: createdUser });
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
};
