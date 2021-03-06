const express = require("express");
const bodyParser = require("body-parser");

const routes_i = require("./routes/routes");

const API_PORT = 3001;
const app = express();
const router = express.Router();

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = new routes_i.Routes();
routes.routes(app);

// append /api for our http requests
// app.use("/api", router);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
