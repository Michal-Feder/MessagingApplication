const express = require('express');
const Message = require('../models/Message');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Middleware לאימות משתמשים
const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: "Access denied" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: "Invalid token" });
    }
};

router.post('/send', authMiddleware, async (req, res) => {
    const { content } = req.body;

    try {
        const message = new Message({ sender: req.user.id, content });
        await message.save();
        res.status(201).json({ message: "Message sent" });
    } catch (err) {
        res.status(500).json({ message: "Error sending message" });
    }
});

router.get('/', authMiddleware, async (req, res) => {
    try {
        const messages = await Message.find().populate('sender', 'username');
        res.json(messages);
    } catch (err) {
        res.status(500).json({ message: "Error fetching messages" });
    }
});

module.exports = router;
