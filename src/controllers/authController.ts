import express from 'express';

import { authentication, random } from '../helpers';
import { createUserService, findUserByEmail } from '../services/userService';

export const login = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.sendStatus(400);
      return;
    }

    const user = await findUserByEmail(email);

    if (!user || !user.authentication?.salt || !user.authentication?.password) {
      res.sendStatus(400);
      return;
    }

    const expectedHash = authentication(user.authentication?.salt, password);

    if (user.authentication?.password != expectedHash) {
      res.sendStatus(403);
      return;
    }

    const salt = random();
    user.authentication.sessionToken = authentication(
      salt,
      user._id.toString(),
    );

    await user.save();

    res.cookie('authToken', user.authentication?.sessionToken, {
      domain: process.env.DOMAIN || 'localhost',
      path: '/',
    });

    res.status(200).json(user).end();

    return;
  } catch (error) {
    console.error(error);
    res.sendStatus(400);
  }
};

export const register = async (
  req: express.Request,
  res: express.Response,
): Promise<void> => {
  try {
    const user = await createUserService(req.body);
    res.status(201).json(user).end();
    // res.status(201).end();
  } catch (error) {
    console.error(error);
    res.sendStatus(400);
  }
};
