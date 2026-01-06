import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { validateBody } from "../middlewares/body.middleware.js";
import { requireAuth } from "../middlewares/auth.middleware.js";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/env.js";
import { signInSchema } from "../schemas/auth.schema.js";

const DEMO_USER = {
  id: "abcd-1234-efgh-5678",
  email: "jose.inga@email.com",
  password: "J0S3!NG@26",
};

export const auth = express();

auth.post(
  "/signin",
  validateBody(signInSchema),
  (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (email !== DEMO_USER.email || password !== DEMO_USER.password) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { sub: DEMO_USER.id, email: DEMO_USER.email },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    res.json({ token });
  }
);

auth.get("/me", requireAuth, (_req: Request, res: Response) => {
  res.json({ user: res.locals.auth });
});
