const router = require('express').Router();
const auth = require('../middlewares/auth');
const authRouters = require('./auth');
const userRouter = require('./users');
const movieRouter = require('./movies');
const NotFoundError = require('../errors/NotFoundError');

router.use(authRouters);
router.use(auth, userRouter);
router.use(auth, movieRouter);

router.use('*', () => {
  throw new NotFoundError('Страница не найдена');
});

module.exports = router;
