import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import SearchRouter from "./routes/search.js";
import authRouter from "./routes/auth.js";
import session from "express-session";
import passport from "passport";
import { connectDB } from "./config/dbConnect.js";
import TopSearchesRouter from "./routes/topSearches.js";
import historyRouter from "./routes/history.js";

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    name: "token",
    secret: process.env.SESSION_SECRET || "supersecret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // set true in production (HTTPS)
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days

    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.json({ message: "server is running " });
});

app.use("/search", SearchRouter);
app.use("/auth", authRouter);
app.use("/top" , TopSearchesRouter)
app.use("/history" , historyRouter)

console.log({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL,
});

app.listen(process.env.PORT || 3000, async () => {
  await connectDB();
  console.log(
    `Server is running on port http://localhost:${process.env.PORT || 3000}`
  );
});
