import express from 'express';

import {
  createTaskController,
  findAllTasksController,
  findTaskByIdController,
} from '../controllers/taskController';
import { isAuthenticated } from '../middlewares';

export default (router: express.Router) => {
  router.post('/tasks', isAuthenticated, createTaskController);
  router.get('/tasks', isAuthenticated, findAllTasksController);
  router.get('/tasks/:id', isAuthenticated, findTaskByIdController);
  //   router.delete('/tasks/:id', isAuthenticated, isOwner, deleteTaskController);
  //   router.put('/tasks/:id', isAuthenticated, isOwner, updateTaskController);
};
