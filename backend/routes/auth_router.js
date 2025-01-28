// authRoutes.js
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/Users');
const Generate = require('../utils/Generate');
const router = express.Router();
const saltRounds = 10;

const jwtSecret = process.env.JWT_SECRET || 'cakepudding'; // Use environment variable for the JWT secret

// Signup Route
router.post('/chiro/signUp', async (req, res, next) => {
    const { email, username, password, role } = req.body;

    try {
        // Hash the password
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(password, salt);

        // Create user
        const user = await User.createUser(email, username, hash, role);
        Generate.verificationToken(email)

        res.status(201).json({ message: 'Signup successful. Please check your email to verify your account.' });
    } catch (error) {
        next(error);
    }
});

// Login Route
router.post('/chiro/login', async (req, res, next) => {
    try {
        const { email, password } = req.body;

        let user = await User.findByEmail(email);
        if (!user) {
            return res.status(400).json({ message: 'Incorrect email or password' });
        }

        const match = await bcrypt.compare(password, user.password_digest);
        if (!match) {
            return res.status(400).json({ message: 'Incorrect email or password' });
        }

        // Generate JWT token
        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
                username: user.username
            },
            jwtSecret,
            { expiresIn: '24h' }
        );

        res.json({ token });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
