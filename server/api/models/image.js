const mongoose = require("mongoose");

const imageSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  imagePath: { type: String, required: true },
  filename: { type: String, required: true }
});

module.exports = mongoose.model("Image", imageSchema);
