const express = require("express");

const {
  addAllTasks,
  addNewTask,
  getAllTasks,
  updateTaskById,
  deleteTaskById,
} = require("../controllers/taskController");

const router = express.Router();

//POST REQUEST ROUTER(CREATE)
router.post(
  "/api",
  (req, res, next) => {
    console.log(`Request type : ${req.method}`);
    next();
  },
  addNewTask
);

//GET REQUEST ROUTER(READ)
router.get(
  "/api/:id",
  (req, res, next) => {
    if (req.params.id === "kanbanpublic") {
      console.log(`Request type : ${req.method}`);
    } else {
      console.log(req.params.id);
      res.send("Without public id you can not see the kanban board!...");
    }
    next();
  },
  getAllTasks
);

//PUT REQUEST ROUTER(UPDATE)
router.put(
  "/api",
  (req, res, next) => {
    console.log(`Request type : ${req.method}`);
    next();
  },
  updateTaskById
);

//DELETE REQUEST ROUTER(DELETE)
router.delete(
  "/api",
  (req, res, next) => {
    console.log(`Request type : ${req.method}`);
    next();
  },
  deleteTaskById
);

module.exports = router;
