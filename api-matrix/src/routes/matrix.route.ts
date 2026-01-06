import express, { Request, Response } from "express";
import { Matrix, QrDecomposition } from "ml-matrix";
import { validateBody } from "../middlewares/body.middleware.js";
import { matrixSchema } from "../schemas/matrix.schema.js";
import { API_RESULT_URL } from "../config/env.js";

export const matrix = express();

matrix.post(
  "/qr",
  validateBody(matrixSchema),
  async (req: Request, res: Response) => {
    try {
      const { matrix } = req.body;

      const matrixData = new Matrix(matrix);
      const qrDecomposed = new QrDecomposition(matrixData);

      const response = await fetch(`${API_RESULT_URL}/api/results`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${res.locals.token}`,
        },
        body: JSON.stringify({
          Q: qrDecomposed.orthogonalMatrix,
          R: qrDecomposed.upperTriangularMatrix,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        return res.status(response.status).json({ error: data.error });
      }

      res.json({
        Q: qrDecomposed.orthogonalMatrix,
        R: qrDecomposed.upperTriangularMatrix,
        maximum: data.maximum,
        minimum: data.minimum,
        average: data.average,
        diagonal: data.diagonal,
      });
    } catch (error) {
      const message = (error as Error).message;

      if (message) {
        return res.status(400).json({ error: message });
      }

      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);
