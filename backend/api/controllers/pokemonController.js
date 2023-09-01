import asyncHandler from "express-async-handler";
import Pokemon from "../schema/pokemonSchema.js";

const getPokemon = asyncHandler(async (req, res, next) => {
  const { query } = req.query;

  if (query) {
    const results = await Pokemon.aggregate().search({
      index: "pokemon",
      text: {
        query,
        path: ["name", "type"],
      },
    });
    res.status(200).json(results);
  } else {
    const results = await Pokemon.find({}, { pokedexId: 1, name: 1, _id: 0 });

    res.status(200).json(results);
  }
});

const getSinglePokemon = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const isIdNotName = Number(id);

  res
    .status(200)
    .send(`Requested pokemon: ${isIdNotName ? "ID" : "Name"} ${id}`);
});

const getSinglePokemonInfo = asyncHandler(async (req, res, next) => {
  const { id, prop } = req.params;

  const isIdNotName = Number(id);

  res
    .status(200)
    .send(
      `Requested pokemon: ${
        isIdNotName ? "ID" : "Name"
      } ${id}, requesting prop ${prop}`
    );
});

export { getPokemon, getSinglePokemon, getSinglePokemonInfo };
