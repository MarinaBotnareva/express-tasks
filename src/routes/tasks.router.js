const express = require("express");
const { taskCreateMW, taskUpdateMW, getByIdValidation } = require("../middlewares/task.mw.js");
const taskController = require('../controllers/task.cont.js'); 

const taskRouter = express.Router();

taskRouter.get('/', taskController.getTasks);

taskRouter.get('/:id', getByIdValidation, taskController.getTask);

taskRouter.delete('/:id', taskController.deleteTask);

taskRouter.post('/', taskCreateMW, taskController.createTask);

taskRouter.patch('/:id', taskUpdateMW, taskController.updateTask);

module.exports = taskRouter;
