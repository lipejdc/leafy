import dbConnect from "@/db/connect";
import Plant from "@/db/models/Plant.js";

export default async function handler(request, response) {
  try {
    await dbConnect();
    const { id } = request.query;
    if (request.method === "GET") {
      const plant = await Plant.findById(id);

      if (!plant) {
        return response.status(404).json({ status: "No Plant found!" });
      }
      return response.status(200).json(plant);
    }

    return response.status(405).json({ status: "Method not allowed!" });
  } catch (error) {
    return response.status(500).json({
      status: "Server error",
      error: error.message,
    });
  }
}
