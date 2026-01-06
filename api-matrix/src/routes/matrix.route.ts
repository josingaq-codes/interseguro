import express, { Request, Response } from "express";
import { Matrix, QrDecomposition } from "ml-matrix";
import { validateBody } from "../middlewares/body.middleware.js";
import { matrixSchema } from "../schemas/matrix.schema.js";

export const matrix = express();

matrix.post(
  "/qr",
  validateBody(matrixSchema),
  (req: Request, res: Response) => {
    try {
      const { matrix } = req.body;

      const matrixData = new Matrix(matrix);
      const qrDecomposed = new QrDecomposition(matrixData);

      res.json({
        Q: qrDecomposed.orthogonalMatrix,
        R: qrDecomposed.upperTriangularMatrix,
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
