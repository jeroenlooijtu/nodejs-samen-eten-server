
const studenthomes = require("../controllers/studenthomes.controller.js");

module.exports = (app) => {

  app.post("/api/studenthome", studenthomes.create);

  app.get("/api/studenthome", studenthomes.gethomes);

  app.get("/api/studenthome/:homeId", studenthomes.getHomeById);

  app.put("/api/studenthome/:homeId", studenthomes.updateHome);

  app.delete("/api/studenthome/:homeId", studenthomes.deleteHome);

  app.put("/api/studenthome/:homeId/user", studenthomes.addUserToHome);

  app.get("/api/info", studenthomes.getInfo);
};
