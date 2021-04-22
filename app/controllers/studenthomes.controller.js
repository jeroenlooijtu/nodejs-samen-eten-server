const http = require('http');
const express = require("express")
const app = express();
const importData = require("../../data.json")
var studenthomes = require("../../studenthome.json");
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
};

//UC-201: Adds a new studenthome to the array
exports.create = function(req, res){
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
        res.status(201).send(body);
    }else{
        res.status(201).send('Didnt work lmao');
    }
};

//UC-202: Gets studenthomes, can filter on query parameters like name or city
exports.gethomes = function(req, res){
    console.log(req.query);
    const { city } = req.query;
    const { name } = req.query;
    console.log(city);
    console.log(name);
    var post;
    var post2;
    if(city || name){
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
    }} else {
        res.status(200).send(studenthomes);
    }
};

//UC-203: returns a specific studenthome based on the homeid
exports.getHomeById = function(req, res){
    const { homeId } = req.params;
    let hometoreturn = studenthomes.find((home) => home.homeid == homeId);
    if(hometoreturn){
        res.status(200).json(hometoreturn);
    } else{
        res.status(404).send('Home doesn\'t exist')
    }
};

//UC-204: updates a specific home based on homeid, wants a body with the values to be updates, doesnt update any value if the keys don't match

exports.updateHome = function(req, res){
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
};

//UC-205: deletes a specific studenthome from the array based on the
exports.deleteHome = function(req, res){
    const { homeId} = req.params;
    let homeToDelete = studenthomes.find((hometofind) => hometofind.homeid == homeId);
    if(homeToDelete !== null){
        console.log(homeToDelete.homeid);
        studenthomes = studenthomes.filter((home) => home.homeid !== homeToDelete.homeid);
        res.status(200).json(homeToDelete);
    }else{
        res.status(404).send('Home does not exist');
    }
};

//UC-206: Adds a user to a specific home, requires a body with a single value, userid
exports.addUserToHome = function(req,res){
    const { homeId } = req.params;
    var user = req.body;
    let keys = Object.keys(user);
    if(keys[0] == 'userid' && keys.length == 1){
        let index = studenthomes.findIndex((home) => home.homeid == homeId);
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
};

//method to add the homeid of a new studenthome at the beginning of the json object
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
};