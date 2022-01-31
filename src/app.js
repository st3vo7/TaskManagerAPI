const express = require("express");
require("./db/mongoose"); // don't require anything specifically. Make sure it runs and connects correctly.
const UserRouter = require("./routers/user");
const TaskRouter = require("./routers/task");

const app = express();

app.use(express.json()); // parse json sent from the client
app.use(UserRouter);
app.use(TaskRouter);

module.exports = app

