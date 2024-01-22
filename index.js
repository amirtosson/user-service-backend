const express = require('express');
const bodyparser = require('body-parser');
const app = express();
const cors = require('cors');
require('dotenv').config()
app.use(cors({
  origin: '*'
}));
app.use(bodyparser.json({ limit: '50mb' }));
app.use(bodyparser.urlencoded({
  extended: false,
  limit: '50mb'
}));

const elnRouters = require("./routers/electronic-lab-book.routers")
const userRouters = require("./routers/user.routers")
const datasetsRouters = require("./routers/datasets.routers")
const botRouters = require("./routers/bot.routers")
const expRouters = require("./routers/experiments.routers")


app.use(userRouters)
app.use(datasetsRouters)
app.use(botRouters)
app.use(elnRouters)
app.use(expRouters)


app.listen(3002, () => console.log(`User API listening on port 3002!`));