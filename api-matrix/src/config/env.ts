import dotenv from "dotenv";
import { z } from "zod/v3";

dotenv.config();

const environment = z.object({
  PORT: z.coerce.number().int().positive().default(4000),
  JWT_SECRET: z
    .string()
    .min(32, "JWT_SECRET must be at least 32 characters long"),
  FRONTEND_URL: z.string().url().default("http://localhost:3000"),
});

const env = environment.parse(process.env);

export const PORT = env.PORT;
export const JWT_SECRET = env.JWT_SECRET;
export const JWT_EXPIRES_IN = "5m";
export const FRONTEND_URL = env.FRONTEND_URL;
