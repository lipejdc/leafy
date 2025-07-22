import dbConnect from "../../../db/connect";
import Plant from "@/db/models/Plant";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const plants = await Plant.find();
    console.log("Fetched plants:", plants);
    return response.status(200).json(plants);
  } else {
    return response.status(405).json({ message: "Method not allowed" });
  }
}
