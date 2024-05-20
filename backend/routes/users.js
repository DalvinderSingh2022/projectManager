const express = require("express");
const router = express.Router();

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
    const user = await User.findOne({ isCurrentUser: true });

    if (!user) {
        return res.status(400).json({ message: "no user currently signedin" });
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

    const user = await User.create({ name, email, password, avatar, isCurrentUser: true });

    return res.status(201).json(user);
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

    const updatedUser = await User.findByIdAndUpdate(
        user.id,
        { isCurrentUser: true },
        { new: true }
    );

    return res.status(200).json(updatedUser);
});

router.put('/api/users/logout', async (req, res) => {
    const user = await User.findOne({ isCurrentUser: true });

    const updatedUser = await User.findByIdAndUpdate(
        user.id,
        { isCurrentUser: false },
        { new: true }
    );

    return res.status(200).json(updatedUser);
});

module.exports = router;