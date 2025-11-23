import app from "./src/App.ts";
import dotenv from "dotenv/config";
import mongoDB_Connection from "./src/Database.ts";

const startServer = async () => {
  const port = process.env.PORT || 5000;
  // connect database
  await mongoDB_Connection();
  app.listen(port, () => {
    console.log(`server listening on ${port}`);
  });
};

startServer();
