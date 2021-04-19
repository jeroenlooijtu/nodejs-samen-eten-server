const http = require('http');
const express = require("express")
const app = express();
const importData = require("./data.json")

// const host = '127.0.0.1';
const port = process.env.PORT || 3000;


app.get("/", (req, res) => {
    res.send("Hello world XD");
});

app.get("/players", (req, res) => {
    res.send(importData);
});

app.get("/api/info", (req, res) => {
    res.send(importData)
})

app.listen(port, () => {
    console.log(`Listening on port http://HaHAHAHA:${port}`);
})