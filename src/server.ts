import bodyParser from "body-parser";
import express from "express";
import path from "path";
import reload from "reload";
import { FAKE_TODOS_TABLE } from "./data/todos";

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.static("node_modules"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render(path.join(__dirname, "../src/views/index"));
});

app.get("/todos", (req, res) => {
  res.render(path.join(__dirname, "../src/views/todos"), {
    todos: FAKE_TODOS_TABLE,
  });
});

app.post("/todos/create", (req, res) => {
  const todo = req.body.todo;

  FAKE_TODOS_TABLE.push(todo);

  res.render(path.join(__dirname, "../src/views/todos"), {
    todos: [todo],
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

reload(app);
