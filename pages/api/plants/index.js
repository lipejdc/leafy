import dbConnect from "../../../db/connect";
import Plant from "@/db/models/Plant";

export default async function handler(request, response) {
  await dbConnect();
  if (request.method === "GET") {
    // Parse pagination params, with defaults
    const page = parseInt(request.query.page, 10) || 1;
    const limit = parseInt(request.query.limit, 10) || 30;
    const skip = (page - 1) * limit;

    // Fetch paginated plants
    const plants = await Plant.find().skip(skip).limit(limit);

    // Get total count for frontend
    const total = await Plant.countDocuments();

    return response.status(200).json({
      plants,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
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
