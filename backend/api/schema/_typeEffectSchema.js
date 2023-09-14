import mongoose from "mongoose";
const Schema = mongoose.Schema;

const typeEffectSchema = new Schema({
  type: { type: String, required: true },
  not_effective: { type: [String], require: true },
  no_effect: { type: [String], require: true },
  super_effective: { type: [String], require: true },
});

export default mongoose.model("type_effect", typeEffectSchema);
