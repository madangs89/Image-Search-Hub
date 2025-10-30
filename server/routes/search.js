import express from "express";
import { SearchController } from "../controllers/search.controler.js";

const ShareRouter = express.Router();

ShareRouter.get("/", SearchController);
export default ShareRouter;
