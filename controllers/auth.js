const jwt = require('jsonwebtoken');
require('dotenv').config();
const expressJwt = require('express-jwt');
const User = require('../models/user');

exports.signup = async (req, res) => {
    const userExists = await User.findOne({email : req.body.email});
    if(userExists) return res.status(403).json({
        error: "Email is Taken!"
    });
    const user = await new User(req.body);
    await user.save();
    res.status(200).json({message: "signup successful"})
}

exports.signin = (req, res) => {
    // find user based on email
    const {email, password} = req.body;

    User.findOne({email},(err, user) =>{
        if(err || !user){
            return res.status(401).json({
                error: "User doesn't exist"
            })
        }

        // create auth model and user here
        if(!user.authenticate(password)){
            return res.status(401).json({
                error: "Email and Password do not match!"
            })
        }

        const token = jwt.sign({_id: user._id, role: user.role}, process.env.JWT_SECERT);

        res.cookie("t", token, {expire: new Date() + 9999})

        const {_id, name, email, role} = user
        return res.json({token, user:{_id, email, name, role}})
    })
};

exports.signout = (req, res) => {
    res.clearCookie("t")
    return res.json({message: "User signed out!"})
};

exports.requireSignin = expressJwt({
   secret: process.env.JWT_SECERT,
   algorithms: ['HS256'],
   userProperty: "auth"
});