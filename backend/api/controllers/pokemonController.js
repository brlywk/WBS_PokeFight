import asyncHandler from "express-async-handler";
import Pokemon from "../schema/pokemonSchema.js";

// returns all pokemon or a search result if query is specified
const getPokemon = asyncHandler(async (req, res, next) => {
  const { query } = req.query;

  let result;

  if (query) {
    result = await Pokemon.aggregate().search({
      index: "pokemon",
      text: {
        query,
        path: ["name", "type"],
      },
    });
  } else {
    result = await Pokemon.find({}, { pokedexId: 1, name: 1, _id: 0 });
  }

  if (!result) {
    return res.status(400).json({
      message: `No Pokemon found.`,
    });
  }

  res.status(200).json(result);
});

const getSinglePokemon = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const searchProp = Number(id) ? "pokedexId" : "name";
  const searchValue = Number(id) || /id/i;
  const filter = { [searchProp]: searchValue };

  const result = (await Pokemon.findOne(filter)) ?? {};

  if (!result) {
    return res.status(400).json({
      message: `Query for ${searchProp}: ${searchValue} did not return any results.`,
    });
  }

  res.status(200).json(result);
});

const getSinglePokemonInfo = asyncHandler(async (req, res, next) => {
  const { id, prop } = req.params;

  const searchProp = Number(id) ? "pokedexId" : "name";
  const searchValue = Number(id) || /id/i;

  const filter = { [searchProp]: searchValue };
  const projection = { [prop]: 1 };

  const result = await Pokemon.findOne(filter, projection);

  if (!result) {
    return res.status(400).json({
      message: `Query for ${searchProp}: ${searchValue} did not return any results.`,
    });
  }

  let retObj = result.toObject();

  // if the prop we are looking for does not exist, this endpoint
  // should not return anything... but mongoDB always returns an Object
  // with a single property if the document exists (property _id)
  if (Object.keys(retObj).length === 1) {
    retObj = {};
  }

  res.status(200).json(retObj);
});

export { getPokemon, getSinglePokemon, getSinglePokemonInfo };
