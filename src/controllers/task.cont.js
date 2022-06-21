const taskService = require('../services/taskService.js');

class TaskController {

  async getTasks(req, res, next) {
    try {
      const limit = Number(req.query.rows);
      const page = Number(req.query.page);
      const offset = Math.floor((page - 1) * limit);    
      
      const tasks = await taskService.getTasks(limit, offset);
      res.status(200).send({ data: tasks });
    } catch (error) {
        next(error);
    }
}

  async createTask(req, res, next) {
    try {
      console.log(req.body)
      const data = { ...req.body };

      const newTask = await taskService.createTask(data);

      res.status(200).send({ data: newTask });
    } catch (error) {
      next(error);
    }
  }

  async updateTask(req, res, next) {
    try {
     
      const data = { ...req.body };

      const updatedTask = await taskService.updateTask(Number(req.params.id), data);

      res.send({ data: updatedTask });
    } catch (error) {
      next(error);
    }
  }

    async deleteTask(req, res, next) {
    try {
 
      const deletedTask = await taskService.deleteTask(Number(req.params.id ));

      res.send({ data: deletedTask });
    } catch (error) {
        next(error);
    }
}
}

module.exports = new TaskController();
