const Router = require("express").Router();
const controller = require("./account.controller");
Router.get("/", (req, res) => {
  res.send(`Account`);
});

Router.get("/signUp", (req, res) => {
  controller.signUp(req, res);
});

Router.get("/login", (req, res) => {
  controller.login(req, res);
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

module.exports = Router;
