const loginController = require("./controllers/loginController.js");
const userController = require("./controllers/userController.js");
const companyController = require("./controllers/companyController.js");
const surveyController = require("./controllers/surveyController.js");
const questionController = require("./controllers/questionController.js");

exports.route = (app) => {
  //mainpage
  app.get("/", function (req, res) {
    //TODO : session check if (not logged in) => login page else => if(admin) => admin page else => survey page
    res.render("login", {});
  });
  //login
  app.post("/login", loginController.doLogin);
  app.post("/logincheck", loginController.checkLogin);

  //user
  app.get("/searchUser", userController.serachUser);
  app.post("/addUser", userController.addUser);
  app.delete("/deleteUser", userController.deleteUser);

  //company
  app.get("/searchCompany", companyController.searchCompany);
  app.post("/addCompany", companyController.addCompany);
  app.delete("/deleteCompany", companyController.deleteCompany);

  //survey
  app.get("/searchSurvey", surveyController.searchSurvey);
  app.post("/addSurvey", surveyController.addSurvey);
  app.delete("/deleteSurvey", surveyController.deleteSurvey);
  app.post("/registSurvey", surveyController.registSurvey);
  app.get("/getUserQuestionList", surveyController.getUserQuestionList);
  app.get("/getUserSurveyList", surveyController.getUserSurveyList);
  app.post("/submitAnswer", surveyController.submitAnswer);

  //question
  app.get("/searchQuestion", questionController.searchQuestion);
  app.post("/addQuestion", questionController.addQuestion);
  app.delete("/deleteQuestion", questionController.deleteQuestion);

  app.get("*", (req, res) => {
    res.end("<head><title>404</title></head><body><h1>404 error</h1></body>");
  });
};
