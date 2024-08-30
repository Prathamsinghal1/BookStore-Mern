const router = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { authenticateToken } = require('./userAuth');


//Sign Up Functionality

router.post("/sign-up", async(req,res)=>{
    try {
        const {username, email, password, address } = req.body;

        // Applying check for username length is greater than or equal to 4.

        if(username.length<4){
            return res.status(400).json({message:"Username length must be greater than 3"});
        }

        // Applying check for username exists or not.

        const existingUsername = await User.findOne({username:username});
        if(existingUsername){
            return res.status(400).json({message:"Username already exists"});
        }

        // Applying check for email exists or not.

        const existingEmail = await User.findOne({email:email});
        if(existingEmail){
            return res.status(400).json({message:"Email already exists"});
        }

        // Applying check for password length is greater than or equal to 8.

        if(password.length<8){
            return res.status(400).json({message:"Password's length must be greater than 7"});
        }

        // Bcrypt Password to make it safe.

        const hashPassword = await bcrypt.hash(password,10);

        const newUser = new User({username:username, email:email, password:hashPassword, address:address});
        await newUser.save();
        return res.status(200).json({message:"SignUp Successfully"});

    } catch (error) {
        res.status(500).json({message:"Internal Server Error"});  
    }
})


//Sign In Functionality

router.post("/sign-in", async(req,res)=>{
    try {
        const {username, password } = req.body;

        // Applying check for username exists or not.

        const existingUsername = await User.findOne({username:username});
        if(!existingUsername){
            return res.status(400).json({message:"Invalid Credentials"});
        }


        
        await bcrypt.compare(password, existingUsername.password, (err,data)=>{
            if(data){
                const authClaims = [
                    {
                        name:existingUsername.username
                    },
                    {
                        role:existingUsername.role
                    }
                ]
                const token = jwt.sign({authClaims},"bookStore123", {expiresIn:"30d"})
                return res.status(200).json({ id: existingUsername._id, role: existingUsername.role, token: token});
            }
            else{
                return res.status(400).json({message:"Invalid Credentials"});
            }
        });

    } catch (error) {
        res.status(500).json({message:"Internal Server Error"});  
    }
})

//get-user-information by Id

router.get("/get-user-information", authenticateToken, async(req,res) => {
    try {
        const {id} = req.headers;
        const data = await User.findById(id).select("-password");
        return res.status(200).json(data);
    } catch (error) {
        res.status(500).json({message:"Internal Server Error"});  
    }
})

// Update Address by Id
router.put("/update-address", authenticateToken, async(req,res) => {
    try {
        const { id } = req.headers;
        const { address } = req.body;
        await User.findByIdAndUpdate(id, { address:address });
        return res.status(200).json({message: "Address Updated Successfully"});
    } catch (error) {
        res.status(500).json({message:"Internal Server Error"});  
    }
})


module.exports = router;