const express = require("express");
const app = express();
const PORT = 3000;
const boardRouter = require("./routes/board");

app.use(express.json());
app.use("/board", boardRouter);

app.get("/", (req, res) => {
  res.send("Hellod World");
});

app.listen(PORT, () => {
  console.log("Server is Running");
});
