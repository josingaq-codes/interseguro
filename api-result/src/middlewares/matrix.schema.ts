import { z } from "zod/v3";

export const qrSchema = z.object({
  Q: z.array(z.array(z.number())).nonempty(),
  R: z.array(z.array(z.number())).nonempty(),
});
