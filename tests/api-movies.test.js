const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const apiTest = supertest(app);
const Movie = require("../models/movie");

const sampleMovies = [
  {
    title: "Sound of Freedom",
    watchList: true,
  },
  {
    title: "Elemental",
    watchList: false,
  },
];

beforeEach(async () => {
  await Movie.deleteMany({});
  await Movie.insertMany(sampleMovies);
});

describe("Movies API", () => {
  describe("GET /api/movies", () => {
    test("should return an array of movies", async () => {
      const response = await apiTest.get("/api/movies");
      expect(response.body).toBeInstanceOf(Array);
    });

    test("should have two movies in the array", async () => {
      const response = await apiTest.get("/api/movies");
      expect(response.body.length).toBe(2);
    });

    test("movies returned 200 Status Code", async () => {
      await apiTest.get("/api/movies").expect(200);
    });

    test("movies should return JSON", async () => {
      await apiTest.get("/api/movies").expect("content-type", /json/);
    });
  });

  describe("POST /api/movies", () => {
    test("should add a new movie with successful creation code (201)", async () => {
      const newMovie = {
        title: "New Movie",
        watchList: false,
      };

      const response = await apiTest.post("/api/movies").send(newMovie);
      expect(response.status).toBe(201);
    });

    test("should increase the number of movies by one after successful creation", async () => {
      const newMovie = {
        title: "New Movie",
        watchList: false,
      };

      const initialResponse = await apiTest.get("/api/movies");
      const initialNumberOfMovies = initialResponse.body.length;

      const response = await apiTest.post("/api/movies").send(newMovie);
      expect(response.status).toBe(201);

      const updatedResponse = await apiTest.get("/api/movies");
      const updatedNumberOfMovies = updatedResponse.body.length;

      expect(updatedNumberOfMovies).toBe(initialNumberOfMovies + 1);
    });

    test("should return the new movie with the correct title in the response", async () => {
      const newMovie = {
        title: "New Movie",
        watchList: false,
      };

      const response = await apiTest.post("/api/movies").send(newMovie);
      expect(response.status).toBe(201);
      expect(response.body.title).toBe(newMovie.title);
    });
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
