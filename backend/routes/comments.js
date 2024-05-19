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

router.get('/api/projects/:projectID/comments/:id', async (req, res) => {
    const comment = await Comment.find({ projectId: req.params.projectID }).and(req.params.id);

    if (!comment) {
        res.status(404).json({ message: "Comment not found" });
    }

    res.status(200).json(comment);
});

router.post('/api/projects/:projectID/comments', async (req, res) => {
    const { comment, by } = req.body;
    const projectId = req.params.projectID;

    if (!comment || !by || !projectId) {
        res.status(400).json({ message: "" });
    }

    const commentdb = await Comment.create({ comment, by, projectId });
    if (!commentdb) {
        res.status(400).json({ message: "Can`t fetch comments from Database" });
    }

    res.status(200).json(commentdb);
});

module.exports = router;