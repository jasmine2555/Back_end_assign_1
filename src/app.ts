import express from "express";
import apiV1Routes from "./api/v1/routes";

const app = express();

app.use(express.json());
app.use("/api/v1", apiV1Routes);

// Optional: root route (so browser doesn't show Cannot GET /)
app.get("/", (_req, res) => {
  res.status(200).send("Server running. Try /api/v1/health");
});

export default app;
