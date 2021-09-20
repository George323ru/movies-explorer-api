const { Joi } = require('celebrate')

const signupJoi = Joi.object().keys({
  email: Joi.string().required().email(),
  password: Joi.string().required().min(8),
  name: Joi.string().required().min(2).max(30),
})

const signinJoi = Joi.object().keys({
  email: Joi.string().required().email(),
  password: Joi.string().required().min(8),
})

module.exports = {
  signupJoi,
  signinJoi,
}