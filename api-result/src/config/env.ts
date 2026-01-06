import dotenv from "dotenv";
import { z } from "zod/v3";

dotenv.config();

const environment = z.object({
  PORT: z.coerce.number().int().positive().default(4001),
  JWT_SECRET: z
    .string()
    .min(32, "JWT_SECRET must be at least 32 characters long"),
  API_MATRIX_URL: z.string().url().default("http://localhost:4000"),
});

const env = environment.parse(process.env);

export const PORT = env.PORT;
export const JWT_SECRET = env.JWT_SECRET;
export const API_MATRIX_URL = env.API_MATRIX_URL;
