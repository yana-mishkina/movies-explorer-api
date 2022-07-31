const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { url } = require('../regex/regex');

const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');

router.get('/', getMovies);

router.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required().min(2),
    director: Joi.string().required().min(2),
    duration: Joi.number().required(),
    year: Joi.string().required().length(4),
    description: Joi.string().required().min(2),
    image: Joi.string().regex(url).required(),
    trailer: Joi.string().regex(url).required(),
    movieId: Joi.number().required(),
    thumbnail: Joi.string().regex(url).required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
}), createMovie);

router.delete('/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required().hex().length(24),
  }),
}), deleteMovie);

module.exports = router;
