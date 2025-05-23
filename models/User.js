import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// ✅ Check if model already exists
export default mongoose.models.User || mongoose.model("User", userSchema);

