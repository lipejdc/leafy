import dbConnect from "@/db/connect";
import Plant from "@/db/models/Plant";
import DailyPlant from "@/db/models/DailyPlant";

export default async function handler(req, res) {
  await dbConnect();

  const today = new Date().toISOString().slice(0, 10);

  if (req.method === "GET") {
    //Check if today's plant exists
    let daily = await DailyPlant.findOne({ date: today }).populate("plant");

    if (daily) {
      return res.status(200).json(daily.plant);
    }

     //If not, pick a random plant from the collection
    const count = await Plant.countDocuments();
    const random = Math.floor(Math.random() * count);
    const randomPlant = await Plant.findOne().skip(random);

    if (!randomPlant) {
      return res.status(404).json({ message: "No plants found" });
    }
    //Save the plant for today
    daily = new DailyPlant({ date: today, plant: randomPlant._id });
    await daily.save();

    return res.status(200).json(randomPlant);
  }

  if (req.method === "DELETE") {
    //Delete today's cached plant so next GET picks a new one
    await DailyPlant.deleteOne({ date: today });
    return res.status(200).json({ message: "Today's plant reset." });
  }

  return res.status(405).json({ message: "Method not allowed" });
}
