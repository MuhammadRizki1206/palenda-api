import { z as validate } from "zod";

export const registerSchema = validate.object({
  username: validate.string().min(1, "Username is required"),
  name: validate.string().min(3, "Name should have at least 3 characters"),
  email: validate.string().email("Invalid email address"),
  password: validate
    .string()
    .min(6, "Password must be at least 6 charachters long"),
});
export const loginSchema = validate.object({
  email: validate.string().email("Invalid email address"),
  password: validate
    .string()
    .min(6, "Password must be at least 6 character long"),
});
