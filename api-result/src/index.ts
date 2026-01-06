import express from "express";
import cors from "cors";
import { API_MATRIX_URL, PORT } from "./config/env.js";
import { results } from "./modules/results/results.route.js";
import { requireAuth } from "./middlewares/auth.middleware.js";

const app = express();
app.use(
  cors({
    origin: [API_MATRIX_URL],
  })
);
app.use(express.json());

const api = express.Router();
api.use("/results", requireAuth, results);

app.use("/api", api);
app.listen(PORT, () => {
  console.log(`API RESULT: http://localhost:${PORT}`);
});
