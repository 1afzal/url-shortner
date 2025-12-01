import shortid from "shortid";
import urlModel from "../models/url.js";

async function createShortUrl(req, res) {
  const body = req.body;
  if (!body.url) {
    return res.send("body required");
  }
  const shortId = shortid.generate(); //create a short id
  await urlModel.create({
    shortId,
    longId: body.url,
    visitHistory: [],
  });
  res.status(200).json({
    id: shortId,
  });
}

async function redirectShortId(req, res) {
  try {
    console.log("Request parameters:", req.params);
    const shortId = req.params.shortId; // DEBUG: changed from req.params.id to req.params.shortId
    if (!shortId) {
      console.error("shortId missing in request");
      return res.status(400).json({
        message: "required shortId",
      });
    }
    console.log("Looking for shortId:", shortId);
    const entry = await urlModel.findOneAndUpdate(
      { shortId: shortId },
      { $push: { visitHistory: { timestamp: new Date() } } },
      { new: true }
    );
    if (!entry) {
      console.error("No entry found for shortId:", shortId);
      return res.status(404).json({
        message: "shortId not found",
      });
    }
    console.log("Redirecting to:", entry.longId);
    res.redirect(entry.longId);
  } catch (err) {
    console.error("Error in /:shortId route:", err);
    res.status(500).json({
      message: "Internal Server Error",
      error: err.message,
    });
  }
}

async function analytics(req, res) {
  const { shortId } = req.params;
  if (!shortId) {
    return res.status(400).json({ error: "shortId is required" });
  }
  try {
    const result = await urlModel.findOne({ shortId });
    if (!result) {
      return res.status(404).json({ error: "shortId not found" });
    }
    return res.status(200).json({
      clicks: result.visitHistory.length,
      analytics: result.visitHistory,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: err.message });
  }
}

export { createShortUrl, redirectShortId, analytics };
