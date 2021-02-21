const loginController = require("./controllers/loginController.js");

exports.route = (app) => {
  //login
  app.post("/login", loginController.doLogin);
  app.post("/logincheck", loginController.checkLogin);
  app.get("*", (req, res) => {
    res.end("<head><title>404</title></head><body><h1>404 error</h1></body>");
  });
};
