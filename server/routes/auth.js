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
        body("email", "Enter a valid email").isEmail(),
        body("authPlatform", "keyName must be one of: Melody Music, Google, Facebook, Apply").isIn(['Melody Music', "Google", "Facebook", "Apple"]),
    ],
    async (req, res)=>{

        // Validating the request body as per the above conditions
        const errors = validationResult(req);
        let result = false;
        
        // If the validation holds false, errors will contain an array with the desciption of error
        if (!errors.isEmpty()) {
            return res.status(400).json({ result: errors.array()});
        }

        try{
             // Checking whether the entered email already exists in database
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                console.log("Error1: email already existing")
                return res.status(400).json({ message: "This email already exists. Enter a different email."});
            }

            if(req.body.authPlatform!== "Melody Music"){
                // Create and insert User into Database
                user = await User.create({
                    name: req.body.name,
                    email: req.body.email,
                    authPlatform: req.body.authPlatform
                });

            }

            else{
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
            console.error("Error1: "+ error.msg);
            res.status(400).json({ message: error.msg});
        }
    }
)

module.exports= router;