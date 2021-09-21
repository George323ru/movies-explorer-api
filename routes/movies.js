const router = require('express').Router();
const { celebrate } = require('celebrate');
const {
  createMovie, getMovies, deleteMovie,
} = require('../controllers/movies');
const { createMovieJoi, deleteMovieJoi } = require('../utils/utils');

router.get('/', getMovies);

router.post('/',
  celebrate({
    body: createMovieJoi,
  }), createMovie);

router.delete('/:movieId',
  celebrate({
    params: deleteMovieJoi,
  }), deleteMovie);

module.exports = router;
