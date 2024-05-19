const express = require("express");
const router = express.Router();

const User = require("../models/usersmodel");

router.get('/api/users', async (req, res) => {
    const filter = {};
    if (req.query?.name) {
        filter.displayName = req.query.name;
    }
    const users = await User.find(filter);

    if (!users) {
        res.status(400).json({ message: "Can`t fetch users from Database" });
    }

    res.status(200).json(users);
});

router.get('/api/users/:id', async (req, res) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
});

router.put('/api/users/current', async (req, res) => {
    const user = await User.findOne({ isCurrentUser: true });

    res.status(200).json(user);
});

router.post('/api/users/register', async (req, res) => {
    const { name, email, password, avatar } = req.body;

    if (!name || !email || !password || !avatar) {
        res.status(400).json({ message: "" });
    }

    const emailAvailable = await User.findOne(email);
    if (!emailAvailable) {
        res.status(200).json({ message: "User email already registered" });
    }

    const user = await User.create({ name, email, password, avatar, isCurrentUser: true });
    if (!user) {
        res.status(400).json({ message: "Can`t fetch users from Database" });
    }

    res.status(200).json(user);
});


router.put('/api/users/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ message: "" });
    }

    const user = await User.findOne(email);
    if (!user) {
        res.status(200).json({ message: "User not found" });
    }

    const updatedUser = await Project.findByIdAndUpdate(
        user.id,
        { isCurrentUser: true },
        { new: true }
    );

    res.status(200).json(updatedUser);
});

router.put('/api/users/logout', async (req, res) => {
    const user = await User.findOne({ isCurrentUser: true });

    const updatedUser = await Project.findByIdAndUpdate(
        user.id,
        { isCurrentUser: false },
        { new: true }
    );

    res.status(200).json(updatedUser);
});

module.exports = router;