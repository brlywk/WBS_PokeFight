import mongoose from "mongoose";
const Schema = mongoose.Schema;

const pokemonSchema = new Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  stats: {
    hp: { type: Number, required: true },
    attack: { type: Number, required: true },
    defense: { type: Number, required: true },
    special_attack: { type: Number, required: true },
    special_defense: { type: Number, required: true },
  },
  sprites: {
    artwork: String,
    front: String,
    back: String,
  },
});

export default mongoose.model("Pokemon", pokemonSchema);
