const taskService = require('../services/taskService.js');

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
      console.log(req.body)
      const data = { ...req.body, body: req.body.body, isDone: req.body.isDone, userId: req.body.userId };

      const newTask = await taskService.createTask(data);

      res.status(200).send({ data: newTask });
    } catch (error) {
      next(error);
    }
  }

  async updateTask(req, res, next) {
    try {
     
      const data = { ...req.body, body: req.body.body, isDone: req.body.isDone, userId: req.body.userId };

      const updatedTask = await taskService.updateTask(Number(req.params.id), data);

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
