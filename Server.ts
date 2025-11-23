import app from "./src/App.ts";

const startServer = () => {
  const port = process.env.PORT || 5000;


  app.listen(port,() => {
    console.log(`server listening on ${port}`);
  })
}

startServer();