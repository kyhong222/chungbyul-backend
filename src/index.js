const Express = require("express");
const app = Express();
const api = require("./api");
const cookieParser = require("cookie-parser");

const mysql = require("./bin/mysql");
mysql.connect(console.log("mysql is connected"));

require("dotenv").config();

const PORT = process.env.PORT;

app.use(Express.json());
app.use(cookieParser());
app.use("/api", api);

const handleListen = () => {
  console.log(`Listen on ${PORT}`);
};

const handleHome = (req, res) => {
  console.log("Home");
  res.send("Browser Home");
};

app.get("/", handleHome);
app.listen(PORT, handleListen);
