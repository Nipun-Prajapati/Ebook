import express from "express";
import globalErrorHandler from "./middleware/globalErrorHandle.ts";
import userRouter from "./user/userRouter.ts";
import bookRouter from "./book/bookRouter.ts";
// import bodyParser from "body-parser";

const app = express();
app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// Routes

app.get("/", (req, res) => {
  res.json({ message: "Welcome to first project." });
});

// Global error handler
// put at the end

app.use("/api/users", userRouter);
app.use("/api/books", bookRouter);

app.use(globalErrorHandler);

export default app;
