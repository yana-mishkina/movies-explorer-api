require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const bodyParser = require('body-parser');
const errorsHandler = require('./middlewares/errorsHandler');
const router = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const allowedCors = require('./middlewares/allowedCors');

const { NODE_ENV, PORT = 3000, DB_URL = 'mongodb://localhost:27017/moviesdb' } = process.env;

const app = express();

mongoose.connect(NODE_ENV === 'production' ? DB_URL : 'mongodb://localhost:27017/moviesdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(allowedCors);

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use('/', router);

app.use(errorLogger);

app.use(errors());
app.use(errorsHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
