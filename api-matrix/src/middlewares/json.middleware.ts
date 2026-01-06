import { Request, Response, NextFunction } from "express";

export const jsonSyntaxErrorHandler = (
  error: Error,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof SyntaxError && "body" in error) {
    return res.status(400).json({ error: "Invalid JSON payload" });
  }
  next(error);
};
