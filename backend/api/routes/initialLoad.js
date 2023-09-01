import { Router } from "express";
const initialLoad = Router();

initialLoad.route("/").get((req, res, next) => {
  res.send("Initial load here");
});

export default initialLoad;
