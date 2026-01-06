import { z } from "zod/v3";

export const matrixSchema = z
  .object({
    matrix: z.array(z.array(z.number())).nonempty(),
  })
  .superRefine(({ matrix }, ctx) => {
    if (!matrix?.length || !matrix[0]) return;

    const columns = matrix[0].length;

    if (!matrix.every((row) => row.length === columns)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "All rows must have the same length",
      });
    }

    if (matrix.length < columns) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Rows must be >= columns for QR decomposition",
      });
    }
  });
