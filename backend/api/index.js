import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import errorHandler from "./middleware/errorHandling.js";
import apiRouter from "./routes/apiRouter.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api", apiRouter);

// error handling middleware
app.use(errorHandler);

const port = process.env.PORT;
app.listen(port, () => console.log(`Server running on port ${port}`));
