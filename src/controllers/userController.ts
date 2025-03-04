import express from 'express';

import {
  deleteUserById,
  getUserById,
  getUsers,
  updateUserById,
} from '../models/user/User';

// GET - Read all users
export const findAllUsers = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const users = await getUsers();
    console.log('Consultou');
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
    const user = await getUserById(id);

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

    // Verificar se o usuário existe
    const existingUser = await getUserById(id);
    if (!existingUser) {
      res.status(404).json({ error: 'Usuário não encontrado' });
      return;
    }

    const updatedUser = await updateUserById(id, { name, email });

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

    const deletedUser = await deleteUserById(id);

    res.status(204).json(deletedUser);
    return;
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
    return;
  }
};
