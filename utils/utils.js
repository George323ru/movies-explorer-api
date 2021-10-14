const { Joi } = require('celebrate');

const signupJoi = Joi.object().keys({
  email: Joi.string().required().email(),
  password: Joi.string().required().min(8),
  name: Joi.string().required().min(2).max(30),
});

const signinJoi = Joi.object().keys({
  email: Joi.string().required().email(),
  password: Joi.string().required().min(8),
});

const patchUserJoi = Joi.object().keys({
  name: Joi.string().required().min(2).max(30),
  email: Joi.string().required().email(),
});

const createMovieJoi = Joi.object().keys({
  country: Joi.string().required().min(2).max(100),
  director: Joi.string().required().min(2).max(50),
  duration: Joi.number().required(),
  year: Joi.string().required().min(4).max(4),
  description: Joi.string().required().min(1),
  image: Joi.string().required().pattern(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\\+~#=]+\.[a-zA-Z0-9()]+([-a-zA-Z0-9()@:%_\\+.~#?&/=#]*)/),
  trailer: Joi.string().required().pattern(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\\+~#=]+\.[a-zA-Z0-9()]+([-a-zA-Z0-9()@:%_\\+.~#?&/=#]*)/),
  movieId: Joi.number().required(),
  nameRU: Joi.string().required().min(2),
  nameEN: Joi.string().required().min(2),
  thumbnail: Joi.string().required().pattern(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\\+~#=]+\.[a-zA-Z0-9()]+([-a-zA-Z0-9()@:%_\\+.~#?&/=#]*)/),
});

const deleteMovieJoi = Joi.object().keys({
  movieId: Joi.string().required().length(24).hex(),
});

module.exports = {
  createMovieJoi,
  deleteMovieJoi,
  patchUserJoi,
  signupJoi,
  signinJoi,
};
