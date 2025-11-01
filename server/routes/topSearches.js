import express from "express";
import passport from "passport";
import { TopSearchFinder } from "../controllers/top.controller.js";
import { createSearchEntry } from "../controllers/search.controler.js";
import  passport from "passport";
const TopSearchesRouter = express.Router();

TopSearchesRouter.get("/", TopSearchFinder);
TopSearchesRouter.post("/create", createSearchEntry);


export default TopSearchesRouter;
