const router = require('express').Router();
const { celebrate } = require('celebrate');
const NotFoundError = require('../errors/not-found-err');

const {
  createUser,
  login,
} = require('../controllers/users');
const { signupJoi, signinJoi } = require('../utils/utils');

const auth = require('../middlewares/auth');
const usersRoutes = require('./users');
const moviesRoutes = require('./movies');

router.post('/signup', celebrate({ body: signupJoi }), createUser);
router.post('/signin', celebrate({ body: signinJoi }), login);

router.use('/users', auth, usersRoutes);
router.use('/movies', auth, moviesRoutes);

router.use('*', auth, () => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
});

module.exports = router;
