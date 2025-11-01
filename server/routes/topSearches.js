import express from "express";
import { TopSearchFinder } from "../controllers/top.controller.js";

const TopSearchesRouter = express.Router();

TopSearchesRouter.get("/", TopSearchFinder);

export default TopSearchesRouter;
