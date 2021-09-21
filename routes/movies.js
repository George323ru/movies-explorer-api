const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  createMovie, getMovies, deleteMovie,
} = require('../controllers/movies');

router.get('/', getMovies);

router.post('/',
  celebrate({
    body: Joi.object().keys({
      country: Joi.string().required().min(2).max(30),
      director: Joi.string().required().min(2).max(30),
      duration: Joi.number().required(),
      year: Joi.string().required().min(4).max(4),
      description: Joi.string().required().min(1),
      image: Joi.string().required().pattern(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\\+~#=]+\.[a-zA-Z0-9()]+([-a-zA-Z0-9()@:%_\\+.~#?&/=#]*)/),
      trailer: Joi.string().required().pattern(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\\+~#=]+\.[a-zA-Z0-9()]+([-a-zA-Z0-9()@:%_\\+.~#?&/=#]*)/),
      movieId: Joi.number().required(),
      nameRU: Joi.string().required().min(2),
      nameEN: Joi.string().required().min(2),
      thumbnail: Joi.string().required().pattern(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\\+~#=]+\.[a-zA-Z0-9()]+([-a-zA-Z0-9()@:%_\\+.~#?&/=#]*)/),
    }),
  }), createMovie);

router.delete('/:movieId',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().required().length(24).hex(),
    }),
  }), deleteMovie);

module.exports = router;
