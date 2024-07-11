const express = require("express");
const router = express.Router();
const User = require('../models/user');
const candidate = require("../models/candidate");

const { jwtauthmiddleware, generatetoken } = require('../jwt');



//..........................................................................................................

const checkadminrole = async (userid) => {
    try {
        const user = await User.findById(userid);
        return user.role === 'admin';

    }
    catch (err) {
        return false;
    }
}
//..............................................................................................................
router.get('/vote/count', async (req, res) => {
    try {
        const Candidate = await candidate.find().sort({ votecount: 'desc' });
        const voterecord = Candidate.map((data) => {
            return {
                party: data.party,
                count: data.votecount
            }
        });
        return res.status(200).json(voterecord);

    }
    catch (err) {
        console.log('the eroor is:', err);
        res.status(500).json({ error: 'cant get count' });
    }
})
router.get('/:party', jwtauthmiddleware, async (req, res) => {
    try {
        const party = req.params.party;
        const response = await candidate.find({party});

        if (!response) {
            return res.status(404).json('no candidates from this party were not found');
        }
        res.status(200).json(response);

    }
    catch (err) {
        console.log('the eroor is:', err);
        res.status(500).json({ error: 'get candidates by party internel server error' });

    }
})

router.get('/', async(req,res)=>{
    try{
        const AllCandidate = await candidate.find().sort({ party:'desc' });
        const candidaterecord = AllCandidate.map((data) => {
            return {
                name:data.name,
                party: data.party,
                age: data.age
            }
        });
        return res.status(200).json(candidaterecord);

    }
    catch(err){
        console.log('the eroor is:', err);
        res.status(500).json({ error: 'cant get candidates' });

    }
})
//..............................................................................................................
router.post('/', jwtauthmiddleware, async (req, res) => {

    try {
        if (! await checkadminrole(req.user.id)) {
            return res.status(403).json({ message: 'the user is not admin' });
        }
        const data = req.body;
        const newcandi = new candidate(data);
        const response = await newcandi.save();
        console.log('data saved candidate');
        res.status(200).json({ response: response });

    }
    catch (err) {
        console.log('the eroor is:', err);
        res.status(500).json({ error: 'internel server error in candi save' });

    }
})

router.post('/vote/:candidateid', jwtauthmiddleware, async (req, res) => {
    const candidateid = req.params.candidateid;
    const userid = req.user.id;
    try {
        const Candidate = await candidate.findById(candidateid);
        if (!Candidate) return res.status(404).json({ message: 'candidate not found' });

        const user = await User.findById(userid);
        if (!user) return res.status(404).json({ message: 'user not found' });

        if (user.isvote) return res.status(400).json({ message: 'you have already voted' });

        if (user.role === 'admin') return res.status(403).json({ message: 'you are admin you cant vote' });


        Candidate.votes.push({user: userid});
        Candidate.votecount++;
        await Candidate.save();

        user.isvote = true;
        await user.save();
        res.status(200).json({ message: 'your vote succesfully Recorded' });

    }
    catch (err) {
        console.log('the eroor is:', err);
        res.status(500).json({ error: 'user your vote can not be given' });
    }
})
//............................................................................................................

router.put('/:candidateid', jwtauthmiddleware, async (req, res) => {
    try {
        if (!checkadminrole(req.user.id)) {
            return res.status(403).json({ message: 'the user is not admin' });
        }
        const candidateid = req.params.candidateid;
        const updatedinfo = req.body;
        const response = await candidate.findByIdAndUpdate(candidateid, updatedinfo, {
            new: true,
            runvalidators: true
        })

        if (!response) {
            return res.status(404).json('candidate not found');
        }
        console.log('candidate updated info');
        res.status(200).json(response);

    }
    catch (err) {
        console.log('the eroor is:', err);
        res.status(500).json({ error: 'update info internel server error' });

    }
})
//.....................................................................................

router.delete('/:candidateid', jwtauthmiddleware, async (req, res) => {
    try {
        if (!checkadminrole(req.user.id)) {
            return res.status(403).json({ message: 'the user is not admin' });
        }
        const candidateid = req.params.candidateid;
        const response = await candidate.findByIdAndDelete(candidateid);

        if (!response) {
            return res.status(404).json('candidate not found');
        }
        console.log('candidate deleted info');
        res.status(200).json(response);

    }
    catch (err) {
        console.log('the eroor is:', err);
        res.status(500).json({ error: 'delete candidate internel server error' });

    }
})
//.....................................................................................


//........................................................................................

module.exports = router;