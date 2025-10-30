import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import ShareRouter from "./routes/search.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "server is running " });
});

app.use("/share" , ShareRouter)

app.listen(process.env.PORT || 3000, async () => {
  console.log(
    `Server is running on port http://localhost:${process.env.PORT || 3000}`
  );
});
