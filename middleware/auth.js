const Blacklist = require('../models/Blacklist');
const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(403).json({ message: 'No token provided' });

    try {
        // Check if token is blacklisted
        const blacklistedToken = await Blacklist.findOne({ token });
        if (blacklistedToken) {
            return res.status(401).json({ message: 'Token has been blacklisted' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach the user information to the request object
        next(); // Continue to the next middleware/route
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
};

module.exports = authMiddleware;
