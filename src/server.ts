import express from "express";
import path from "path";

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.static("node_modules"));

app.get("/", (req, res) => {
  res.render(path.join(__dirname, "../src/views/index"));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
