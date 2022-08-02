const router = require('express').Router();
const { updateUserValidation } = require('../middlewares/validation');

const {
  getCurrentUser,
  updateInfo,
} = require('../controllers/users');

router.get('/users/me', getCurrentUser);

router.patch('/users/me', updateUserValidation, updateInfo);

module.exports = router;
