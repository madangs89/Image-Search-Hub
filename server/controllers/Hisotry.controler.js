import passport from "passport";
import History from "../models/Hisotory.js";

export const createHistory = async (req, res) => {
  try {
    let userId = null;
    if (req.isAuthenticated()) {
      userId = req.user._id;
    }
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const { query } = req.body;
    // Logic to create history entry

    const history = History.create({
      userId,
      query,
    });
    if (!history) {
      return res
        .status(400)
        .json({ success: false, message: "Failed to create history" });
    }
    res
      .status(201)
      .json({ success: true, message: "History created", history });
  } catch (error) {
    console.log(error);

    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getHistoryByUser = async (req, res) => {
  try {
    let userId = null;
    if (req.isAuthenticated()) {
      userId = req.user._id;
    }
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const history = await History.find({ userId }).sort({ createdAt: -1 });
    res
      .status(200)
      .json({ success: true, message: "History fetched", history });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
