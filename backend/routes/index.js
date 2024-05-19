const express = require("express");
const usersRouter = require("./users");
const projectsRouter = require("./projects");
const commentsRouter = require("./comments");

const router = express.Router();

router.use(usersRouter);
router.use(projectsRouter);
router.use(commentsRouter);

module.exports = router;