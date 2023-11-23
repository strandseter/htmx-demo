import bodyParser from "body-parser";
import express from "express";
import path from "path";
import reload from "reload";

export const FAKE_TODOS_TABLE: string[] = [];
export let FAKE_BIRTH_DATE_TABLE: string | null = null;

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.static("node_modules"));

app.use(bodyParser.urlencoded({ extended: true }));

// TODOS EXAMPLE

// Page
app.get("/my-todos-example", (req, res) => {
  res.render(path.join(__dirname, "../src/views/todo/index"));
});

// API
app.get("/todos", (req, res) => {
  res.render(path.join(__dirname, "../src/views/todo/todos"), {
    todos: FAKE_TODOS_TABLE,
  });
});

// API
app.post("/todos/create", async (req, res) => {
  const todo = req.body.todo;

  // Fake timeout
  await new Promise((resolve) => setTimeout(resolve, 2000));

  FAKE_TODOS_TABLE.unshift(todo);

  res.render(path.join(__dirname, "../src/views/todo/todos"), {
    todos: [todo],
  });
});

// END TODOS EXAMPLE

// COMPLEX STATE EXAMPLE

// Page
app.get("/state-example", (req, res) => {
  res.render(path.join(__dirname, "../src/views/state/index"));
});

// API
app.put("/state/age", (req, res) => {
  // Find birth date by age
  const age = req.body.age;

  const birthDate = new Date();
  birthDate.setFullYear(birthDate.getFullYear() - age);

  const day = birthDate.getDate();
  const month = birthDate.getMonth() + 1;
  const year = birthDate.getFullYear();

  const formattedBirthDate = `${day}.${month}.${year}`;

  FAKE_BIRTH_DATE_TABLE = formattedBirthDate;

  res.render(path.join(__dirname, "../src/views/state/birth-date"), {
    birthDate: formattedBirthDate,
  });
});

// API
app.get("/state/birth-date", (req, res) => {
  res.render(path.join(__dirname, "../src/views/state/birth-date"), {
    birthDate: FAKE_BIRTH_DATE_TABLE ?? "No age provided",
  });
});

// END COMPLEX STATE EXAMPLE

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

reload(app);
