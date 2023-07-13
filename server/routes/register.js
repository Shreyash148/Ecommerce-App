const express = require('express');
const route = express.Router();
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const { body, validationResult, oneOf } = require('express-validator');


route.post('/register', [
    body('name', "Name too short").isLength({ min: 3 }),
    body('answer', "Answer too short").isLength({ min: 3 }),
    body('email', "Invalid email format").isEmail().isLength({ min: 8 }),
    body('contactNumber', "Invalid Phone No").isNumeric().isLength({ min: 10, max: 12 }),
    body('password', 'Set a strong password').isStrongPassword({
        minLength: 6,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    })
],
    async (req, res) => {
        const { name, password, address, email, contactNumber, answer ,role} = req.body;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.send({ success: false, message: errors.errors[0].msg })
        }
        else {
            // check existing user
            const user = await User.findOne({ email });
            if (user) {
                return res.status(201).send({ success: false, message: "user already exists" });
            }

            //hash password
            const salt = await bcrypt.genSalt(10);
            let secPwd = await bcrypt.hash(password, salt);

            //create user
            User.create({
                name,
                password: secPwd,
                address,
                email,
                answer,
                contactNumber,
                role
            })
            res.json({ success: true, message: "user successfully registered" });
        }
    });


route.post('/updateUser', [
    body('name', "Name too short").isLength({ min: 3 }),
    body('answer', "Answer too short").isLength({ min: 3 }),
    body('email', "Invalid email format").isEmail().isLength({ min: 8 }),
    body('contactNumber', "Invalid Phone No").isNumeric().isLength({ min: 10, max: 12 }),
    body('password', 'Set a strong password').isStrongPassword({
        minLength: 6,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    })
],
    async (req, res) => {
        const { name, password, address, email, contactNumber, answer, id } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.send({ success: false, message: errors.errors[0].msg })
        }
        else {

            // check existing user
            const user = await User.findById(id);
            if (user) {
                //hash password
                const salt = await bcrypt.genSalt(10);
                let secPwd = await bcrypt.hash(password, salt);

                //create user
                const updated = await User.findByIdAndUpdate(id, {
                    name: name,
                    password: secPwd,
                    address: address,
                    email: email,
                    answer: answer,
                    contactNumber: contactNumber,
                }, { new: true });

                return res.send({ success: true, message: "user successfully updated", updated });
            }
        }
    })

module.exports = route;