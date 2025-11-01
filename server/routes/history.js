import express from "express";
import { createHistory, getHistoryByUser } from "../controllers/Hisotry.controler.js";


const historyRouter = express.Router();

historyRouter.post("/create", createHistory);
historyRouter.get("/", getHistoryByUser);

export default historyRouter;
