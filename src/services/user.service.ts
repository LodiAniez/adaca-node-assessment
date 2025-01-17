import { User } from "../models/user.model";

type CreateUser = {
  name: string;
  email: string;
  age: number;
};

const createUser = async ({ age, email, name }: CreateUser) => {
  try {
    const user = new User({ name, email, age });
    const createdUser = await user.save();

    return createdUser;
  } catch (e) {
    throw e;
  }
};

export { createUser };
