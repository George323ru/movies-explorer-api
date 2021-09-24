const moviesRoutes = require('express').Router();
const { celebrate } = require('celebrate');
const {
  createMovie, getMovies, deleteMovie,
} = require('../controllers/movies');
const { createMovieJoi, deleteMovieJoi } = require('../utils/utils');

moviesRoutes.get('/', getMovies);

moviesRoutes.post('/',
  celebrate({
    body: createMovieJoi,
  }), createMovie);

moviesRoutes.delete('/:movieId',
  celebrate({
    params: deleteMovieJoi,
  }), deleteMovie);

module.exports = moviesRoutes;
