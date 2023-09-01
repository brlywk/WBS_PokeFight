import asyncHandler from "express-async-handler";

const getAllPokemon = asyncHandler(async (req, res, next) => {
  res.status(200).send("Get all Pokemon route working");
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

export { getAllPokemon, getSinglePokemon, getSinglePokemonInfo };
