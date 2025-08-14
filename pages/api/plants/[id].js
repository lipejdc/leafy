import dbConnect from "@/db/connect";
import Plant from "@/db/models/Plant";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  await dbConnect();
  const { id } = req.query;

  //Get current logged-in user
  const session = await getSession({ req });
  if (!session) return res.status(401).json({ message: "Unauthorized" });
  const userId = session.user.id;

  if (req.method === "GET") {
    const plant = await Plant.findById(id);
    if (!plant) return res.status(404).json({ message: "notfound" });
    return res.status(200).json(plant);
  } 
  else if (req.method === "DELETE") {
    try {
      await Plant.findByIdAndDelete(id);
      res.status(200).json({ message: `Plant with id ${id} deleted.` });
    } catch (error) {
      res.status(500).json({ message: "Error deleting plant." });
    }
  } 
  else if (req.method === "PUT") {
    try {
      const { isOwned } = req.body;

      const plant = await Plant.findById(id);
      if (!plant) return res.status(404).json({ message: "notfound" });

      if (isOwned) {
        //Add user to ownedBy if not already present
        if (!plant.ownedBy.includes(userId)) plant.ownedBy.push(userId);
      } else {
        //Remove user from ownedBy
        plant.ownedBy = plant.ownedBy.filter(uid => uid.toString() !== userId);
      }

      await plant.save();
      return res.status(200).json(plant);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error updating plant ownership." });
    }
  }

  return res.status(405).json({ message: "Method not allowed" });
}
