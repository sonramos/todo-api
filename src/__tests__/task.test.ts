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
      console.log('Erro ao conectar ao banco de dados de teste:', error);
      throw error;
    }
  });

  afterAll(async () => {
    await closeDB();
    console.log('🔍 Fechando conexão com o banco de dados de testes.');
  });

  test('Should register a new user', async () => {
    console.log('tested!!');
    const response = await request(app).post('/api/auth/register').send({
      name: 'John Doe',
      email: 'john@email.com',
      password: 'Aa1@bcde',
    });

    console.log('Resposta', response);
    console.log('Resposta de registro', response.body);
    console.log('Resposta de registro', response.body._id);

    expect(response.status).toBe(201);
    expect(response.body.name).toEqual('John Doe');

    userId = response.body._id;
  });

  test('Should log in as user', async () => {
    console.log('logged in!!');
    const response = await request(app).post('/api/auth/login').send({
      email: 'john@email.com',
      password: 'Aa1@bcde',
    });

    console.log('Resposta de login', response.body);
    expect(response.status).toBe(200);
  });

  test('Should create a new Task', async () => {
    expect(userId).toBeDefined();
    console.log('tested!!');
    console.log(userId);

    const response = await request(app).post('/api/tasks').send({
      title: 'Minha Tarefa',
      userId: userId,
    });

    console.log('Resposta', response);
    console.log('Resposta de registro', response.body);

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

  test('Should get an Task by ID', async () => {
    expect(taskId).toBeDefined();

    const response = await request(app).get(`/api/tasks/${taskId}`);

    console.log('GetId test');
    console.log(response.body);

    expect(response.status).toBe(200);
    expect(response.body._id).toEqual(taskId);
  });

  // test('Should update an user', async () => {
  //   const response = await request(app).put(`/api/tasks/${userId}`).send({
  //     name: 'Updated Name',
  //   });

  //   expect(response.status).toBe(200);
  //   expect(response.body.name).toBe('Updated Name');
  // });

  // test('Should delete an user', async () => {
  //   const response = await request(app).delete(`/api/tasks/${userId}`);

  //   expect(response.status).toBe(204);
  // });
});
