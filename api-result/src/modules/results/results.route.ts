import express from "express";
import { Matrix } from "ml-matrix";
import { validateBody } from "../../middlewares/body.middleware.js";
import { qrSchema } from "../../middlewares/matrix.schema.js";

export const results = express.Router();

results.post("/", validateBody(qrSchema), (req, res) => {
  const { Q, R } = req.body;

  const matrices = [new Matrix(Q), new Matrix(R)];

  const values = matrices.flatMap((matrix) => matrix.to2DArray());

  const max = Math.max(...values.flat());
  const min = Math.min(...values.flat());
  const sum = values.flat().reduce((acc, v) => acc + v, 0);
  const avg = sum / values.flat().length;
  const diagonal = matrices.map((matrix) => matrix.diagonal());

  res.json({ maximum: max, minimum: min, average: avg, diagonal });
});
