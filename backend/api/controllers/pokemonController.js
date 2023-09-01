export function getAllPokemon(req, res, next) {
  res.status(200).send("Get all Pokemon route working");
}

export function getSinglePokemon(req, res, next) {
  const { id } = req.params;

  const isIdNotName = Number(id);

  res
    .status(200)
    .send(`Requested pokemon: ${isIdNotName ? "ID" : "Name"} ${id}`);
}

export function getSinglePokemonInfo(req, res, next) {
  const { id, prop } = req.params;

  const isIdNotName = Number(id);

  res
    .status(200)
    .send(
      `Requested pokemon: ${
        isIdNotName ? "ID" : "Name"
      } ${id}, requesting prop ${prop}`
    );
}
