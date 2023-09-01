import { Router } from "express";
import {
  getLeaderboard,
  postNewFight,
} from "../controllers/fightsController.js";
const fightsRouter = Router();

fightsRouter.route("/").get(getLeaderboard);
fightsRouter.route("/save").post(postNewFight);

export default fightsRouter;
