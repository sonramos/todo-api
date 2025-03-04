import express from 'express';

import { createUser, getUserByEmail } from '../models/user/User';
import { authentication, random } from '../helpers';

export const login = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.sendStatus(400);
      return;
    }

    const user = await getUserByEmail(email).select(
      '+authentication.salt +authentication.password',
    );

    console.log(user);

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
    console.log(error);
    res.sendStatus(400);
  }
};

export const register = async (
  req: express.Request,
  res: express.Response,
): Promise<void> => {
  try {
    const { email, name, password } = req.body;

    console.log(email, name, password);

    if (!email || !name || !password) {
      res.sendStatus(400);
      return;
    }

    const registeredUser = await getUserByEmail(email);
    if (registeredUser) {
      res.sendStatus(400);
      return;
    }

    const salt = random();
    console.log(`Salt gerado: ${salt}`);

    const hashedPassword = authentication(salt, password);
    console.log(`Senha hash gerada: ${hashedPassword}`);

    if (!hashedPassword) {
      console.error('❌ Erro ao gerar hash da senha!');
      res.sendStatus(500);
      return;
    }

    const user = await createUser({
      // await createUser({
      email,
      name,
      authentication: {
        salt,
        password: hashedPassword,
      },
    });

    res.status(201).json(user).end();
    // res.status(201).end();

    return;
  } catch (error) {
    console.error(error);
    res.sendStatus(400);
    return;
  }
};
