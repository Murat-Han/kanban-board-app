const Task = require("../models/taskModel");
const mongoose = require("mongoose");

//WRITE ALL TASKS TO DATABASE
// const addAllTasks = async (req, res) => {
//   const allTasks = req.body;
//   try {
//     Task.create(allTasks, (err, data) => {
//       if (err) {
//         res.send(err);
//       } else {
//         res.send(data);
//       }
//     });
//   } catch (error) {
//     console.error(error);
//   }
// };

//CREATE TASK TO DATABASE
const addNewTask = async (req, res) => {
  try {
    let newTask = new Task();
    newTask.id = req.body.id;
    newTask.columnId = req.body.columnId;
    newTask.title = req.body.title;
    newTask.text = req.body.text;
    const task = await newTask.save();
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json(error);
  }
};

//READ TASKS FROM DATABASE
const getAllTasks = async (req, res) => {
  try {
    Task.find({}, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json(data);
      }
    });
  } catch (error) {
    console.log(error);
  }
};
//UPDATE TASKS TO DATABASE
const updateTaskById = async (req, res) => {
  try {
    const update = await Task.findOneAndUpdate(
      { id: req.body.id },
      {
        columnId: req.body.columnId,
        title: req.body.title,
        text: req.body.text,
      },
      {
        new: true,
      }
    );
    res.status(200).send(update);
  } catch (error) {
    console.log(error);
  }
};

//DELETE TASKS FROM DATABASE
const deleteTaskById = async (req, res) => {
  try {
    let id = mongoose.Types.ObjectId(req.body.id);
    console.log(id.toString());
    const deleted = await Task.findByIdAndDelete({ _id: id.toString() });
    res.status(200).json(deleted);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllTasks,
  addNewTask,
  updateTaskById,
  deleteTaskById,
};
