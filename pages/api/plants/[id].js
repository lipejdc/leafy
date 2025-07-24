import dbConnect from "@/db/connect";
import Plant from "@/db/models/Plant";

export default async function handler(req, res) {
  await dbConnect();
  const { id } = req.query;

  if (req.method === "GET") {
    const plant = await Plant.findById(id);

    if (!plant) return res.status(404).json({ message: "notfound" });

    return res.status(200).json(plant);
  } else if (req.method === "PUT") {
    const updatedPlant = await Plant.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedPlant) return res.status(404).json({ message: "notfound" });
    return res.status(200).json(updatedPlant);
  }

  return res.status(405).json({ message: "Method not allowed" });
}
