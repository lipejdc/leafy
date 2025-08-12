import dbConnect from "../../../db/connect";
import Plant from "@/db/models/Plant";

export default async function handler(request, response) {
  await dbConnect();
  if (request.method === "GET") {
    const page = parseInt(request.query.page, 10) || 1;
    const limit = parseInt(request.query.limit, 10) || 30;
    const skip = (page - 1) * limit;

    // Get filters from query
    const { lightNeed, waterNeed, search } = request.query;

    // Build MongoDB filter object
    const filter = {};
    if (lightNeed && lightNeed !== "All") filter.lightNeed = lightNeed;
    if (waterNeed && waterNeed !== "All") filter.waterNeed = waterNeed;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { botanicalName: { $regex: search, $options: "i" } },
      ];
    }

    // Fetch filtered and paginated plants
    const plants = await Plant.find(filter).skip(skip).limit(limit);
    const total = await Plant.countDocuments(filter);

    // Fetch all unique filter options from the database
    const allLightNeeds = await Plant.distinct("lightNeed");
    const allWaterNeeds = await Plant.distinct("waterNeed");

    return response.status(200).json({
      plants,
      total,
      page,
      totalPages: Math.ceil(total / limit),
      allLightNeeds: ["All", ...allLightNeeds],
      allWaterNeeds: ["All", ...allWaterNeeds],
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
