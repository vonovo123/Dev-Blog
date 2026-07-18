import SanityService from "../../../services/SanityService";

export default async function handler(req, res) {
  const sanityService = new SanityService();
  try {
    if (req.method === "GET") {
      const { id, start = "0", end = "10" } = req.query;
      if (!id) {
        return res.status(400).json({ error: "id is required" });
      }
      const data = await sanityService.getCommentsById({
        id,
        start: Number(start),
        end: Number(end),
      });
      return res.status(200).json(data);
    }
    if (req.method === "POST") {
      const { id, slug, title, nickName, comment, createdAt } = req.body || {};
      if (!id || !nickName || !comment) {
        return res.status(400).json({ error: "Missing required fields" });
      }
      const data = await sanityService.setComment({
        id,
        slug,
        title,
        nickName,
        comment,
        createdAt: createdAt || new Date().toISOString(),
      });
      return res.status(201).json(data);
    }
    res.setHeader("Allow", ["GET", "POST"]);
    return res.status(405).json({ error: "Method not allowed" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Comment request failed" });
  }
}
