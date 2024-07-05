const mongoose= require('mongoose');
const mongoURL= 'mongodb://127.0.0.1:27017/election';
require('dotenv').config();
//const mongoURL=process.env.mongoURL;
mongoose.connect(mongoURL,{
    //useNewUrlParser:true,
    //useUnifiedTopology:true


})
const db= mongoose.connection;
db.on('connected',()=>{console.log("db is connected to mongodb")});
db.on('error',(err)=>{console.log("db is mad",err)})
module.exports=db;