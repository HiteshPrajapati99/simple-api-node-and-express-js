const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
require("./Database/conn");
const router = require("./router/api");

// Handling JSON data
app.use(express.json()); // to support JSON-encoded bodies
app.use(express.urlencoded({ extended: true })); // to support URL-encoded bodies
app.use(cors({ origin: "*" }));

// use router

app.use(router);

// create a api

const port = process.env.PORT || 4000;
app.listen(port, function () {
  console.log("port startd " + port);
});
