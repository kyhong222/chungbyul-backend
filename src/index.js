const Express = require("express");
const app = Express();
const api = require("./api");

const PORT = 4000;

app.use("/api", api);

const handleListen = () => {
  console.log(`Listen on ${PORT}`);
};

const handleHome = (req, res) => {
  console.log("Home");
  res.send("Browser Home");
};

app.get("/", handleHome);
app.listen(PORT | 4000, handleListen);
