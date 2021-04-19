const http = require('http');
const express = require("express")
const app = express();
const importData = require("./data.json")

// const host = '127.0.0.1';
const port = process.env.PORT || 3000;

const server = http.createServer((req, res) =>{

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(importData);
});

server.listen(port, () => {
    console.log(`server running at http://:${port}/`)
})