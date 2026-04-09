const express = require("express");

const app = express();

app.get("/orders", (req, res) =>
  res.json([{ id: 1, item: "Laptop" }])
);

app.listen(3002);