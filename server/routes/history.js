import express from "express";
import passport from "passport";
import {
  createHistory,
  deleteHistoryById,
  getHistoryByUser,
} from "../controllers/Hisotry.controler.js";
import passport from "passport";

const historyRouter = express.Router();

historyRouter.post("/create", createHistory);
historyRouter.get("/", getHistoryByUser);
historyRouter.delete("/delete/:id", deleteHistoryById);
export default historyRouter;
