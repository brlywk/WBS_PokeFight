import asyncHandler from "express-async-handler";
import Pokemon from "../schema/_pokemonSchema.js";

/**
 * @desc    Returns all pokemon or a search result if query is specified
 */
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
    result = await Pokemon.find({});
  }

  if (!result) {
    return res.status(400).json({
      message: `No Pokemon found.`,
    });
  }

  res.status(200).json(result);
});

/**
 * @desc    Returns a single pokemon by its ID or name
 */
const getSinglePokemon = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const searchProp = Number(id) ? "pokedexId" : "name";
  const searchValue = Number(id) || new RegExp(id, "i");
  const filter = { [searchProp]: searchValue };

  const result = (await Pokemon.findOne(filter)) ?? {};

  if (!result) {
    return res.status(400).json({
      message: `Query for ${searchProp}: ${searchValue} did not return any results.`,
    });
  }

  res.status(200).json(result);
});

/**
 * @desc    Returns info on a single property of a single pokemon
 */
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
