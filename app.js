const express = require("express");
const app = express();
var fs = require("fs");
var path = require("path");
const cors = require("cors");
const port = process.env.PORT || 5000;

//session for login
const session = require("express-session");
//body-parser : FOR HANDLING POST DATA
const bodyParser = require("body-parser");

//middleware
app.use(cors());
app.use(express.json());

//ejs init
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);

//use public directory
app.use(express.static(path.join(__dirname, "/public")));

//use session
app.use(
  session({
    secret: "root##3804",
    resave: false,
    saveUninitialized: true,
  })
);

//use body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(port, () => {
  console.log("server has started on port " + port);
});

//db setting
require("./db.js").connect();

//routes
require("./router.js").route(app);
