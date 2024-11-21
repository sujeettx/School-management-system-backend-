const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ error: 'Access denied. You are not admin .' });
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;

        // Check if the user is an admin
        if (req.user.role === 'admin') {
            return next();  // Allow admin to access the route
        }

        next();  // Proceed for non-admin users (or restrict further down the route logic)

    } catch (error) {
        res.status(400).json({ error: 'Invalid token. Please authenticate again.' });
    }
};
