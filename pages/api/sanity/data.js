import SanityService from "../../../services/SanityService";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({ error: "Method not allowed" });
  }
  try {
    const { type, category, subCategory } = req.query;
    const sanityService = new SanityService();
    const data = await sanityService.getData({
      type: type || null,
      category: category || null,
      subCategory: subCategory || null,
      light: true,
    });
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to fetch data" });
  }
}
