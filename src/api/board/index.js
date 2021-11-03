const Router = require("express").Router();

Router.get("/", (req, res) => {
  res.send(`board`);
});

module.exports = Router;
