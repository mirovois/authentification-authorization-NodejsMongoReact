const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const protect = require('../middleware/auth')

const User =require('../models/userModel')

router.post('/', async (req, res) =>{
    try{
        let { email, password, displayName } = req.body;

        if (!email || !password )
         return res.status(400).json({ msg: "Not all fields have been entered." });

         const existingUser = await User.findOne({ email: email });
         if (existingUser)
           return res
             .status(400)
             .json({ msg: "An account with this email already exists." });

        if (!displayName) displayName = email;

        // Encode user's
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hashSync(password, salt);

        const newUser = new User({
            email,
            password:passwordHash,
            displayName,
          });
          const savedUser = await newUser.save();
          res.json(savedUser);
    }
    catch (error){
        console.log('Error:',error)
    }
})

router.post('/login',async(req, res) =>{
    try{
        let {email, password} = req.body
        if (!email || !password)
        return res.status(400).json({ msg: "Not all fields have been entered." });

        const user = await User.findOne({email})
        if (!user)
        return res.status(400).json({ msg: "No account with this email has been registered." });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ msg: "Invalid credentials." }); 

        // Generate jsonwebtoken
        const token = jwt.sign({ id: user._id }, 'process.env.JWT_SECRET');

        if (user){
            res.json({
                _id: user._id,
                email:user.email,
                password:user.password,
                displayName:user.displayName,
                token
            })
        // return res.status(200).json({msg:"You are successfully logged in!"})
        }
    }
    catch(err){
        res.status(500).json({error:err.message})
    }
})



router.get('/',async(req,res) =>{
    const users = await User.find({})
    res.json(users)
})

router.route("/profile").get(protect,async (req, res) => {
    const user = await User.findById(req.user);
    if(!user) return res.status(400).json({msg:'User not found'})
    res.json({
      email:user.email,  
      displayName: user.displayName || user.email,
      id: user._id,
    });
    
    // res.send('Success!!!')
  });



module.exports = router