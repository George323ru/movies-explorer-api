const router = require('express').Router()
const { celebrate, Joi } = require('celebrate')
const {
  getCurrentUser,
  patchUser,
} = require('../controllers/users.js')

router.get('/me', getCurrentUser)

router.patch('/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      about: Joi.string().required().min(2).max(30),
    }),
  }), patchUser)

module.exports = router