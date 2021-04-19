const http = require('http');
const express = require("express")
const app = express();
const importData = require("./data.json")
const studenthomes = require("./studenthome.json")

// const host = '127.0.0.1';
const port = process.env.PORT || 3000;
app.use(express.json());


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

app.post("/api/studenthome", (req, res) =>{
    const body = req.body;
    
})

app.get("/api//studenthome", (req, res) => {
    console.log(req.query);
    const { city } = req.query;
    const { name } = req.query;
    if(city) {
        const post = studenthomes.find((post) => post.city == city);
        
    }
    if(name){
        const post2 = post.find((post2) => post2.name == name);
    }
    if(post2){
        res.status(200).send(post2);
    }else{
        if(post){
            res.status(200).send(post);
        } else{
            res.status(404).send('Not Found');
        }
    }

})
 