const router = require('express').Router();
const { login, createUser } = require('../controllers/users');
const { userLoginValidation, userCreateValidation } = require('../middlewares/validation');

router.post('/signin', userLoginValidation, login);

router.post('/signup', userCreateValidation, createUser);

module.exports = router;
