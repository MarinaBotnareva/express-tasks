const express = require('express');
const path = require('path');
const {
  clientErrorsHandler,
  serverErrorHandler,
} = require('./middlewares/error.handler.js');
const router = require('./routes/index.js');
const dotenv = require('dotenv');
dotenv.config(path.resolve(__dirname, '../', '.env'));

const app = express();

app.use(express.json());

app.use('/files', express.static(
  path.resolve(__dirname, '../', 'public')
)); // public/avatars -> /static/avatars

// cors

app.use(function (req, res, next) {
  console.log(new Date().toLocaleString(), req.method, req.path, req.body);
  next();
});

app.use('/', router);

app.use(clientErrorsHandler);
app.use(serverErrorHandler);

const port = process.env.PORT || 5000;
// http://localhost:5000
app.listen(port, () => {
  console.log('Server started on port', port);
});
