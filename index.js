const express = require('express'); 
const bodyparser = require('body-parser');
const app = express();   
const cors = require('cors');
app.use(cors({
    origin: '*'
}));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
    extended: false
  }));
const userRouters = require("./routers/user.routers")
const datasetsRouters = require("./routers/datasets.routers")

app.use(userRouters)
app.use(datasetsRouters)

app.listen(3002, () => console.log(`User API listening on port 3002!`));