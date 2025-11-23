import express from "express";
import globalErrorHandler from "./middleware/globalErrorHandle.ts";
import createHttpError from "http-errors";

const app = express();

// Routes

app.get("/", (req, res, next) => {
  res.json({ message: "Welcome to first project." });
});

// Global error handler
// put at the end

app.use(globalErrorHandler);

export default app;
