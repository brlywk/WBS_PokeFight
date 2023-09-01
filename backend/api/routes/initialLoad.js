import { Router } from "express";
import data from "../json/master_pokedex.json" assert { type: "json" };
import Pokemon from "../schema/pokemonSchema.js";
import asyncHandler from "express-async-handler";

const initialLoad = Router();

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

initialLoad.route("/").get(
  asyncHandler(async (req, res, next) => {
    const results = []; // Store results for each operation

    for (const p of data) {
      console.log(`Starting operation for: ${p.id} (${p.name.english})`);

      const pokeAPI = "https://pokeapi.co/api/v2/pokemon/";
      const pokeUrl = new URL(p.id, pokeAPI);

      console.log(`Start fetch: ${pokeUrl.href}`);

      const pokeResult = await fetch(pokeUrl.href);
      const pokeData = await pokeResult.json();

      console.log(`Fetch done. [${p.id}]`);

      const sprites = {
        artwork: pokeData.sprites.other["official-artwork"].front_default,
        front: pokeData.sprites.front_default,
        back: pokeData.sprites.back_default,
      };

      results.push(sprites);

      console.log(`Starting MongoDB insertion for ${p.id}`);

      await Pokemon.findOneAndUpdate(
        { pokedexId: p.id },
        {
          pokedexId: p.id,
          name: p.name.english,
          type: p.type,
          "stats.hp": p.base["HP"],
          "stats.attack": p.base["Attack"],
          "stats.defense": p.base["Defense"],
          "stats.special_attack": p.base["Sp. Attack"],
          "stats.special_defense": p.base["Sp. Defense"],
          "stats.speed": p.base["Speed"],
          "sprites.artwork": sprites.artwork,
          "sprites.front": sprites.front,
          "sprites.back": sprites.back,
        },
        { upsert: true }
      );

      console.log(`Pokemon ${p.id} successfully processed`);
      console.log("=================================================");

      await delay(500); // Wait for 500ms before the next iteration
    }

    res.status(200).send("All insertions done"); // Send the array of results to the client
  })
);

export default initialLoad;
