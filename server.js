const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// TEMP TEST ROUTE
app.get("/", (req, res) => {
    res.send("Working 🚀");
});

// TEMP TASK ROUTE
app.get("/tasks", (req, res) => {
    res.json([{ text: "Test Task", done: false }]);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running"));