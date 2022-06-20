const createError = require('http-errors');
const yup = require('yup');
const { createMw } = require('../utils/middleware.js');

const paramID = yup.number().positive().required();

const taskCreateSchema = yup.object().shape({
  body: yup.string().required(),
  isDone: yup.boolean().required(),
  userId: yup.string().required()
});

const taskUpdateSchema = yup.object().shape({
  body: yup.string().required(),
  isDone: yup.boolean().notRequired(),
  userId: yup.string().notRequired(),
});

module.exports.taskCreateMW = createMw(async (req, res, next) => {
  const data = { ...req.body };
  
  if (!(await taskCreateSchema.isValid(data))) {
    throw createError(400, 'Invalid data');
  }
});

module.exports.taskUpdateMW = createMw(async (req, res, next) => {
  const data = req.body;

  if (!(await taskUpdateSchema.isValid(data))) {
    throw createError(400, 'Invalid data');
  }
});

module.exports.getByIdValidation = createMw(async (req, res, next) => {
  const verdict = await paramID.isValid(req.params.id);
  if (!verdict) {
    const error = new Error('Validation error');
    error.status = 400;
    throw error;
  }
});