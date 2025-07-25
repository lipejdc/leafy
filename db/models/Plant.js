import mongoose from "mongoose";

const plantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  botanicalName: { type: String, required: true },
  imageUrl: { type: String, required: true },
  waterNeed: { type: String },
  lightNeed: { type: String },
  fertiliserSeason: [{ type: String }],
  description: { type: String },
  isOwned: { type: Boolean, default: false },
});

const Plant = mongoose.models.Plant || mongoose.model("Plant", plantSchema);

export default Plant;
