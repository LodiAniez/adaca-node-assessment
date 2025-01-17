import Joi from "joi";

export const validateUser = (data: any) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    age: Joi.number().min(1).max(120).required(),
  });

  return schema.validate(data);
};
