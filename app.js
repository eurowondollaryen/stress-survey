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

//**https
//https://nodejs.org/api/https.html#https_https_createserver_options_requestlistener
//https://eunsukimme.github.io/nodejs/2019/09/20/Express-SSL-HTTPS/
const https = require("https");
/*
TODO: GET SSL
const options = {
  key: fs.readFileSync(__dirname + '/인증서경로/domain_xxxxx.key.pem')
  cert: fs.readFileSync(__dirname + '/인증서경로/domain_xxxxx.crt.pem')
  ca: fs.readFileSync(__dirname + '/인증서경로/ca-chain-bundle.pem')
};
const options = {
  key: fs.readFileSync('test/fixtures/keys/agent2-key.pem'),
  cert: fs.readFileSync('test/fixtures/keys/agent2-cert.pem')
};
const options = {
  pfx: fs.readFileSync('test/fixtures/test_cert.pfx'),
  passphrase: 'sample'
};
*/

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
