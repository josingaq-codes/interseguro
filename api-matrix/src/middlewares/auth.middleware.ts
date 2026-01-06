import { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";

interface AccessTokenPayload extends JwtPayload {
  sub: string;
  email?: string;
}

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorization = req.headers.authorization;

  if (!authorization?.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Authorization header missing" });
  }

  const token = authorization.slice(7).trim();

  try {
    const payload = jwt.verify(token, JWT_SECRET) as AccessTokenPayload;

    if (!payload?.sub) {
      return res.status(401).json({ error: "Invalid token payload" });
    }

    res.locals.auth = { userId: payload.sub, email: payload.email };

    next();
  } catch {
    res.status(401).json({ error: "Invalid or expired token" });
  }
};
