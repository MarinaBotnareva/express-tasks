const createHttpError = require("http-errors");

let nextId = 1;
const tasksDB = [{ id: 0 }];

module.exports.getTasks = async () => {
  return tasksDB;
}

module.exports.getTask = async (id) => {
  const foundTaskIdx = tasksDB.findIndex((task) => task.id === id)
  if(foundTaskIdx === -1) {
    throw createHttpError(404, 'Task not found');
  }
  return tasksDB[foundTaskIdx];
}

module.exports.createTask = async (data) => {
  const newTask = { ...data, id: nextId++ };
  tasksDB.push(newTask);

  return newTask;
};

module.exports.updateTask = async (id, data) => {
  const foundTaskIdx = tasksDB.findIndex((task) => task.id === id);
  const foundTaskData = tasksDB[foundTaskIdx];

  if (foundTaskIdx === -1) {
    return null;
  }
 
  const updatedTask = {
    ...foundTaskData,
    ...data,
    id: foundTaskData.id,
  };

  tasksDB[foundTaskIdx] = updatedTask;

  return updatedTask;
};

module.exports.deleteTask = async (id) => {
  const foundTaskIdx = tasksDB.findIndex((task) => task.id === id);

  if(foundTaskIdx === -1) {
    throw createHttpError(404, 'Task not found');
  }
  const deletedTask = tasksDB.splice(foundTaskIdx, 1);

  return deletedTask[0];
};
