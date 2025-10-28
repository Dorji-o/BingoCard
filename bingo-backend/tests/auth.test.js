import request from 'supertest';
import express from 'express';
import authRoutes from '../routes/authRoutes.js';

const app = express();
app.use(express.json());
app.use('/api/auth', authRoutes);

describe('Auth API', () => {
  let testEmail = `test${Date.now()}@example.com`;

  it('should register a new user', async () => {
    const res = await request(app).post('/api/auth/register').send({
      username: 'TestUser',
      email: testEmail,
      password: 'password123'
    });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('message', 'User registered successfully');
  });

  it('should login successfully', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: testEmail,
      password: 'password123'
    });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('accessToken');
    expect(res.body).toHaveProperty('refreshToken');
  });
});
