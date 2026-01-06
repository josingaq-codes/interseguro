import { z } from "zod/v3";

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
