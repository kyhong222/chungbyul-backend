const Router = require("express").Router();

const account = require("./account");
const admin = require("./admin");
const board = require("./board");
const reservation = require("./reservation");
const user = require("./user");

Router.use("/account", account);
Router.use("/admin", admin);
Router.use("/board", board);
Router.use("/reservation", reservation);
Router.use("/user", user);

module.exports = Router;
