import { z } from "zod";

export const registerSchema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters long."),
    password: z.string().min(8, "Password must be at least 8 characters long."),
    retype_password: z.string(),
  }).refine(data => data.password === data.retype_password, {
    message: "Passwords don't match",
    path: ["retype_password"],
  });