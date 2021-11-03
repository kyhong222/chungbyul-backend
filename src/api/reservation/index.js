const Router = require("express").Router();
const controller = require("./reservation.controller");

Router.get("/showReservations", (req, res) => {
  controller.showReservations(req, res);
});

Router.get("/makeReserve", (req, res) => {
  controller.makeReserve(req, res);
});

Router.get("/cancelReserve", (req, res) => {
  controller.cancelReserve(req, res);
});

Router.get("/getReserve", (req, res) => {
  controller.getReserve(req, res);
});

module.exports = Router;
