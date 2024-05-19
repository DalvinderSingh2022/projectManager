const express = require("express");
const router = express.Router();

const Comment = require("../models/commentsmodel");

router.get('/api/projects/:projectID/comments', async (req, res) => {
    const comments = await Comment.find({ projectId: req.params.projectID });

    if (!comments) {
        res.status(400).json({ message: "Can`t fetch comments from Database" });
    }

    res.status(200).json(comments);
});

router.delete('/api/projects/:projectID/comments', async (req, res) => {
    const comments = await Comment.deleteMany({ projectId: req.params.projectID });

    if (!comments) {
        res.status(400).json({ message: "Can`t fetch comments from Database" });
    }

    res.status(200).json(comments);
});

router.post('/api/projects/:projectID/comments', async (req, res) => {
    const { comment, userName } = req.body;
    const projectId = req.params.projectID;

    if (!comment || !userName || !projectId) {
        res.status(400).json({ message: "" });
    }

    const commentdb = await Comment.create({ comment, userName, projectId });
    if (!commentdb) {
        res.status(400).json({ message: "Can`t fetch comments from Database" });
    }

    res.status(200).json(commentdb);
});

module.exports = router;