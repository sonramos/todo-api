import express from 'express';

import {
  createTaskController,
  findAllTasksController,
  findTaskByIdController,
  updateTaskController,
  deleteTaskController,
} from '../controllers/taskController';
import { isAuthenticated, isTaskOwner } from '../middlewares';

export default (router: express.Router) => {
  router.post('/tasks', isAuthenticated, createTaskController);
  router.get('/tasks', isAuthenticated, findAllTasksController);
  router.get('/tasks/:id', isAuthenticated, findTaskByIdController);
  router.put('/tasks/:id', isAuthenticated, isTaskOwner, updateTaskController);
  router.delete(
    '/tasks/:id',
    isAuthenticated,
    isTaskOwner,
    deleteTaskController,
  );
};
