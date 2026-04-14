import mongoose from "mongoose";

const MemberSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  plan: String,
  startDate: String,
  expiryDate: String,
});

export default mongoose.models.Member ||
  mongoose.model("Member", MemberSchema);