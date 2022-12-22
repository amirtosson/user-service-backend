const express = require('express'); 
const app = express();   
const cors = require('cors');
app.use(cors({
    origin: '*'
}));

const userRouters = require("./routers/user.routers")
app.use(userRouters)

app.listen(3002, () => console.log(`User API listening on port 3002!`));