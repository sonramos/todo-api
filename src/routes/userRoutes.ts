import express from 'express';
import { isAuthenticated, isOwner } from '../middlewares';

import {
  createUserController,
  deleteUser,
  findAllUsers,
  findUserById,
  updateUser,
} from '../controllers/userController';

export default (router: express.Router) => {
  router.post('/users', createUserController);
  router.get('/users', isAuthenticated, findAllUsers);
  router.get('/users/:id', isAuthenticated, findUserById);
  router.delete('/users/:id', isAuthenticated, isOwner, deleteUser);
  router.put('/users/:id', isAuthenticated, isOwner, updateUser);
};
