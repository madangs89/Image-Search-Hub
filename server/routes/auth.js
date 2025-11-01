import express from "express";
import passport from "passport";
import { authHandler } from "../controllers/auth.controller.js";

const authRouter = express.Router();

// ========== GOOGLE AUTH ==========
authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

authRouter.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/auth/failure" }),
  (req, res) => {
    console.log("✅ Logged in user (Google):", req.user);
    res.redirect(`${process.env.CLIENT_URL}/dashboard`);
  }
);

// ========== FACEBOOK AUTH ==========
authRouter.get(
  "/facebook",
  passport.authenticate("facebook", { scope: ["email", "public_profile"] })
);

authRouter.get(
  "/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/auth/failure" }),
  (req, res) => {
    console.log("✅ Logged in user (Facebook):", req.user);
    res.redirect(`${process.env.CLIENT_URL}/dashboard`);
  }
);

// ========== GITHUB AUTH ==========
authRouter.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

authRouter.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/auth/failure" }),
  (req, res) => {
    console.log("✅ Logged in user (GitHub):", req.user);
    res.redirect(`${process.env.CLIENT_URL}/dashboard`);
  }
);

// ========== FAILURE ROUTE ==========
authRouter.get("/failure", (req, res) => {
  console.log("❌ Authentication failed");
  res.redirect(`${process.env.CLIENT_URL}/failure`);
  // res.status(401).json({ success: false, message: "Authentication failed" });
});

// ========== STATUS ROUTE ==========
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
        user: null,
        message: "User is not authenticated",
      });
    }
  } catch (error) {
    console.error("Error fetching auth status:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ========== LOGOUT ROUTE ==========
authRouter.post("/logout", (req, res) => {
  try {
    req.logout((err) => {
      if (err) {
        return res
          .status(500)
          .json({ success: false, message: "Error during logout" });
      }

      req.session.destroy(() => {
        res.clearCookie("token");
        return res.json({
          success: true,
          message: "Logged out successfully",
        });
      });
    });
  } catch (error) {
    console.error("Unexpected error logging out:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

export default authRouter;
