import { NextFunction, Request, Response } from "express";
import { z } from "zod/v3";

export const validateBody =
  (schema: z.ZodSchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = await schema.parseAsync(req.body);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: JSON.parse(error.message) });
      }
      next(error);
    }
  };
