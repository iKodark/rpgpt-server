import { z } from "zod";

const register = z.object({
  username: z
    .string(),
  email: z
    .string()
    .email("Invalid e-mail"),
  password: z
    .string()
    .min(6, { message: "Password is too short, min 6" })
    .max(20, { message: "Password is too long, max 20" }),
});

const login = z.object({
  login: z
    .string(),
  password: z
    .string()
});

export {
  register,
  login
}