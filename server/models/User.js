import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  avatar: {
    type: String,
    default:
      "https://www.pngall.com/wp-content/uploads/5/Profile-Avatar-PNG-High-Quality-Image.png",
  },
  password: {
    type: String,
  },
  provider: {
    type: String,
    required: true,
    enum: ["local", "google", "facebook", "github"],
  },
});

const User = mongoose.model("User", userSchema);
export default User;
