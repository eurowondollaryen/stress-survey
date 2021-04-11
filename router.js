const loginController = require("./controllers/loginController.js");

exports.route = (app) => {
  //mainpage
  app.get("/", function (req, res) {
    //TODO : session check if (not logged in) => login page else => if(admin) => admin page else => survey page
    res.render("login", {});
  });
  //login
  app.post("/login", loginController.doLogin);
  app.post("/logincheck", loginController.checkLogin);

  app.get("*", (req, res) => {
    res.end("<head><title>404</title></head><body><h1>404 error</h1></body>");
  });
};
