const Router = require("express").Router();
const controller = require("./account.controller");

Router.post("/signUp", (req, res) => {
  controller.signUp(req, res);
});

Router.post("/login", (req, res) => {
  controller.login(req, res);
});

Router.post("/logout", (req, res) => {
  controller.logout(req, res);
});

Router.get("/findID", (req, res) => {
  controller.findID(req, res);
});

Router.get("/findPW", (req, res) => {
  controller.findPW(req, res);
});

Router.get("/changePW", (req, res) => {
  controller.changePW(req, res);
});

Router.get("/printAccounts", (req, res) => {
  controller.printAccounts(req, res);
});

Router.get("/test", (req, res) => {
  controller.test(req, res);
});
module.exports = Router;
