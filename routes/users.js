const router = require("express").Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

//register
router.post('/register', async (req, res)=>{
    try{
        // generate new password
        const salt = await bcrypt.genSalt(10); // salt value for hashing passwords using the bcrypt library.The number 10 in the code represents the number of rounds of hashing that will be performed on the password. The higher the number, the more secure the password will be but it will also take longer to hash.
        const hashedPassword = await bcrypt.hash(req.body.password,salt);

        // create new user
        const newUser= new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        });

        // save user and send response
        const user = await newUser.save();
        res.status(200).json(user._id);
    }catch(err) {
        res.status(500).json(err);
    }
})


// login
router.post('/login', async(req, res)=>{
    try{
        // find user
        const user = await User.findOne({username:req.body.username})
        !user && res.status(400).json("wrong username or password!");

        // validate user
        const validPassword = await bcrypt.compare(req.body.password , user.password);
        !validPassword && res.status(400).json("wrong username or password!");

        // send response
        res.status(200).json({_id: user._id, username:user.username})

    }catch(err){
        res.status(500).json(err);
    }
});


module.exports = router;

