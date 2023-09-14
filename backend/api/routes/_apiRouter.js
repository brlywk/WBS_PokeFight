import { Router } from "express";
import pokemonRouter from "./_pokemonRouter.js";
import fightsRouter from "./_fightsRouter.js";
import typesRouter from "./_typesRoute.js";
// import initialLoad from "./initialLoad.js";
const apiRouter = Router();

// ROUTE pokemon
apiRouter.use("/pokemon", pokemonRouter);

// ROUTE fights
apiRouter.use("/fights", fightsRouter);

// ROUTE types
apiRouter.use("/types", typesRouter);

// TMP ROUTE initial_load
// apiRouter.use("/initial_load", initialLoad);

export default apiRouter;
