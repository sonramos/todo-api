import express from 'express';
import { findUserByIdService } from '../services/userService';
import {
  createTaskService,
  findAllTasksService,
  findTaskByIdService,
} from '../services/taskService';

// CREATE - Create a task
export const createTaskController = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const { title, description, status, userId } = req.body;

    const user = findUserByIdService(userId);
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      throw new Error('Invalid user');
    }

    const newTask = await createTaskService({
      title,
      description,
      status,
      userId,
    });
    res.status(201).json(newTask);
  } catch (error) {
    console.error(error);
    res.status(400).json({
      error: error.errors || 'Error creating Task',
    });
  }
};

// GET - Read all tasks
export const findAllTasksController = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const tasks = await findAllTasksService();
    res.status(200).json(tasks);
    return;
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
    return;
  }
};

// GET - Read task by ID
export const findTaskByIdController = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const { id } = req.params;
    const task = await findTaskByIdService(id);

    if (!task) {
      res.sendStatus(404);
      return;
    }

    res.status(200).json(task);
    return;
  } catch (error) {
    console.error(error);
    res.sendStatus(400);
    return;
  }
};
