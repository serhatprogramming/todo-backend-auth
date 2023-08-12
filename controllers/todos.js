// controllers/todos.js
const express = require("express");
const todosRouter = express.Router();
const Todo = require("../models/todo");

todosRouter.get("/", async (req, res) => {
  const todos = await Todo.find({});
  res.json(todos);
});

todosRouter.get("/:id", async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  if (!todo) {
    res.status(404).json({ error: "Todo not found" });
  } else {
    res.json(todo);
  }
});

todosRouter.delete("/:id", async (req, res) => {
  const todo = await Todo.findByIdAndRemove(req.params.id);
  if (todo) {
    res
      .status(200)
      .json({ message: `The todo [${todo.task}] removed successfully` });
  } else {
    res.status(404).json({ error: "The todo not found." });
  }
});

todosRouter.post("/", async (req, res) => {
  const { task, done } = req.body;
  if (!task) {
    return res.status(400).json({ error: "task is required" });
  }
  const todo = new Todo({ task: task, done: done || false });
  const savedTodo = await todo.save();
  res.status(201).json(savedTodo);
});

todosRouter.put("/:id", async (req, res) => {
  const { task, done } = req.body;
  const updatedTodo = await Todo.findByIdAndUpdate(
    req.params.id,
    { task, done },
    { new: true, runValidators: true }
  );
  res.json(updatedTodo);
});

module.exports = todosRouter;
