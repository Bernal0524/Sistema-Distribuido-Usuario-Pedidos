const express = require("express");
const axios = require("axios");

const app = express();

app.use(express.json());

// USERS
app.get("/users", async (req, res) => {
  try {
    const r = await axios.get("http://users-service:3001/users");
    res.json(r.data);
  } catch (e) {
    res.status(500).json({ error: "users error" });
  }
});

// 👇 NUEVO ENDPOINT (CLAVE)
app.get("/users-db", async (req, res) => {
  try {
    const r = await axios.get("http://users-service:3001/users-db");
    res.json(r.data);
  } catch (e) {
    res.status(500).json({ error: "users-db error" });
  }
});

// POST USERS
app.post("/users", async (req, res) => {
  try {
    const r = await axios.post("http://users-service:3001/users", req.body);
    res.json(r.data);
  } catch (e) {
    res.status(500).json({ error: "post users error" });
  }
});

// ORDERS
app.get("/orders", async (req, res) => {
  try {
    const r = await axios.get("http://orders-service:3002/orders");
    res.json(r.data);
  } catch (e) {
    res.status(500).json({ error: "orders error" });
  }
});

app.listen(3000, () => console.log("api running"));