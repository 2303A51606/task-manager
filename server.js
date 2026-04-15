const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());

const FILE = "db.json";

// create db file if not exists
if (!fs.existsSync(FILE)) {
    fs.writeFileSync(FILE, JSON.stringify([]));
}

// test route
app.get("/", (req, res) => {
    res.send("API is running 🚀");
});

// GET tasks
app.get("/tasks", (req, res) => {
    try {
        const data = JSON.parse(fs.readFileSync(FILE));
        res.json(data);
    } catch (err) {
        res.json([]);
    }
});

// ADD task
app.post("/tasks", (req, res) => {
    const data = JSON.parse(fs.readFileSync(FILE));
    const newTask = {
        id: Date.now(),
        text: req.body.text,
        done: false
    };
    data.push(newTask);
    fs.writeFileSync(FILE, JSON.stringify(data));
    res.json(newTask);
});

// TOGGLE task
app.put("/tasks/:id", (req, res) => {
    let data = JSON.parse(fs.readFileSync(FILE));
    data = data.map(t =>
        t.id == req.params.id ? { ...t, done: !t.done } : t
    );
    fs.writeFileSync(FILE, JSON.stringify(data));
    res.json({ message: "updated" });
});

// DELETE task
app.delete("/tasks/:id", (req, res) => {
    let data = JSON.parse(fs.readFileSync(FILE));
    data = data.filter(t => t.id != req.params.id);
    fs.writeFileSync(FILE, JSON.stringify(data));
    res.json({ message: "deleted" });
});

// PORT FIX (important for Render)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running"));