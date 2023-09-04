import { Router } from "express";
import pokemonRouter from "./pokemonRouter.js";
import fightsRouter from "./fightsRouter.js";
import initialLoad from "./initialLoad.js";
const apiRouter = Router();

// ROUTE pokemon
apiRouter.use("/pokemon", pokemonRouter);

// ROUTE fights
apiRouter.use("/fights", fightsRouter);

// TMP ROUTE initial_load
// apiRouter.use("/initial_load", initialLoad);

export default apiRouter;
