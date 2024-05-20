const express = require("express");
const router = express.Router();

const Comment = require("../models/commentsmodel");

router.get('/api/projects/:projectID/comments', async (req, res) => {
    const comments = await Comment.find({ projectId: req.params.projectID }).sort({ updatedAt: 'desc' });

    if (!comments) {
        return res.status(400).json({ message: "Invalid comments id provided" });
    }

    return res.status(200).json(comments);
});

router.delete('/api/projects/:projectID/comments', async (req, res) => {
    const comments = await Comment.deleteMany({ projectId: req.params.projectID });

    if (!comments) {
        return res.status(400).json({ message: "Invalid comments id provided" });
    }

    return res.status(201).json(comments);
});

router.post('/api/projects/:projectID/comments', async (req, res) => {
    const { comment, userName } = req.body;
    const projectId = req.params.projectID;

    if (!comment || !userName || !projectId) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const commentdb = await Comment.create({ comment, userName, projectId });
    if (!commentdb) {
        return res.status(400).json({ message: "Invalid comments id provided" });
    }

    return res.status(201).json(commentdb);
});

module.exports = router;