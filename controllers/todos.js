// controllers/todos.js
const jwt = require("jsonwebtoken");
const express = require("express");
const todosRouter = express.Router();
const Todo = require("../models/todo");
const User = require("../models/user");

const extractTokenFromRequest = (request) => {
  const authHeader = request.get("authorization");
  if (authHeader && authHeader.startsWith("Bearer ")) {
    return authHeader.replace("Bearer ", "");
  }
  return null;
};

todosRouter.get("/", async (req, res) => {
  const todos = await Todo.find({}).populate("user", { username: 1, name: 1 });
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
  const user = await User.findById(req.body.userId);
  if (!user) {
    return res.status(404).json({ error: "user not found" });
  }
  const ownerCheck = (await Todo.findById(req.params.id)).user;
  if (req.body.userId !== ownerCheck.toString()) {
    return res.status(401).json({ error: "unauthorized access" });
  }
  const todo = await Todo.findByIdAndRemove(req.params.id);
  if (todo) {
    res
      .status(200)
      .json({ message: `The todo [${todo.task}] removed successfully` });

    user.todos = user.todos.filter(
      (todo) => todo._id.toString() !== req.params.id
    );
    user.save();
  } else {
    res.status(404).json({ error: "The todo not found." });
  }
});

todosRouter.post("/", async (req, res) => {
  const { task, done } = req.body;

  const tokenPayload = jwt.verify(
    extractTokenFromRequest(req),
    process.env.PRIVATE_KEY
  );
  if (!tokenPayload.id) {
    return response.status(401).json({ error: "invalid token" });
  }
  // Find the user with the id in the token payload
  const user = await User.findById(tokenPayload.id);
  if (!user) {
    return res.status(404).json({ error: "user not found" });
  }

  // Create a new todo instance linked to the user
  const todo = new Todo({ task: task, done: done || false, user: user.id });
  // Save the todo to the database
  const savedTodo = await todo.save();
  // Update the user's todos array with the new todo's id
  user.todos = [...user.todos, savedTodo._id];
  // Save the updated user's information
  await user.save();
  // Respond with a 201 status code and the saved todo
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
