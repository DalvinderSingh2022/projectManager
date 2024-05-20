const express = require("express");
const router = express.Router();

const Project = require("../models/projectmodel");

router.get('/api/projects', async (req, res) => {
    const filter = {};
    if (req.query?.status) {
        filter.status = req.query.status;
    }
    if (req.query?.userId && req.query?.assignto) {
        filter.assignto = req.query.userId;
    }
    if (req.query?.userId && req.query?.assignby) {
        filter.assignby = req.query.userId;
    }
    const projects = await Project.find(filter).sort({ duedate: "asc" });

    if (!projects) {
        return res.status(404).json({ message: "Porject wiht provided id not found" });
    }

    res.status(200).json(projects);
});

router.post('/api/projects', async (req, res) => {
    const { title, detail, duedate, assignto, assignby } = req.body;
    const status = req.body?.status || 'pending';

    if (!title || !detail || !duedate || !assignto) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const project = await Project.create({ title, detail, duedate, assignto, assignby, status });
    if (!project) {
        return res.status(400).json({ message: "Invalid project id provided" });
    }

    return res.status(201).json(project);
});

router.get('/api/projects/:id', async (req, res) => {
    const project = await Project.findById(req.params.id);

    if (!project) {
        return res.status(400).json({ message: "Invalid comments id provided" });
    }

    return res.status(200).json(project);
});

router.delete('/api/projects/:id', async (req, res) => {
    const project = await Project.deleteOne({ _id: req.params.id });

    if (!project) {
        return res.status(400).json({ message: "Invalid comments id provided" });
    }

    return res.status(201).json(project);
});

router.put('/api/projects/:id', async (req, res) => {
    const project = await Project.findById(req.params.id);

    if (!project) {
        return res.status(400).json({ message: "Invalid comments id provided" });
    }

    const updatedProject = await Project.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    return res.status(200).json(updatedProject);
});


module.exports = router;