import { TaskModel } from '../models/task/Task';
import { TaskSchema } from '../validations/taskValidation';
import { findUserByIdService } from './userService';

// CREATE
export const createTaskService = async (taskData: any) => {
  const { title, description, status, userId } = taskData;

  const user = await findUserByIdService(userId);

  const parsedData = TaskSchema.parse({
    title,
  });

  const newTask = new TaskModel({
    ...parsedData,
    description,
    status,
    user,
  });

  return newTask.save().then((task) => task.toObject());
};

// GET
// Find All
export const findAllTasksService = async () => {
  return await TaskModel.find();
};
// // Find by ID
export const findTaskByIdService = async (id: string) => {
  if (!id) {
    throw new Error('Invalid id');
  }
  return await TaskModel.findById(id);
};

// UPDATE
export const updateTaskByIdService = async (
  id: string,
  updatedData: Record<string, any>,
) => {
  return await TaskModel.findByIdAndUpdate(id, updatedData, {
    new: true,
  });
};

export const updateTaskStatusByIdService = async (
  id: string,
  status: string,
) => {
  return await TaskModel.findByIdAndUpdate(
    id,
    { status },
    { new: true, runValidators: true },
  );
};

// DELETE
export const deleteTaskByIdService = async (id: string) => {
  if (!id) {
    throw new Error('Invalid ID');
  }
  return await TaskModel.findOneAndDelete({ _id: id });
};
