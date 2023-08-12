const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const apiTest = supertest(app);
const Todo = require("../models/todo");

const sampleTodos = [
  {
    task: "Grocery Shopping",
    done: true,
  },
  {
    task: "Restaurant Reservation",
    done: false,
  },
];

beforeEach(async () => {
  await Todo.deleteMany({});
  await Todo.insertMany(sampleTodos);
});

describe("Todos API", () => {
  describe("GET /api/todos", () => {
    test("should return an array of todos", async () => {
      const response = await apiTest.get("/api/todos");
      expect(response.body).toBeInstanceOf(Array);
    });

    test("should have two todos in the array", async () => {
      const response = await apiTest.get("/api/todos");
      expect(response.body.length).toBe(2);
    });

    test("todos returned 200 Status Code", async () => {
      await apiTest.get("/api/todos").expect(200);
    });

    test("todos should return JSON", async () => {
      await apiTest.get("/api/todos").expect("content-type", /json/);
    });
  });

  describe("POST /api/todos", () => {
    test("should add a new todo with successful creation code (201)", async () => {
      const newTodo = {
        task: "New Task",
        done: false,
      };

      const response = await apiTest.post("/api/todos").send(newTodo);
      expect(response.status).toBe(201);
    });

    test("should increase the number of todos by one after successful creation", async () => {
      const newTodo = {
        task: "New Task",
        done: false,
      };

      const initialResponse = await apiTest.get("/api/todos");
      const initialNumberOfTodos = initialResponse.body.length;

      const response = await apiTest.post("/api/todos").send(newTodo);
      expect(response.status).toBe(201);

      const updatedResponse = await apiTest.get("/api/todos");
      const updatedNumberOfTodos = updatedResponse.body.length;

      expect(updatedNumberOfTodos).toBe(initialNumberOfTodos + 1);
    });

    test("should return the new todo with the correct task in the response", async () => {
      const newTodo = {
        task: "New Task",
        done: false,
      };

      const response = await apiTest.post("/api/todos").send(newTodo);
      expect(response.status).toBe(201);
      expect(response.body.task).toBe(newTodo.task);
    });
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
