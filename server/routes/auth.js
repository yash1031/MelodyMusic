const express= require('express');
const router= express.Router();
const {body, validationResult}= require("express-validator")
const User= require('../models/User')
const bcrypt= require('bcryptjs');
const nodemailer = require("nodemailer");
const PhoneValidation= require('../models/PhoneValidation');
require('dotenv').config

// Package for creating JWT
var jwt = require("jsonwebtoken");

// Secret String to create JWT Signature
const JWT_SECRET = process.env.REACT_APP_JWT_SECRET;

const nodemailer_user= process.env.REACT_APP_nodemailer_user;
const nodemailer_password= process.env.REACT_APP_password;

const twilio_accountSid= process.env.twilio_accountSid;
const twilio_authToken= process.env.twilio_authToken;
const twilio_phoneNumber= process.env.twilio_phoneNumber;

//Router1: Create a user
router.post('/create-user',
    [
        body("email", "Enter a valid email").optional({ checkFalsy: true }).isEmail(),
        body("name", "Enter a valid name").isLength({min: 3}),
        body("authPlatform", "authPlatform must be one of: Mobile, Melody Music, Google, Facebook, Apply").isIn(['Melody Music', "Google", "Facebook", "Apple", "Mobile"]),
    ],
    async (req, res)=>{

        // Validating the request body as per the above conditions
        const errors = validationResult(req);
        
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
                console.log("authPlatform is: ",  req.body.authPlatform)
                console.log("mobile is: ",  req.body.mobile)
                user = await User.create({
                    name: req.body.name,
                    mobile: req.body.mobile,
                    email: null,
                    authPlatform: req.body.authPlatform,
                    dob: req.body.dob,
                    gender: req.body.gender
                });
                console.log("Successful user creation")
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
            console.error("Error1: ", error);
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
                if(req.body._id!='') user = await User.findOne({ _id: req.body._id });
                else user = await User.findOne({ email });
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

// Set up nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: nodemailer_user,
      pass: nodemailer_password
    }
});

router.post('/send-email',[],
    async(req, res)=>{
        try{
            const email= req.body.email;
            const user= await User.findOne({email});
            if(!user){
                return res.status(400).json({message: "User does not exist"});
            }  
            const link= `http://localhost:3000/password-reset?user_id=${user._id}`;
            // Send email
            const mailOptions = {
                from: nodemailer_user,
                to: email,
                subject: "Reset your password for Melody Music",
                text: `Follow the link ${link} to reset your password.`,
            };
            transporter.sendMail(mailOptions, async (error, info) => {
                if (error) {
                    return res.status(500).json({message: error});
                }
                // console.log(`OTP: ${otp} sent successfully for email: ${email}`);
                res.status(200).json({message: `Email sent successfully`});
            });
        }
        catch(error){
            res.status(400).json({message: 'Error sending mail'});
        }
    }
)

router.post('/password-reset',[],
    async(req, res)=>{
        try{
            const user_id= req.body.user_id;
            const password= req.body.password;
            let user= await User.findOne({_id: user_id});
            console.log(user);
            if(!user){
                return res.status(400).json({message: "User does not exist"});
            }  
            // Create a salt and add Salt added Hash out of the entered Password
            const salt = await bcrypt.genSalt(10);
            const secPass = await bcrypt.hash(password, salt);
            user= await User.updateOne({_id: user_id}, {password: secPass});
            console.log("Password updated. Updated user is: ", user);
            res.status(200).json({message: user});

        }
        catch(error){
            console.log("error is: "+ error);
            res.status(400).json({message: 'Error resetting password'});
        }
    }
)

// Endpoint to request OTP
router.post("/request-otp", async (req, res) => {
    const mobile= req.body.mobile;
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit OTP
    const expiry = Date.now() + 60000; // OTP expires in 1 minute
  
    let PhoneVerificationDetails;

    let recordPhoneValidation= await PhoneValidation.findOne({mobile});

    if(recordPhoneValidation){
        //Update otp in previous record
        PhoneVerificationDetails= await PhoneValidation.updateOne({_id: recordPhoneValidation._id}, {
            OTP: otp,
            expiry: expiry
        })
    }

    else{
        // Save OTP and expiry to database 
        PhoneVerificationDetails = await PhoneValidation.create({
            mobile: mobile,
            OTP: otp,
            expiry: expiry,
        });
    }

    console.log("PhoneVerificationDetails: ", PhoneVerificationDetails);

    const accountSid = twilio_accountSid;
    const authToken = twilio_authToken;
    const client = require('twilio')(accountSid, authToken);
    client.messages
        .create({
            body: `Your OTP is ${otp}`,
            from: twilio_phoneNumber,
            to: mobile
        })
        .then(
            message => {
                console.log("success", message.sid);
                res.status(200).json({message: `OTP sent is ${otp}`});
            }
        )
        .catch(
            error=> {
                console.log("error", error)
                return res.status(500).json({message: error});
            }
        );
  });

// Endpoint to verify OTP
router.post('/verify-otp', async (req, res) => {
        const mobile = req.body.mobile;
        const otp = req.body.otp;

        // Verify OTP from database 
        let phoneValidationRecord = await PhoneValidation.findOne({ mobile }); // It is to be found the recently added                                                       
        
        if(!phoneValidationRecord){
             res.status(400).json({message: `OTP expired for mobile ${mobile}`}); 
            return;    
        }

        const isValid = (otp === phoneValidationRecord.OTP);

        if (isValid) {
            res.status(200).json({message: `OTP verified for ${mobile}`});
        } else {
            res.status(400).json({message: 'Invalid OTP'});
        }
});

// Endpoint to Delete OTP from DB
router.post("/delete-otp", async (req,res)=>{
    try {
        const mobile= req.body.mobile;
        const deletionRecord = await PhoneValidation.findOne({ mobile: mobile });

        if (deletionRecord) {
            await PhoneValidation.findOneAndDelete({ _id: deletionRecord._id });
            res.status(200).json({message: `Record for phone number: ${mobile} is deleted`});
        }
        else{
            // console.log("Record already deleted");
        }
    } catch (error) {
        res.status(400).json({message: error.message})
    } 
})
module.exports= router;