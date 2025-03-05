import express from 'express';

import {} from '../models/user/User';
import {
  createUserService,
  deleteUserByIdService,
  findUserByIdService,
  updateUserByIdService,
  findAllUsersService,
} from '../services/userService';

// CREATE - Create a user
export const createUserController = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const newUser = await createUserService(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(400).json({
      error: error.errors || 'Error on User register',
    });
  }
};

// GET - Read all users
export const findAllUsers = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const users = await findAllUsersService();
    res.status(200).json(users);
    return;
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
    return;
  }
};

// GET - Read user by ID
export const findUserById = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const { id } = req.params;
    const user = await findUserByIdService(id);

    if (!user) {
      res.sendStatus(404);
      return;
    }

    res.status(200).json(user);
    return;
  } catch (error) {
    console.error(error);
    res.sendStatus(400);
    return;
  }
};

export const updateUser = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;

    const existingUser = await findUserByIdService(id);
    if (!existingUser) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    const updatedUser = await updateUserByIdService(id, { name, email });

    res.status(200).json(updatedUser).end();
    return;
  } catch (error) {
    console.error(error);
    res.sendStatus(400);
    return;
  }
};

// DELETE - Remove user by ID
export const deleteUser = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const { id } = req.params;

    const deletedUser = await deleteUserByIdService(id);

    res.status(204).json(deletedUser);
    return;
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
    return;
  }
};
