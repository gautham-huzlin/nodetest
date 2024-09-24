const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing
const User = require('../models/User');
const Text = require('../models/Text');
const Blacklist = require('../models/Blacklist');
const authMiddleware = require('../middleware/auth'); // Adjust the path if necessary

const router = express.Router();

// Sign Up Route
router.post('/signup', async (req, res) => {
    const { username, password } = req.body;

    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password before saving the user
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Sign In Route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate a JWT token with a 200-second expiry
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '200s' });
        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Post Random Text (authenticated)
router.post('/text', authMiddleware, async (req, res) => {
    try {
        const newText = new Text({
            userId: req.user.id, // The ID from the verified JWT token
            content: req.body.content
        });
        await newText.save();
        res.status(201).json({ message: 'Text saved successfully', text: newText });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error saving text' });
    }
});

// Get All Texts for Authenticated User
router.get('/texts', authMiddleware, async (req, res) => {
    try {
        const texts = await Text.find({ userId: req.user.id });
        res.json(texts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching texts' });
    }
});

// Logout Route
router.post('/logout', authMiddleware, async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; // Get the token from the header
        await Blacklist.create({ token }); // Add token to blacklist
        res.json({ message: 'Logout successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Logout failed' });
    }
});

module.exports = router;

