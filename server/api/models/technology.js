const mongoose = require("mongoose");

const technologySchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true, unique: true },
  logo: { type: String, required: true },
  type: {
    type: String,
    default: "others",
    enum: ["frontend", "backend", "others"]
  },
  slug: { type: String, required: true }
});

module.exports = mongoose.model("Technology", technologySchema);
