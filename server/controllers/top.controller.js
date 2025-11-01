import axios from "axios";
import SearchInputShow from "../models/Search.js";
export const TopSearchFinder = async (req, res) => {
  try {
    const topSearchData = await SearchInputShow.find()
      .sort({ searchCount: -1 })
      .limit(1);

    console.log(topSearchData);

    if (topSearchData.length === 0) {
      const data = await axios.get(
        `https://api.unsplash.com/search/photos?query=${"nature"}&page=${"1"}&per_page=20`,
        {
          headers: {
            Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
          },
        }
      );
      console.log(data.data);
      return res.status(200).json({
        message: "Search results fetched successfully",
        success: true,
        topSearch: [],
        total: data.data.total,
        total_pages: data.data.total_pages,
        results: data.data.results,
      });
    }
    const input = topSearchData[0].input;
    const data = await axios.get(
      `https://api.unsplash.com/search/photos?query=${input}&page=${page}&per_page=20`,
      {
        headers: {
          Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
        },
      }
    );
    console.log(data.data);
    return res.status(200).json({
      message: "Search results fetched successfully",
      success: true,
      topSearch: topSearchData,
      total: data.data.total,
      total_pages: data.data.total_pages,
      results: data.data.results,
    });
  } catch (error) {
    console.log(error);

    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};
