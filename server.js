const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());

const FILE = "db.json";

if (!fs.existsSync(FILE)) {
    fs.writeFileSync(FILE, JSON.stringify([]));
}

app.get("/tasks", (req, res) => {
    const data = JSON.parse(fs.readFileSync(FILE));
    res.json(data);
});

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

app.put("/tasks/:id", (req, res) => {
    let data = JSON.parse(fs.readFileSync(FILE));
    data = data.map(t =>
        t.id == req.params.id ? { ...t, done: !t.done } : t
    );
    fs.writeFileSync(FILE, JSON.stringify(data));
    res.json({ message: "updated" });
});

app.delete("/tasks/:id", (req, res) => {
    let data = JSON.parse(fs.readFileSync(FILE));
    data = data.filter(t => t.id != req.params.id);
    fs.writeFileSync(FILE, JSON.stringify(data));
    res.json({ message: "deleted" });
});

app.listen(5000, () => console.log("Server running on port 5000"));