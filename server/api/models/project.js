const mongoose = require("mongoose");

const projectSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  images: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Image", required: true }
  ],
  stack: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Technology", required: true }
  ],
  importance: { type: Number, default: 3 },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  slug: { type: String, required: true }
});

module.exports = mongoose.model("Project", projectSchema);
