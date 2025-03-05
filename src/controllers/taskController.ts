import express from 'express';
import { findUserByIdService } from '../services/userService';
import {
  createTaskService,
  deleteTaskByIdService,
  findAllTasksService,
  findTaskByIdService,
  updateTaskByIdService,
  updateTaskStatusByIdService,
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
    console.error(error);
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

export const updateTaskController = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;

    // Verificar se o task existe
    const existingTask = await findTaskByIdService(id);
    if (!existingTask) {
      res.status(404).json({ error: 'Task not found' });
      return;
    }

    console.log(existingTask);

    const updatedTask = await updateTaskByIdService(id, {
      title,
      description,
      status,
    });
    console.log(updatedTask);

    res.status(200).json(updatedTask).end();
    return;
  } catch (error) {
    console.error(error);
    res.sendStatus(400);
    return;
  }
};

export const updateTaskStatusByIdController = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Verificar se o task existe
    const existingTask = await findTaskByIdService(id);
    if (!existingTask) {
      res.status(404).json({ error: 'Task not found' });
      return;
    }

    const updatedTask = await updateTaskStatusByIdService(id, status);

    res.status(200).json(updatedTask).end();
    return;
  } catch (error) {
    console.error(error);
    res.sendStatus(400);
    return;
  }
};

// DELETE - Remove task by ID
export const deleteTaskController = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const { id } = req.params;

    const deletedTask = await deleteTaskByIdService(id);

    res.status(204).json(deletedTask);
    return;
  } catch (error) {
    console.error(error);
    res.sendStatus(400);
    return;
  }
};
