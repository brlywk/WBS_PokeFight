import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

const username = process.env.USERNAME;
const password = process.env.PASSWORD;

const connectionString = `mongodb+srv://${username}:${password}@bootcamp.jkrxi1d.mongodb.net/pokefight`;

mongoose
  .connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.log(err));

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Error connecting to MongoDB"));

export default db;
