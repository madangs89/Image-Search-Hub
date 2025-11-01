import axios from "axios";
import SearchInputShow from "../models/Search.js";

export const SearchController = async (req, res) => {
  console.log("getting request");
  try {
    let userId = null;
    console.log(req.isAuthenticated(), "in create history");

    if (req.isAuthenticated()) {
      userId = req.user._id;
    }

    const { input, page = 1 } = req.query;
    if (!input) {
      return res
        .status(400)
        .json({ message: "Input is required", success: false });
    }
    // const isSearchFound = await SearchInputShow.findOne({ input: input });
    // if (!isSearchFound) {
    //   await SearchInputShow.create({ input: input });
    // } else {
    //   isSearchFound.searchCount += 1;
    //   await isSearchFound.save();
    // }
    const data = await axios.get(
      `https://api.unsplash.com/search/photos?query=${input}&page=${page}&per_page=20`,
      {
        headers: {
          Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
        },
      }
    );
    return res.status(200).json({
      message: "Search results fetched successfully",
      success: true,
      total: data.data.total,
      total_pages: data.data.total_pages,
      results: data.data.results,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

export const createSearchEntry = async (req, res) => {
  try {
    const { query } = req.body;
    console.log(query);

    const isSearchFound = await SearchInputShow.findOne({ input: query });
    if (!isSearchFound) {
      await SearchInputShow.create({ input: query });
    } else {
      isSearchFound.searchCount += 1;
      await isSearchFound.save();
    }
    console.log(isSearchFound);

    return res
      .status(200)
      .json({ message: "Search entry created successfully", success: true });
  } catch (error) {
    console.log(error);
  }
};
