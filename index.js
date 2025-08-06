const express = require("express");
const app = express();
const PORT = 3000;
const charactersRouter = require("./routes/character");

app.use(express.json());
app.use("/char", charactersRouter);

app.get("/", (req, res) => {
  res.send("Hellod World");
});

app.listen(PORT, () => {
  console.log("Server is Running");
});
