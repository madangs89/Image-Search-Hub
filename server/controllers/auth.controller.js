import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as FacebookStrategy } from "passport-facebook";
import { Strategy as GitHubStrategy } from "passport-github2";
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config();

// ========== GOOGLE STRATEGY ==========
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;

        let user = await User.findOne({ email });

        if (user) {
          if (user.provider !== "google") {
            user.provider = "google";
            user.avatar = profile.photos[0].value;
            user.userName = profile.displayName;
            await user.save();
          }
        } else {
          user = await User.create({
            userName: profile.displayName,
            email,
            avatar: profile.photos[0].value,
            provider: "google",
          });
        }

        return done(null, user);
      } catch (error) {
        console.error("Error during Google authentication:", error);
        return done(error);
      }
    }
  )
);

// ========== FACEBOOK STRATEGY ==========
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: process.env.FACEBOOK_CALLBACK_URL,
      profileFields: ["id", "displayName", "photos", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const fbEmail =
          profile.emails && profile.emails[0] && profile.emails[0].value;
        const email = fbEmail || `${profile.id}@facebook.com`;

        let user = await User.findOne({ email });

        if (user) {
          if (user.provider !== "facebook") {
            user.provider = "facebook";
            user.avatar = profile.photos?.[0]?.value;
            user.userName = profile.displayName || `FBUser_${profile.id}`;
            user.facebookId = profile.id;
            await user.save();
          }
        } else {
          user = await User.create({
            userName: profile.displayName || `FBUser_${profile.id}`,
            email,
            avatar: profile.photos?.[0]?.value,
            provider: "facebook",
            facebookId: profile.id,
          });
        }

        return done(null, user);
      } catch (error) {
        console.error("Error during Facebook authentication:", error);
        return done(error);
      }
    }
  )
);

// ========== GITHUB STRATEGY ==========
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
      scope: ["user:email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email =
          (profile.emails && profile.emails[0]?.value) ||
          `${profile.username}@github.com`;

        let user = await User.findOne({ email });

        if (user) {
          if (user.provider !== "github") {
            user.provider = "github";
            user.avatar = profile.photos?.[0]?.value;
            user.userName = profile.displayName || profile.username;
            user.githubId = profile.id;
            await user.save();
          }
        } else {
          user = await User.create({
            userName: profile.displayName || profile.username,
            email,
            avatar: profile.photos?.[0]?.value,
            provider: "github",
            githubId: profile.id,
          });
        }

        return done(null, user);
      } catch (error) {
        console.error("Error during GitHub authentication:", error);
        return done(error);
      }
    }
  )
);

// ========== SESSION SERIALIZATION ==========
passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

export const authHandler = passport;
