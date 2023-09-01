import { Router } from "express";
import {
  getAllPokemon,
  getSinglePokemon,
  getSinglePokemonInfo,
} from "../controllers/pokemonController.js";

const pokemonRouter = Router();

pokemonRouter.route("/").get(getAllPokemon);
pokemonRouter.route("/:id").get(getSinglePokemon);
pokemonRouter.route("/:id/:prop").get(getSinglePokemonInfo);

export default pokemonRouter;
