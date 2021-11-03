const Router = require("express").Router();
const controller = require("./user.controller");

Router.get("/changeNickname", (req, res) => {
  controller.changeNickname(req, res);
});

Router.get("/changeInfo", (req, res) => {
  controller.changeInfo(req, res);
});

Router.get("/getReservations", (req, res) => {
  controller.getReservations(req, res);
});

Router.get("/cancelReservation", (req, res) => {
  controller.cancelReservation(req, res);
});

Router.get("/getUserInfo", (req, res) => {
  controller.getUserInfo(req, res);
});

Router.get("/getMyInfo", (req, res) => {
  controller.getMyInfo(req, res);
});

module.exports = Router;
