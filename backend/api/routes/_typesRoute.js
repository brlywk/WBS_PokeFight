import { Router } from "express";
import { getTypes, getTypeByName } from "../controllers/_typesController.js";

const typesRouter = Router();

typesRouter.route("/").get(getTypes);
typesRouter.route("/:type").get(getTypeByName);

export default typesRouter;
