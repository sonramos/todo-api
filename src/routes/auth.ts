import { Router } from 'express';

import { login, register } from '../controllers/authController';

export default (router: Router) => {
  router.post('/auth/register', register);
  router.post('/auth/login', login);
};
