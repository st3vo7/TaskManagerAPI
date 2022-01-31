const request = require("supertest");
const Task = require("../src/models/task");
const app = require("../src/app");
const {
  userOneId,
  userOne,
  setupDatabase,
  userTwoId,
  userTwo,
  taskOne,
  taskTwo,
  taskThree,
} = require("./fixtures/db");
jest.useRealTimers();

beforeEach(setupDatabase);

test("Should create taks for user", async () => {
  const response = await request(app)
    .post("/tasks")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({
      description: "From my test.",
    })
    .expect(201);
  const task = await Task.findById(response.body._id);
  expect(task).not.toBeNull();
  expect(task.completed).toEqual(false);
});

test("Should get tasks for userOne", async () => {
  const response = await request(app)
    .get("/tasks")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
  expect(response.body.length).toEqual(2);
});

test("Should not delete task for different user", async () => {
  await request(app)
    .delete(`/tasks/${taskOne._id}`)
    .set("Authorization", `Bearer ${userTwo.tokens[0].token}`)
    .send()
    .expect(404);

  const task = Task.findById(taskOne._id);
  expect(task).not.toBeNull();
});
