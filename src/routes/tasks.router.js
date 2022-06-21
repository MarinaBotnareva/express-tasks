const express = require("express");
const { taskCreateMW, taskUpdateMW } = require("../middlewares/task.mw.js");
const taskController = require('../controllers/task.cont.js'); 

const taskRouter = express.Router();

taskRouter.get('/', taskController.getTasks);

taskRouter.delete('/:id', taskController.deleteTask);

taskRouter.post('/', taskCreateMW, taskController.createTask);

taskRouter.patch('/:id', taskUpdateMW, taskController.updateTask);

module.exports = taskRouter;
