const express= require('express');
const router= express.Router();
const {body, validationResult}= require("express-validator")
const User= require('../models/User')
const bcrypt= require('bcryptjs');
require('dotenv').config

// Package for creating JWT
var jwt = require("jsonwebtoken");

// Secret String to create JWT Signature
const JWT_SECRET = process.env.REACT_APP_JWT_SECRET;

//Router1: Create a user
router.post('/create-user',
    [
        body("name", "Enter a valid name").isLength({min: 3}),
        body("authPlatform", "authPlatform must be one of: Mobile, Melody Music, Google, Facebook, Apply").isIn(['Melody Music', "Google", "Facebook", "Apple", "Mobile"]),
    ],
    async (req, res)=>{

        // Validating the request body as per the above conditions
        const errors = validationResult(req);
        let result = false;
        
        // If the validation holds false, errors will contain an array with the desciption of error
        if (!errors.isEmpty()) {
            console.log("Error in first section")
            return res.status(400).json({ result: errors.array()});
        }

        try{
            if(req.body.authPlatform!='Mobile'){
                // Checking whether the entered email already exists in database
                let user = await User.findOne({ email: req.body.email });
                if (user) {
                    console.log("Error1: email already existing")
                    return res.status(400).json({ message: "This email already exists. Enter a different email."});
                }
            }
            else{
                // Checking whether the entered email already exists in database
                let user = await User.findOne({ email: req.body.mobile });
                if (user) {
                    console.log("Error1: mobile already existing")
                    return res.status(400).json({ message: "This mobile already exists. Enter a different mobile."});
                }
            }
            if(req.body.authPlatform=== "Mobile"){
                // Create and insert User into Database
                user = await User.create({
                    name: req.body.name,
                    mobile: req.body.mobile,
                    authPlatform: req.body.authPlatform,
                    dob: req.body.dob,
                    gender: req.body.gender
                });

            }

            else if(req.body.authPlatform=== "Melody Music"){
                console.log("User creation for melody music");
                // Create a salt and add Salt added Hash out of the entered Password
                const salt = await bcrypt.genSalt(10);
                const secPass = await bcrypt.hash(req.body.password, salt);

                // Create and insert User into Database
                user = await User.create({
                    name: req.body.name,
                    password: secPass,
                    email: req.body.email,
                    authPlatform: req.body.authPlatform,
                    dob: req.body.dob,
                    gender: req.body.gender
                });
            }

            else {
                // Create and insert User into Database
                user = await User.create({
                    name: req.body.name,
                    email: req.body.email,
                    authPlatform: req.body.authPlatform,
                    dob: req.body.dob,
                    gender: req.body.gender
                });

            }

            // User ID to uniquely Identify the user
            const data = {
                user: {
                    id: user.id,
                },
            };

            // Create a authentication token, first argument is data/payload and second is Secret String for Signature
            const authToken = jwt.sign(data, JWT_SECRET);
            
            result = true;
            console.log("Success! Authentication Token is: "+ authToken);
            res.status(200).json({ message: authToken});
        }catch (error) {
            console.error("Error1: "+ error);
            res.status(400).json({ message: error});
        }
    }
)

router.post('/login-user',
    [
        body("loggingEmail", "Enter a valid email").optional({ checkFalsy: true }).isEmail(),
        body("authPlatform", "keyName must be one of: Melody Music, Google, Facebook, Apply, Mobile").isIn(['Melody Music', "Google", "Facebook", "Apple", "Mobile"])
    ],

    async (req, res)=>{
        // Validating the request body as per the above conditions
        const errors = validationResult(req);

        // If the validation holds false, errors will contain an array with the desciption of error
        if (!errors.isEmpty()) {
            console.log("Error0", errors.array())
            return res.status(400).json({ message: errors.array().msg});
        }

        try{
            const email= req.body.loggingEmail;
            const authPlatform= req.body.authPlatform;
            const mobile= req.body.mobile;
            let user ;
            if(authPlatform== "Mobile"){
                //Mobile no entered by the user should exit in database
                user = await User.findOne({ mobile });
                if (!user) {
                    console.log("Error1")
                    return res.status(400).json({message: "User not found.",});
                }
            }

            else{
                //Email entered by the user should exit in database
                user = await User.findOne({ email });
                if (!user) {
                    console.log("Error1")
                    return res.status(400).json({message: "User not found.",});
                }
            }

            if(authPlatform=== "Melody Music"){
                //Check whether entered password by the user is correct
                const passwordCompare = await bcrypt.compare(req.body.loggingPassword, user.password);
                if (!passwordCompare) {
                    console.log("Error2")
                    return res.status(400).json({message: "Please try to login with correct credentials."});
                }
            }

            // User ID to uniquely Identify the user
            const data = {
                user: {
                id: user.id,
                },
            };

            // Create a authentication token, first argument is data/payload and second is Secret String for Signature
            const authToken = jwt.sign(data, JWT_SECRET);
            // console.log(`Success! User ${email} logged in: ` + authToken);
            res.status(200).json({message:authToken });
        }
        catch(error){
            console.log(error);
            res.status(500).json({message: "Internal Server Error" });

        }
    }


)

router.post('/mobile-exist',
    [
        body("fullPhone", "Enter a valid mobile no.").isMobilePhone(),
    ], 
    async(req, res)=>{
        try{
            //Email entered by the user should exit in database
            let user = await User.findOne({ mobile: req.body.fullPhone });
            if (!user) {
                console.log("Error1")
                return res.status(400).json({message: "User not found.",});
            }
            res.status(200).json({message: "User Available" });
        }
        catch(error){
            console.log(error.msg);
            res.status(500).json({message: "Internal Server Error" });
        }
    }
)

module.exports= router;