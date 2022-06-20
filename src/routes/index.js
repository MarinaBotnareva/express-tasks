const express = require("express");
const taskRouter = require("./tasks.router.js");

const router = express.Router();

// rest api
router.use('/tasks', taskRouter);

module.exports = router;
