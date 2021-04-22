const http = require('http');
const express = require("express")
const app = express();
const importData = require("./data.json")
const studenthomes = require("./studenthome.json");
const { stringify } = require('querystring');
var maxId = getmaxId();

function getmaxId(){
    let max = 0;
    studenthomes.forEach(home =>{
        if(parseInt(home.homeid) > max){
            max = home.homeid;
        }
    });
    max++;
    return max;
}

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
    console.log(`Listening on port http://localhost:${port}`);
})

app.post("/api/studenthome", (req, res) =>{
    console.log(maxId);
    var body = req.body;
    if(body){
        var keys = Object.keys(studenthomes[0]);
        console.log(keys);
        keys = keys.filter(key => key !== 'homeid');
        keys = keys.filter(key => key !== 'users')
        console.log(keys);
        keys.forEach(key => {
            console.log(key);
            if(!(body[key])){
                res.status(400).send('body wrong format');
            }
        });
        body = addToObject(body, "homeid", maxId.toString(), 0);
        // body["homeid"] = maxId.toString();
        body["users"] = [];
        maxId = maxId + 1;
        studenthomes.push(body);
        res.status(201).send('created home');
    }else{
        res.status(201).send('Didnt work lmao');
    }
})

app.get("/api/studenthome", (req, res) => {
    console.log(req.query);
    const { city } = req.query;
    const { name } = req.query;
    console.log(city);
    console.log(name);
    var post;
    var post2;
    res.status(200).send(studenthomes);
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

app.put("/api/studenthome/:homeId", (req, res) =>{
    console.log(req.params)
    const { homeId } = req.params;
    // let home = studenthomes.find((home) => home.homeid == homeid);
    let home = studenthomes.filter(home => {
        return home.homeid == homeId;
    })[0];
    const index = studenthomes.indexOf(home);
    const body = req.body;
    let keys = Object.keys(body)
    keys.forEach(key =>  {
        if(home[key]){
            home[key] = body[key];
        }
    });
    studenthomes[index] = home;
    // studenthomes.find((home) => home.homeid = homeid) = JSON.stringify(body);
    res.send(home);
})

app.put("/api/studenthome/:homeid/user", (req, res) =>{
    const { homeid } = req.params;
    var user = req.body;
    let keys = Object.keys(user);
    if(keys[0] == 'userid'){
        let index = studenthomes.findIndex((home) => home.homeid = homeid);
        let homeusers = studenthomes[index]["users"];
        let isdup = false;
        homeusers.forEach(homeuser => {
            if(homeuser["userid"] == user["userid"]){
                isdup = true;
            }
        });
        if(isdup == true){
            res.status(409).send('user already in home')
        }else{
            studenthomes[index]["users"].push(user);
            console.log(studenthomes[index]["users"]);
            res.status(200).send('added new user to home');
        }
    } else{
        res.status(400).send('wrong body format')
    }

})


var addToObject = function(obj, key, value, index){
    var temp ={};
    var i = 0;

    for(var prop in obj){
            if(i == index && key && value){
                temp[key] = value;
            }
            temp[prop] = obj[prop];
            i++;
    }
    if(!index && key && value){
        temp[key] = value;
    }
    return temp;
}
 