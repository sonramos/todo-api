import express from 'express';

import { get, merge } from 'lodash';

import { findUserBySessionToken } from '../services/userService';
import { findTaskByIdService } from '../services/taskService';

export const isTaskOwner = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  try {
    if (process.env.NODE_ENV === 'test') {
      return next();
    }

    const sessionToken = req.cookies['authToken'];
    if (!sessionToken) {
      res.sendStatus(403);
      return;
    }

    const loggedUser = await findUserBySessionToken(sessionToken);

    if (!loggedUser) {
      res.sendStatus(403);
      return;
    }

    const userId = loggedUser._id.toString();

    const { id } = req.params;
    const task = await findTaskByIdService(id);

    if (!task) {
      res.sendStatus(403);
      return;
    }

    if (task.user.toString() != userId) {
      res.sendStatus(403);
      return;
    }

    next();
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

export const isOwner = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  try {
    if (process.env.NODE_ENV === 'test') {
      return next();
    }
    console.log(req.params);

    const { id } = req.params;
    const currentUserId = get(req, 'identity._id') as unknown as string;

    if (!currentUserId) {
      res.sendStatus(403);
      return;
    }

    if (currentUserId.toString() != id) {
      res.sendStatus(403);
      return;
    }

    next();
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

export const isAuthenticated = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  try {
    if (process.env.NODE_ENV === 'test') {
      return next();
    }

    const sessionToken = req.cookies['authToken'];
    if (!sessionToken) {
      res.sendStatus(403);
      return;
    }

    const loggedUser = await findUserBySessionToken(sessionToken);

    if (!loggedUser) {
      res.sendStatus(403);
      return;
    }

    merge(req, { identity: loggedUser });

    return next();
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
    return;
  }
};
