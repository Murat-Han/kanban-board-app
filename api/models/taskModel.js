const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const taskSchema = new Schema({
  columnId: { type: Number, unique: false },
  id: { type: String, unique: false },
  title: String,
  text: String,
});

const Task = mongoose.model("tasks", taskSchema);

module.exports = Task;
