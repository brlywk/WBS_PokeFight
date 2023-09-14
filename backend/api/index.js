import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import db from "./data/_mongoDbConnection.js";
import errorHandler from "./middleware/_errorHandling.js";
import apiRouter from "./routes/_apiRouter.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api", apiRouter);

// error handling middleware
app.use(errorHandler);

const port = process.env.PORT;

db.once("open", () => {
  app.listen(port, () => {
    console.log(`Server running, listening to port ${3000}`);
  });
});

db.once("error", (error) => {
  console.log(`Unable to establish database connection: ${error}\nExiting.`);
  process.exit(1);
});
