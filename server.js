const express = require("express");
const cors = require("cors");
const apiRouter = require('./backend/apiRouter');
const likesCtrl = require ('./backend/controllers/likes.controller');
const path = require('path');
const bodyParser = require('body-parser');
const listEndpoints = require('express-list-endpoints');
const likesController = require("./backend/controllers/likes.controller");
const app = express();
let corsOptions = {
  origin: "http://localhost:8080"
};

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// simple route
app.get("/", function (req, res) {
  res.setHeader('Content-Type', 'text/html');
  res.json({ message: "Welcome to Groupomania" });
});

//routes
app.use('/api/', apiRouter.router);
app.use("/api/posts/", likesCtrl.likePost);


// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
})

module.exports = app

console.log(listEndpoints(app));

