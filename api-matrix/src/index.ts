import express from "express";
import cors from "cors";
import { FRONTEND_URL, PORT } from "./config/env.js";
import { status } from "./routes/status.route.js";
import { matrix } from "./routes/matrix.route.js";
import { jsonSyntaxErrorHandler } from "./middlewares/json.middleware.js";
import { auth } from "./routes/auth.route.js";
import { requireAuth } from "./middlewares/auth.middleware.js";

const app = express();
app.use(
  cors({
    origin: [FRONTEND_URL],
  })
);
app.use(express.json());
app.use(jsonSyntaxErrorHandler);

const api = express.Router();
api.use("/auth", auth);
api.use("/status", status);
api.use("/matrix", requireAuth, matrix);

app.use("/api", api);
app.listen(PORT, () => {
  console.log(`API MATRIX: http://localhost:${PORT}`);
});
