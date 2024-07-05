const mongoose= require('mongoose');
const bcrypt=require('bcrypt');
const userschema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    email:{
        type:String
    },
    mobile:{
        type:String
    },
    address:{

        type:String,
        required:true
    },
    adhar:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['voter','admin'],
        default:'voter'
    },
    isvote:{
        type:Boolean,
        default:false
    }


})
userschema.pre('save', async function(next){
    const user=this;
    if(!user.isModified('password'))return next();
    try{
        const salt=await bcrypt.genSalt(10);
        const hashedpass=await bcrypt.hash(user.password,salt);
        user.password=hashedpass;
        next();

    }
    catch(err){
        return next(err);
    }
})
userschema.methods.comparepassword = async function(candidatePassword){
    try{
        // Use bcrypt to compare the provided password with the hashed password
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    }catch(err){
        throw err;
    }
}
const user=mongoose.model('user',userschema);
module.exports=user;