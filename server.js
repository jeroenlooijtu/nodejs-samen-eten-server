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
    if(body){
        studenthomes.push(body);
        res.status(201).send('created home');
    }
    res.status(201).send('Didnt work lmao');
})

app.get("/api/studenthome", (req, res) => {
    console.log(req.query);
    const { city } = req.query;
    const { name } = req.query;
    console.log(city);
    console.log(name);
    var post;
    var post2;
    if(name) {
        post = studenthomes.filter((post) => post.name.startsWith(name));
        
    }
    console.log(post);
    if(city){
        if(post != null){
            post2 = post.filter((post2) => post2.city == city);
        }else{
            post2 = studenthomes.filter((post2) => post2.city == city);
        }
    }
    if(post2 != null){
        res.status(200).send(post2);
    }else{
        if(post != null){
            res.status(200).send(post);
        } else{
            res.status(404).send('Not Found');
        }
    }
})

app.put("/api/studenthome/:homeid", (req, res) =>{
    console.log(req.params)
    const { homeid } = req.params;
    const home = studenthomes.find(homeid);
    const body = req.body;
    home.name = body.name;
    home.city = body.city;
    home.number = body.number;
    home.phonenumber = body.phonenumber;
    home.streetname = body.streetname;
    home.zipcode = body.zipcode;
    res.send('you did it, great job wow')
})
 