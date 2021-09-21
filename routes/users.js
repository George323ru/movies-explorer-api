const usersRoutes = require('express').Router();
const { celebrate } = require('celebrate');
const {
  getCurrentUser,
  patchUser,
} = require('../controllers/users');
const { patchUserJoi } = require('../utils/utils');

usersRoutes.get('/me', getCurrentUser);

usersRoutes.patch('/me',
  celebrate({
    body: patchUserJoi,
  }), patchUser);

module.exports = usersRoutes;
