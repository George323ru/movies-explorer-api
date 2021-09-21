require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const { celebrate, errors } = require('celebrate');
const usersRoutes = require('./routes/users');
const moviesRoutes = require('./routes/movies');
const {
  createUser,
  login,
} = require('./controllers/users');
const auth = require('./middlewares/auth');
const NotFoundError = require('./errors/not-found-err');
const { signupJoi, signinJoi } = require('./utils/utils');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const limiter = require('./middlewares/rate-limiter');

const { PORT = 3000 } = process.env;
const app = express();

app.use(cors());

app.use(helmet());
app.disable('x-powered-by');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(limiter);

mongoose.connect('mongodb://localhost:27017/moviesdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signup', celebrate({ body: signupJoi }), createUser);

app.post('/signin', celebrate({ body: signinJoi }), login);

app.use('/users', auth, usersRoutes);
app.use('/movies', auth, moviesRoutes);

app.use('*', () => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
});

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
