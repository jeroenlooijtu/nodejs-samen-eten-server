
const express = require("express");

const app = express();
const bodyParserx = require("body-parser");

app.use(bodyParserx.json());
require("./app/routes/studenthomes.routes.js")(app);

var server = app.listen(3000, () => {
  const host = server.address().address;
  const { port } = server.address();
  console.log("App listening at http://%s:%s", host, port);
});
