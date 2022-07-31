const Movie = require('../models/movie');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');

const getMovies = (req, res, next) => {
  Movie.find({})
    .populate('owner')
    .then((movies) => {
      res.send(movies);
    })
    .catch(next);
};

const createMovie = (req, res, next) => {
  const {
    // eslint-disable-next-line max-len
    country, director, duration, year, description, image, trailer, nameRU, nameEN, thumbnail, movieId,
  } = req.body;
  const owner = req.user._id;
  Movie.create({
    // eslint-disable-next-line max-len
    country, director, duration, year, description, image, trailer, nameRU, nameEN, thumbnail, movieId, owner,
  })
    .then((movie) => {
      res.send(movie);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError(err.message);
      }
    })
    .catch(next);
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail(new NotFoundError('NotFound'))
    .then((movie) => {
      if (String(movie.owner._id) === req.user._id) {
        return Movie.findByIdAndRemove(req.params.movieId);
      }
      return next(new ForbiddenError('Ошибка доступа'));
    })
    .then((movie) => {
      res.send(movie);
    })
    .catch(next);
};

module.exports = {
  createMovie,
  deleteMovie,
  getMovies,
};
