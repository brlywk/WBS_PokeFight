import mongoose from "mongoose";
const Schema = mongoose.Schema;

const roundSchema = new Schema({
  round: { type: Number, required: true },
  player_one_action: { type: String, required: true },
  player_one_damage_taken: { type: Number, required: true },
  player_two_action: { type: String, required: true },
  player_two_damage_taken: { type: Number, required: true },
  player_one_hp_left: { type: Number, required: true },
  player_two_hp_left: { type: Number, required: true },
});

const fightSchema = new Schema(
  {
    winner: { type: String, required: true },
    player_one_name: { type: String, required: true },
    player_two_name: { type: String, default: "CPU" },
    player_one_pokemon_id: { type: Number, required: true },
    player_two_pokemon_id: { type: Number, required: true },
    rounds: { type: [roundSchema], required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Fight", fightSchema);
