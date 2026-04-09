const express = require("express");
const app = express();

app.use(express.json());

// simulación DB distribuida
let primary = [{ id: 1, name: "Erick" }];
let replica = [{ id: 1, name: "Erick" }];

// GET normal
app.get("/users", (req, res) => {
  res.json(primary);
});

// POST (escritura + replicación)
app.post("/users", (req, res) => {
  const user = req.body;

  primary.push(user);

  // replicación
  replica = [...primary];

  res.json({
    message: "User added and replicated",
    primary,
    replica
  });
});

// ENDPOINT PRO 🔥
app.get("/users-db", (req, res) => {
  res.json({
    primary,
    replica
  });
});

app.listen(3001, () => console.log("users service running"));