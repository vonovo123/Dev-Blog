import SanityService from "../../../services/SanityService";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({ error: "Method not allowed" });
  }
  try {
    const { category } = req.query;
    if (!category) {
      return res.status(400).json({ error: "category is required" });
    }
    const sanityService = new SanityService();
    const data = await sanityService.getSubCategory(category);
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to fetch subcategory" });
  }
}
