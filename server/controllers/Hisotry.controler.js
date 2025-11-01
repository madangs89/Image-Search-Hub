import passport from "passport";
import History from "../models/Hisotory.js";

export const createHistory = async (req, res) => {
  try {
    let userId = null;
    console.log(req.isAuthenticated(), "in create history");

    if (req.isAuthenticated()) {
      userId = req.user._id;
    }
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const { query } = req.body;
    if (!query) {
      return res.status(400).json({ success: false, message: "Missing query" });
    }

    const history = await History.create({
      userId: req.user._id,
      query,
    });

    if (!history) {
      return res
        .status(400)
        .json({ success: false, message: "Failed to create history" });
    }

    res.status(201).json({
      success: true,
      message: "History created",
      history,
    });
  } catch (error) {
    console.error("Error creating history:", error);
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

export const deleteHistoryById = async (req, res) => {
  try {
    const { id } = req.params;
    let userId = null;
    console.log(req.isAuthenticated());

    if (req.isAuthenticated()) {
      userId = req.user._id;
    }
    if (!userId) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized from delete" });
    }
    const oldHistory = await History.findById(id);
    if (!oldHistory) {
      return res
        .status(404)
        .json({ success: false, message: "History not found" });
    }
    if (oldHistory.userId.toString() != userId.toString()) {
      return res
        .status(401)
        .json({ success: false, message: "Not authorized" });
    }
    const history = await History.findByIdAndDelete(id);
    if (!history) {
      return res
        .status(404)
        .json({ success: false, message: "History not found" });
    }
    res.status(200).json({ success: true, message: "History deleted" });
  } catch (error) {
    console.error("Error deleting history:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
