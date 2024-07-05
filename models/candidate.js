const mongoose= require('mongoose');
const user = require('./user');
//const bcrypt=require('bcrypt');
const candischema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    party:{

        type:String,
        required:true

    },
    age:{
        type:Number,
        required:true
    },
    votes:[{
        user:{
            type:mongoose.Schema.Types.ObjectId,
            //required:true,
            ref:'user'

        },
        votedat:{

            type:Date,
            default:Date.now()
        }
}],
    votecount:{
        type:Number,
        default:0
    }


})

const candidate=mongoose.model('candidate',candischema);
module.exports=candidate;