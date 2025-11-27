import express, { urlencoded } from "express";
import globalErrorHandler from "./middleware/globalErrorHandle.ts";
import userRouter from "./user/userRouter.ts";

const app = express();
app.use(express.json());

// Routes

app.get("/", (req, res, next) => {
  res.json({ message: "Welcome to first project." });
});

// Global error handler
// put at the end

app.use("/api/users", userRouter);

app.use(globalErrorHandler);

export default app;
