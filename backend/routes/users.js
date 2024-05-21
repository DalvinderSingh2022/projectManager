const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const User = require("../models/usersmodel");

router.get('/api/users', async (req, res) => {
    const filter = {};
    if (req.query?.name) {
        filter.name = req.query.name;
    }
    const users = await User.find(filter).sort({ name: 'asc' });

    if (!users) {
        return res.status(400).json({ message: "Invalid user id provided" });
    }

    return res.status(200).json(users);
});

router.get('/api/users/current', async (req, res) => {
    const token = req.headers?.Authorization || req.headers?.authorization;

    if (!token) {
        return res.status(401).json({ message: "User is not authorized or token is missing" });
    }

    const user = jwt.verify(token, process.env.ACCESS_TOKEN);

    if (!user) {
        return res.status(401).json({ message: "User is not authorized" });
    }

    return res.status(200).json(user);
});

router.get('/api/users/:id', async (req, res) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return res.status(400).json({ message: "Invalid user id provided" });
    }

    return res.status(200).json(user);
});


router.post('/api/users/register', async (req, res) => {
    const { name, email, password, avatar } = req.body;

    if (!name || !email || !password || !avatar) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const emailAvailable = await User.findOne({ email });
    if (emailAvailable) {
        return res.status(400).json({ message: "provided email already registered" });
    }

    const user = await User.create({ name, email, password, avatar });

    const token = jwt.sign({
        email,
        name,
        avatar,
        _id: user._id,
    }, process.env.ACCESS_TOKEN)
    res.cookie("token", token);

    return res.status(201).json({ user, token });
});


router.put('/api/users/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: "email provided is not registered" });
    }
    else if (user.password !== password) {
        return res.status(400).json({ message: "Incorrect password" });
    }

    const token = jwt.sign({
        email,
        name: user.name,
        avatar: user.avatar,
        _id: user._id
    }, process.env.ACCESS_TOKEN);

    return res.status(200).json({ user, token });
});

module.exports = router;