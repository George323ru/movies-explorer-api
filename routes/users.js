const router = require('express').Router();
const { celebrate } = require('celebrate');
const {
  getCurrentUser,
  patchUser,
} = require('../controllers/users');
const { patchUserJoi } = require('../utils/utils');

router.get('/me', getCurrentUser);

router.patch('/me',
  celebrate({
    body: patchUserJoi,
  }), patchUser);

module.exports = router;
