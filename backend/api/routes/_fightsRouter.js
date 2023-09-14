import { Router } from "express";
import {
  getFightById,
  getAllFights,
  postNewFight,
} from "../controllers/_fightsController.js";

const fightsRouter = Router();

fightsRouter.route("/").get(getAllFights);
fightsRouter.route("/:id").get(getFightById);
fightsRouter.route("/save").post(postNewFight);

export default fightsRouter;
