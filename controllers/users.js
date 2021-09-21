const { NODE_ENV, JWT_SECRET } = process.env;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');
const ConflictError = require('../errors/conflict-err');
const AuthError = require('../errors/auth-err');

async function createUser(req, res, next) {
  const {
    name,
    email,
    password,
  } = req.body;

  let hash;
  let user;

  try {
    hash = await bcrypt.hash(password, 10);

    try {
      user = await User.create({
        email, name, password: hash,
      });
      res.status(201).send({
        name: user.name,
        email: user.email,
        _id: user._id,
      });
    } catch (error) {
      if (error.name === 'ValidationError') {
        next(new NotFoundError('Переданы некорректные данные при создании пользователя'));
      } else if (error.name === 'MongoError' && error.code === 11000) {
        next(new ConflictError('Произошла ошибка при создании пользователя, указанный почтовый ящик занят'));
      } else {
        next(error);
      }
    }
  } catch (error) {
    next(error);
  }
}

async function getCurrentUser(req, res, next) {
  const userId = req.user._id;
  let user;

  try {
    user = await User.findById(userId);

    if (!user) {
      throw new NotFoundError('Пользователь по указанному _id не найден');
    }
    res.send(user);
  } catch (error) {
    if (error.message === 'NotValidID') {
      next(new NotFoundError('Пользователь по указанному _id не найден'));
    } else {
      next(error);
    }
  }
}

async function patchUser(req, res, next) {
  const userId = req.user._id;
  const { name, email } = req.body;

  let user;

  try {
    user = await User.findByIdAndUpdate(userId,
      { name, email },
      {
        new: true, runValidators: true, upsert: false,
      });

    if (!user) {
      throw new ConflictError('Пользователь по указанному _id не найден');
    }

    res.send(user);
  } catch (error) {
    if (error.message === 'NotValidID') {
      next(new ConflictError('Пользователь по указанному _id не найден'));
    } else if (error.name === 'ValidationError') {
      next(new BadRequestError('Ошибка при изменении данных пользователя'));
    } else {
      next(error);
    }
  }
}

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );

      res.send({ token });
    })
    .catch(() => {
      throw new AuthError('Пароль или почтовый ящик введены неверно');
    })
    .catch(next);
};

module.exports = {
  createUser,
  getCurrentUser,
  patchUser,
  login,
};
