import axios from "axios";
import SearchInputShow from "../models/Search.js";
export const TopSearchFinder = async (req, res) => {
  try {
    let userId = null;
    console.log(req.isAuthenticated(), "in create history");

    if (req.isAuthenticated()) {
      userId = req.user._id;
    }
    const topSearchData = await SearchInputShow.find()
      .sort({ searchCount: -1 })
      .sort({ createdAt: -1 })
      .limit(5);

    console.log(topSearchData);

    if (topSearchData.length == 0) {
      const data = await axios.get(
        `https://api.unsplash.com/search/photos?query=${"random"}&page=${"1"}&per_page=20`,
        {
          headers: {
            Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
          },
        }
      );
      return res.status(200).json({
        message: "Search results fetched successfully",
        success: true,
        topSearch: [],
        total: data.data.total,
        total_pages: data.data.total_pages,
        results: data.data.results,
        currentSearch: "top",
        topSearch: "Nature",
      });
    }
    const input = topSearchData[0].input;
    console.log(input);
    const page = 1;

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
      topSearch: topSearchData,
      total: data.data.total,
      total_pages: data.data.total_pages,
      results: data.data.results,
      currentSearch: "top",
      topSearch: input,
    });
  } catch (error) {
    console.log(error);

    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};
