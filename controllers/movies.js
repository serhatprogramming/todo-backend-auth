// controllers/movies.js
const express = require("express");
const moviesRouter = express.Router();
const Movie = require("../models/movie");

moviesRouter.get("/", async (req, res) => {
  const movies = await Movie.find({});
  res.json(movies);
});

moviesRouter.get("/:id", async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  if (!movie) {
    res.status(404).json({ error: "Movie not found" });
  } else {
    res.json(movie);
  }
});

moviesRouter.delete("/:id", async (req, res) => {
  const movie = await Movie.findByIdAndRemove(req.params.id);
  if (movie) {
    res
      .status(200)
      .json({ message: `The movie [${movie.title}] removed successfully` });
  } else {
    res.status(404).json({ error: "The movie not found." });
  }
});

moviesRouter.post("/", async (req, res) => {
  const { title, watchList } = req.body;
  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }
  const movie = new Movie({ title: title, watchList: watchList || false });
  const savedMovie = await movie.save();
  res.status(201).json(savedMovie);
});

moviesRouter.put("/:id", async (req, res) => {
  const { title, watchList } = req.body;
  const updatedMovie = await Movie.findByIdAndUpdate(
    req.params.id,
    { title, watchList },
    { new: true, runValidators: true }
  );
  res.json(updatedMovie);
});

module.exports = moviesRouter;
