import { Router } from 'express';
import auth from './auth';
import userRoutes from './userRoutes';
import taskRoutes from './taskRoutes';

const router = Router();

export default (): Router => {
  auth(router);
  userRoutes(router);
  taskRoutes(router);

  return router;
};
