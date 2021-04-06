const express = require("express");
const app = express();

var fs = require("fs");
var path = require("path");

const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json());

//routes
require("./router.js").route(app);

const port = process.env.PORT || 5000;

//ejs init
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);

app.listen(port, () => {
  console.log("server has started on port 5000");
});
