import mongoose from "mongoose";

const dailyPlantSchema = new mongoose.Schema({
  date: { type: String, required: true, unique: true },
  plant: { type: mongoose.Schema.Types.ObjectId, ref: "Plant", required: true },
});

const DailyPlant = mongoose.models.DailyPlant || mongoose.model("DailyPlant", dailyPlantSchema);

export default DailyPlant;
