import mongoose from "mongoose";
const Schema = mongoose.Schema;

const fightSchema = new Schema({
  date: { type: Date, default: new Date() },
  player_one: { type: String, required: true },
  player_two: { type: String, default: "CPU" },
});

export default mongoose.model("Fight", fightSchema);
