const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const todoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  dueDate: { type: Date },
  category: { type: String },
  completedStatus: { type: Boolean, default: false }, // fixed typo
  user: { type: Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Todos", todoSchema);
