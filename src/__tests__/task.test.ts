import request from 'supertest';
import app from '../index';
import { closeDB, connectDB } from '../db';
import { TaskModel } from '../models/task/Task';
import { UserModel } from '../models/user/User';

const dbUriTest =
  process.env.DB_URI_TEST || 'mongodb://localhost:27017/todo-db-test';

describe('Task API Tests', () => {
  let taskId: string;
  let userId: string;

  beforeAll(async () => {
    try {
      await connectDB(dbUriTest);
      console.log('🔍 Conectando ao banco de dados de testes:');

      await TaskModel.deleteMany({});
      await UserModel.deleteMany({});
    } catch (error) {
      console.error('Erro ao conectar ao banco de dados de teste:', error);
    }
  });

  afterAll(async () => {
    await closeDB();
  });

  test('Should register a new user', async () => {
    const response = await request(app).post('/api/auth/register').send({
      name: 'John Doe',
      email: 'john@email.com',
      password: 'Aa1@bcde',
    });

    expect(response.status).toBe(201);
    expect(response.body.name).toEqual('John Doe');

    userId = response.body._id;
  });

  test('Should log in as user', async () => {
    const response = await request(app).post('/api/auth/login').send({
      email: 'john@email.com',
      password: 'Aa1@bcde',
    });

    expect(response.status).toBe(200);
  });

  test('Should create a new Task', async () => {
    expect(userId).toBeDefined();

    const response = await request(app).post('/api/tasks').send({
      title: 'Minha Tarefa',
      userId: userId,
    });

    expect(response.status).toBe(201);
    expect(response.body.title).toEqual('Minha Tarefa');
    expect(response.body.user._id).toEqual(userId);

    taskId = response.body._id;
  });

  test('Should list all Tasks', async () => {
    const response = await request(app).get('/api/tasks');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
  });

  test('Should get a Task by ID', async () => {
    expect(taskId).toBeDefined();

    const response = await request(app).get(`/api/tasks/${taskId}`);

    expect(response.status).toBe(200);
    expect(response.body._id).toEqual(taskId);
  });

  test('Should update a task', async () => {
    expect(taskId).toBeDefined();

    console.log(taskId);

    const response = await request(app).put(`/api/tasks/${taskId}`).send({
      description: 'Updated description',
    });
    console.log(response.body);
    console.log(response.body.description);

    expect(response.status).toBe(200);
    expect(response.body._id).toEqual(taskId);
    expect(response.body.description).toEqual('Updated description');
  });

  test('Should update the status of a task', async () => {
    expect(taskId).toBeDefined();

    console.log(taskId);

    const response = await request(app)
      .patch(`/api/tasks/${taskId}/status`)
      .send({
        status: 'em progresso',
      });
    console.log(response.body);
    console.log(response.body.status);

    expect(response.status).toBe(200);
    expect(response.body._id).toEqual(taskId);
    expect(response.body.status).toEqual('em progresso');
  });

  test('Should delete a task', async () => {
    expect(taskId).toBeDefined();

    const response = await request(app).delete(`/api/tasks/${taskId}`);

    expect(response.status).toBe(204);
  });
});
