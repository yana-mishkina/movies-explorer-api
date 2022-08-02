const router = require('express').Router();
const { movieValidation, deleteMovieValidation } = require('../middlewares/validation');

const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');

router.get('/movies', getMovies);

router.post('/movies', movieValidation, createMovie);

router.delete('/movies/:movieId', deleteMovieValidation, deleteMovie);

module.exports = router;
