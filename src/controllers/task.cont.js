const createError = require("http-errors");
const heroService = require('../services/taskService.js');

class TaskController {

  async getTasks(req, res, next) {
    try {    
      
      res.status(200).send({ id: req.params.id });
    } catch (error) {
        next(error);
    }
}

  async createTask(req, res, next) {
    try {
      const data = { ...req.body, body: req.params.body, isDone: req.params.isDone, userId: req.params.userId };

      const newTask = await taskService.createTask(data);

      res.status(200).send({ data: newTask });
    } catch (error) {
      next(error);
    }Hero
  }

  async updateTask(req, res, next) {
    try {
      const {
        body,
        params: { id }, 
        query: {}, 
      } = req;

      const data = { ...body };

      const updatedTask = await taskService.updateTask(Number(id), data);

      res.send({ data: updatedTask });
    } catch (error) {
      next(error);
    }
  }

    async deleteTask(req, res, next) {
    try {
      const { params: {id} } = req;

      const deletedTask = await taskService.deleteTask(Number(id));

      res.send({ id: deletedTask });
    } catch (error) {
        next(error);
    }
}
}

module.exports = new TaskController();
