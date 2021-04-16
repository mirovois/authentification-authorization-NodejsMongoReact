const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const protect = async(req,res,next) =>{
    try{
        // Retrieve token fom header
        let token = req.headers.authorization
        console.log(token)
        if (!token || !token.startsWith('Bearer')) return res.status(401).json({ msg: "No authentication token, authorization denied." });

        // Split from Bearer
        const modifiedToken = token.split(' ')[1]

        // Decode token
        const verified = jwt.verify(modifiedToken, 'process.env.JWT_SECRET');
        console.log('Decoded', verified)

        if (!verified)
        return res.status(401).json({ msg: "Token verification failed, authorization denied." });

        req.user = verified.id;
        next()
    }
    catch(error){
        console.log('Error',error)
    }
}

module.exports = protect