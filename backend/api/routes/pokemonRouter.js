import { Router } from "express";
import {
  getPokemon,
  getSinglePokemon,
  getSinglePokemonInfo,
} from "../controllers/pokemonController.js";

const pokemonRouter = Router();

pokemonRouter.route("/").get(getPokemon);
pokemonRouter.route("/:id").get(getSinglePokemon);
pokemonRouter.route("/:id/:prop").get(getSinglePokemonInfo);

export default pokemonRouter;
