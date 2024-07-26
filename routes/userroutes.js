const express = require("express");
const router = express.Router();
const user = require('../models/user');
const { jwtauthmiddleware, generatetoken } = require('../jwt');
//..........................................................................................................
router.post('/signup', async (req, res) => {

    try {
        const data = req.body;
        if(!(data.name && data.age && data.email && data.mobile && data.address && data.adhar && data.password)){
            throw new Error("Please fill all the fields");
        }
        if(data.mobile<1000000000 || data.mobile>9999999999){
            throw new Error("Please provide a 10 digit mobile number");
        }
        if(data.adhar<100000000000 || data.adhar>999999999999){
            throw new Error("Please provide a 12 digit adhar number");
        }
        const newuser = new user(data);
        const response = await newuser.save();
        console.log('data saved');

        const payload = {
            id: response.id,
        }
        console.log(JSON.stringify(payload));
        const token = generatetoken(payload);
        console.log("Token is : ", token);

        res.status(200).json({ response: response, token: token });

    }
    catch (err) {
        console.log('the error is:', err);
        res.status(500).json({ error: err.message });
    }
})


router.post('/login', async (req, res) => {

    try {
        const { name, adhar, password } = req.body;
        if(!name || !adhar || !password){
            throw new Error("Please fill all the fields");
        }
        if(adhar<100000000000 || adhar>999999999999){
            throw new Error("Please provide a 12 digit adhar number");
        }
        const userTryingToLogin = await user.findOne({ adhar: adhar });
        if (!userTryingToLogin || !(await userTryingToLogin.comparepassword(password)))
            return res.status(401).json({ error: "invalid" });
        const payload = {
            id: userTryingToLogin.id,
        }
        const token = generatetoken(payload);
        res.json({ token });

    }
    catch (err) {
        console.log('the error is:', err);
        res.status(500).json({ error: err.message });
    }
})
//............................................................................................................


router.get('/profile', jwtauthmiddleware, async (req, res) => {
    try {
        const userData = req.user;

        const userId = userData.id;
        const userProfile = await user.findById(userId);

        res.status(200).json({ userProfile });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error getting profile' });
    }
})
//.........................................................................................................
router.put('/profile/password', jwtauthmiddleware, async (req, res) => {
    try {
        const userid = req.user.id;
        const{currentpass,newpass}=req.body;
        const userTryingToChangePassword = await user.findById(userid);

        if (!(await userTryingToChangePassword.comparepassword(currentpass)))
            return res.status(401).json({ error: "invalid" });
        userTryingToChangePassword.password=newpass;
        await userTryingToChangePassword.save()
        console.log('updated password');
        res.status(200).json({message:'password updated'});
        

    }
    catch (err) {
        console.log('the error is:', err);
        res.status(500).json({ error: 'update info internel server error' });
    }
})
//.....................................................................................


module.exports = router;