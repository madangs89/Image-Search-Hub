import mongoose from "mongoose";

const searchInputShowSchema = new mongoose.Schema(
  {
    input: {
      type: String,
      unique: true,
      trim: true,
      index: true,
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
