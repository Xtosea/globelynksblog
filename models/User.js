import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // hashed with bcrypt
  role: { type: String, default: "admin" }, // admin or publisher
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.User ||
  mongoose.model("User", UserSchema);