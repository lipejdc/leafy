import dbConnect from "../../../db/connect";
import Plant from "@/db/models/Plant";

export default async function handler(request, response) {
  await dbConnect();
  if (request.method === "GET") {
    const plants = await Plant.find();
    return response.status(200).json(plants);
  } else if (request.method === "POST") {
    const plantData = request.body;
    try {
      await Plant.create(plantData);
      return response.status(200).json({ message: "data added to db" });
    } catch (error) {
      response.status(500).json({ message: "Error creating plant." });
    }
  } else {
    return response.status(405).json({ message: "Method not allowed" });
  }
}
