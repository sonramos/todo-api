import { Router } from 'express';
import auth from './auth';
import userRoutes from './userRoutes';

const router = Router();

export default (): Router => {
  auth(router);
  userRoutes(router);

  return router;
};
