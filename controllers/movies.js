const Movie = require('../models/movie');
const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');
const ForbiddenError = require('../errors/forbidden-err');

async function getMovies(req, res, next) {
  const currentUser = req.user._id;
  let movies;

  try {
    movies = await Movie.find({ owner: currentUser });
    res.send(movies);
  } catch (error) {
    next(error);
  }
}

async function createMovie(req, res, next) {
  const {
    country, director, duration, year, description,
    image, trailer, movieId, nameRU, nameEN, thumbnail,
  } = req.body;
  const owner = req.user._id;
  console.log(owner);
  let movie;

  try {
    movie = await Movie.create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailer,
      nameRU,
      nameEN,
      thumbnail,
      movieId,
      owner,
    });
    res.status(201).send(movie);
  } catch (error) {
    if (error.name === 'ValidationError') {
      next(new BadRequestError('Переданы некорректные данные при создании карточки'));
    } else {
      next(error);
    }
  }
}

async function deleteMovie(req, res, next) {
  const { movieId } = req.params;
  const currentUserId = req.user._id;
  let movie;
  let movieData;

  try {
    movie = await Movie.findById(movieId);

    const { owner } = movie;

    if (owner.toString() !== currentUserId) {
      next(new ForbiddenError('Не хватает прав для удаления карточки'));
    }

    movieData = await Movie.findByIdAndDelete(movieId);

    if (!movieData) {
      next(new NotFoundError('Карточка с указанным _id не найдена'));
    }

    res.send(movieData);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
