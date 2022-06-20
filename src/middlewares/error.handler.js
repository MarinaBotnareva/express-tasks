const multer = require('multer');
const yup = require('yup');

module.exports.clientErrorsHandler = async (err, req, res, next) => {
  console.log(err.stack);

  if (err instanceof multer.MulterError || err instanceof yup.ValidationError) {
    err.status = 400;
  }

  if (err.status >= 400 && err.status < 500) {
    const errorMessage = err.message;
    res.status(err.status).send({ errors: [errorMessage] });
    return;
  }
  next(err);
};

module.exports.serverErrorHandler = async (err, req, res, next) => {
  res.status(500).send(`${500}: Server error`);
};
