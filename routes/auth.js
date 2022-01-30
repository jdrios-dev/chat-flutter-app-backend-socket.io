/*
  path: api/login
*/ 
const { Router } = require('express');
const { check } = require('express-validator');
const { createUser, loginUser, renewToken } = require('../controllers/auth');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

router.post('/new', [
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Email is required').not().isEmpty(),
  check('email', 'Email should be valid').isEmail(),
  check('password', 'Password is required').not().isEmpty(),
  check('password', 'Password should be at least 6 character').isLength(6),
  validateFields
],createUser);

router.post('/', [
  check('email', 'Email is required').not().isEmpty().isEmail(),
  check('password', 'Password is required').not().isEmpty(),
  validateFields
], loginUser);

router.get('/renew', validateJWT, renewToken);

module.exports = router;