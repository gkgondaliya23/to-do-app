const express = require("express");
const taskRoutes = express.Router();
const authMiddleware = require("../helpers/authenticated");
const {
  addNewTask,
  getTask,
  removeTask,
} = require("../controller/task.controller");

taskRoutes.get("/", authMiddleware.isAuthenticated, getTask);

taskRoutes.post("/addtask", authMiddleware.isAuthenticated, addNewTask);

taskRoutes.post("/removetask", authMiddleware.isAuthenticated, removeTask);

module.exports = taskRoutes;
