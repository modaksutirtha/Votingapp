const express= require("express");
const app= express();
const bodyparser=require('body-parser');
app.use(bodyparser.json());
require('dotenv').config();
const port=process.env.port || 1500;
const db=require('./db');
const cors = require('cors');
//const jwtauthmiddleware = require('./jwt');



const userroutes=require('./routes/userroutes');
const candiroutes=require('./routes/candiroutes');

app.use(cors());
app.use('/user',userroutes);
app.use('/candidate',candiroutes);


app.listen(port,console.log(`port running at ${port}`));