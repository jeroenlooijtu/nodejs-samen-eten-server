//TODO:
//Invert if statements and remove else where possible
//Add file wrtiting to locally save changes and keep them on server restart
//Add counter and remove method te get maxId

let logger = require('tracer').console();
const importData = require("../../data.json");
let studenthomes = require("../../studenthome.json");

// can be replaced with counter value in json
const getmaxId = () => {
  let max = 0;
  studenthomes.studenthomes.forEach((home) => {
    if (parseInt(home.homeid) > max) {
      max = home.homeid;
    }
  });
  max++;
  return max;
}
let maxId = getmaxId();

//Info function to return info about the api
exports.getInfo = (req, res) => {
    logger.log("got request for info");
    res.status(200).json(importData);
};

// UC-201: Adds a new studenthome to the array
exports.create = function ({ body }, res) {
  logger.log(maxId);
  if (!body) {
    res.status(400).send("Didnt work lmao");
    return;
  }
  let keys = Object.keys(studenthomes.studenthomes[0]);
  logger.log(keys);
  keys = keys.filter((key) => key !== "homeid" && key !== "users");
  logger.log(keys);
  keys.forEach((key) => {
    logger.log(key);
    if (!body[key]) {
      res.status(400).send("body wrong format");
    }
  });
  body = addToObject(body, "homeid", maxId.toString(), 0);      //can be replaced
  // body["homeid"] = maxId.toString();
  body.users = [];
  maxId += 1;
  studenthomes.studenthomes.push(body);
  res.status(201).send(body);
};

// UC-202: Gets studenthomes, can filter on query parameters like name or city
exports.gethomes = function ({ query: { city, name } }, res) {
  logger.log(city);
  logger.log(name);
  let post;
  let post2;
  if (city || name) {
    if (name) {
      post = studenthomes.studenthomes.filter((post) => post.name.startsWith(name));
    }
    logger.log(post);
    if (city) {
      if (!post) {
        post2 = post.filter((post2) => post2.city == city);
      } else {
        post2 = studenthomes.studenthomes.filter((post2) => post2.city == city);
      }
    }
    if (!post2) {
      res.status(200).send(post2);
    } else if (post != null) {
      res.status(200).send(post);
    } else {
      res.status(404).send("Not Found");
    }
  } else {
    res.status(200).send(studenthomes.studenthomes);
  }
};

// UC-203: returns a specific studenthome based on the homeid
exports.getHomeById = function ({ params: { homeId } }, res) {
  const hometoreturn = studenthomes.studenthomes.find((home) => home.homeid == homeId);
  if (!hometoreturn) {
    res.status(404).send("Home doesn't exist");
    return;
  }
  res.status(200).json(hometoreturn);
};

// UC-204: updates a specific home based on homeid, wants a body with the values to be updates, doesnt update any value if the keys don't match

exports.updateHome = function (req, res) {
  logger.log(req.params);
  const { homeId } = req.params;
  // let home = studenthomes.find((home) => home.homeid == homeid);
  const home = studenthomes.studenthomes.filter((home) => home.homeid == homeId)[0];
  const index = studenthomes.studenthomes.indexOf(home);
  const { body } = req;
  const keys = Object.keys(body);
  keys.forEach((key) => {
    if (home[key]) {
      home[key] = body[key];
    }
  });
  studenthomes.studenthomes[index] = home;
  // studenthomes.find((home) => home.homeid = homeid) = JSON.stringify(body);
  res.send(home);
};

// UC-205: deletes a specific studenthome from the array based on the
exports.deleteHome = function (req, res) {
  const { homeId } = req.params;
  logger.log(homeId);
  const homeToDelete = studenthomes.studenthomes.find(
    (hometofind) => hometofind.homeid == homeId
  );
  if (!homeToDelete) {
    res.status(404).send("Home does not exist");
    return;
  }
  logger.log(homeToDelete.homeid);
  studenthomes.studenthomes = studenthomes.studenthomes.filter(
    (home) => home.homeid !== homeToDelete.homeid
  );
  res.status(200).json(homeToDelete);
};

// UC-206: Adds a user to a specific home, requires a body with a single value, userid
exports.addUserToHome = function (req, res) {
  const { homeId } = req.params;
  const user = req.body;
  if (!user) {
    res.status(400).send("no body found");
    return;
  }
    const keys = Object.keys(user);
    if (keys[0] == "userid" && keys.length == 1) {
      const index = studenthomes.studenthomes.findIndex((home) => home.homeid == homeId);
      const homeusers = studenthomes.studenthomes[index].users;
      let isdup = false;
      homeusers.forEach((homeuser) => {
        if (homeuser.userid == user.userid) {
          isdup = true;
        }
      });
      if (isdup == true) {
        res.status(409).send("user already in home");
      } else {
        studenthomes.studenthomes[index].users.push(user);
        logger.log(studenthomes.studenthomes[index].users);
        res.status(200).send("added new user to home");
      }
    } else {
      res.status(400).send("wrong body format");
    }
};

// method to add the homeid of a new studenthome at the beginning of the json object: can be deleted, not necesarry to parse json
var addToObject = function (obj, key, value, index) {
  const temp = {};
  let i = 0;

  for (const prop in obj) {
    if (i == index && key && value) {
      temp[key] = value;
    }
    temp[prop] = obj[prop];
    i++;
  }
  if (!index && key && value) {
    temp[key] = value;
  }
  return temp;
};
