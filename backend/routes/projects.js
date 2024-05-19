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
    const projects = await Project.find(filter);

    if (!projects) {
        res.status(400).json({ message: "Can`t fetch projects from Database" });
    }

    res.status(200).json(projects);
});

router.post('/api/projects', async (req, res) => {
    const { title, detail, duedate, assignto, assignby } = req.body;
    const status = req.body?.status || 'pending';

    if (!title || !detail || !duedate || !assignto) {
        res.status(400).json({ message: "" });
    }

    const project = await Project.create({ title, detail, duedate, assignto, assignby, status });
    if (!project) {
        res.status(400).json({ message: "Can`t fetch users from Database" });
    }

    res.status(200).json(project);
});

router.get('/api/projects/:id', async (req, res) => {
    const project = await Project.findById(req.params.id);

    if (!project) {
        res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json(project);
});

router.delete('/api/projects/:id', async (req, res) => {
    const project = await Project.deleteOne({ _id: req.params.id });

    if (!project) {
        res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json(project);
});

router.put('/api/projects/:id', async (req, res) => {
    const project = await Project.findById(req.params.id);

    if (!project) {
        res.status(404).json({ message: "Project not found" });
    }

    const updatedProject = await Project.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    res.status(200).json(updatedProject);
});


module.exports = router;