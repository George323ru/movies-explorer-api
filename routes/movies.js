const router = require('express').Router()
const { celebrate, Joi } = require('celebrate')
const {
  createMovie, getMovies, deleteMovie,
} = require('../controllers/movies')

router.get('/', getMovies)

router.post('/',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().pattern(
        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\\+~#=]+\.[a-zA-Z0-9()]+([-a-zA-Z0-9()@:%_\\+.~#?&/=#]*)/,
      ),
    }),
  }), createMovie)

router.delete('/:movieId',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().required().length(24).hex(),
    }),
  }), deleteMovie)

module.exports = router