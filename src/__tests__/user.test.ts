import request from 'supertest';
import app from '../index';
import { closeDB, connectDB } from '../db';
import { UserModel } from '../models/user/User';

const dbUriTest =
  process.env.DB_URI_TEST || 'mongodb://localhost:27017/todo-db-test';

describe('User API Tests', () => {
  let userId: string;

  beforeAll(async () => {
    try {
      await connectDB(dbUriTest);

      await UserModel.deleteMany({});
    } catch (error) {
      console.error(error);
      throw error;
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

  test('Should list all users', async () => {
    const response = await request(app).get('/api/users');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
  });

  test('Should get an user by ID', async () => {
    const response = await request(app).get(`/api/users/${userId}`);
    expect(response.status).toBe(200);
  });

  test('Should update an user', async () => {
    const response = await request(app).put(`/api/users/${userId}`).send({
      name: 'Updated Name',
    });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe('Updated Name');
  });

  test('Should delete an user', async () => {
    const response = await request(app).delete(`/api/users/${userId}`);

    expect(response.status).toBe(204);
  });
});
