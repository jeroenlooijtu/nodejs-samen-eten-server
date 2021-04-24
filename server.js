const express = require("express");
const app = express();

const bodyParser = require("body-parser");

const port = process.env.PORT || 3000;

app.use(bodyParser.json());

require("./app/routes/studenthomes.routes.js")(app);

const server = app.listen(port, () => {
  const host = server.address().address;
  const {port} = server.address();
  console.log(`App listening at http://${host}:${port}`);
});
