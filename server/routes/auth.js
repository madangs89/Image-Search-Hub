import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { authHandler } from "../controllers/auth.controler.js";
import passport from "passport";
const authRouter = express.Router();
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/User.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({
          provider: "google",
          email: profile.emails[0].value,
        });

        // 2. If not, create a new one
        if (!user) {
          user = await User.create({
            userName: profile.displayName,
            email: profile.emails[0].value,
            avatar: profile.photos[0].value,
            provider: "google",
          });
        }

        // 3. Continue the login
        return done(null, user);
      } catch (error) {
        console.error("Error during Google authentication:", error);
        return done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user._id); // store only user ID
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user); // attach user object to req.user
  } catch (err) {
    done(err, null);
  }
});

authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

authRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/auth/failure",
  }),
  (req, res) => {
    console.log("✅ Logged in user:", req.user);
    res.redirect("http://localhost:5173/dashboard");
  }
);

authRouter.get("/failure", (req, res) => {
  res.status(401).send("Authentication failed. Please try again.");
  res.redirect("http://localhost:5173/auth-failure");
});
authRouter.get("/status", (req, res) => {
  try {
    if (req.isAuthenticated()) {
      res.json({
        authenticated: true,
        user: req.user,
        message: "User is authenticated",
      });
    } else {
      res.json({
        authenticated: false,
        message: "User is not authenticated",
        user: null,
      });
    }
  } catch (error) {
    console.error("Error fetching auth status:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

authRouter.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    req.session.destroy(() => {
      res.clearCookie("token");
      res.json({ message: "Logged out successfully" });
    });
  });
});

export default authRouter;
