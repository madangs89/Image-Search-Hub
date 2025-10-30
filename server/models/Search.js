import mongoose from "mongoose";

const searchInputShowSchema = new mongoose.Schema(
  {
    input: {
      type: String,
      required: true,
    },
    searchCount: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true }
);

const SearchInputShow = mongoose.model(
  "SearchInputShow",
  searchInputShowSchema
);
export default SearchInputShow;
