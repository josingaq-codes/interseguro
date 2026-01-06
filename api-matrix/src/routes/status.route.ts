import express, { Response } from "express";

export const status = express();

status.get("/ping", (_, res: Response) => res.json({ message: "pong" }));
