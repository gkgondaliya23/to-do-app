const Task = require("../model/task.model");
const mongoose = require("mongoose");

exports.addNewTask = async (req, res) => {
  try {
    let user = req.user;
    let newTask = await Task.create({
      user: user._id,
      description: req.body.description,
    });
    newTask.save();
    user.tasks.push(newTask._id);
    user.save();
    res.redirect("/task/");
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getTask = async (req, res) => {
  try {
    let task = await Task.find({ user: req.user._id, isComplete: false });
    let complete = await Task.find({ user: req.user._id, isComplete: true });
    res.render("task", { user: req.user, task: task, complete: complete });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.removeTask = async (req, res) => {
  try {
    const selectedTasks = req.body.check;
    console.log(selectedTasks);

    if (Array.isArray(selectedTasks)) {
      const objectIds = selectedTasks.map(
        (taskId) => new mongoose.Types.ObjectId(taskId)
      );
      await Task.updateMany({ _id: { $in: objectIds } }, { isComplete: true });
    } else if (selectedTasks) {
      const objectId = new mongoose.Types.ObjectId(selectedTasks);
      await Task.findOneAndUpdate({ _id: objectId }, { isComplete: true });
    }
    res.redirect("/task/");
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};
