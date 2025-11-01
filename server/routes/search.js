import express from "express";
import passport from "passport";
import { SearchController } from "../controllers/search.controler.js";

const SearchRouter = express.Router();

SearchRouter.get("/", SearchController);
export default SearchRouter;
