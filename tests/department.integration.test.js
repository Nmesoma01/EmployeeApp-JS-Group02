import request from 'supertest';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import app from '../src/app';
import { departmentTable } from '../src/persistance';
import Department from '../src/models/Department';

dotenv.config();

jest.mock('../src/persistance/Database', () => ({
  connect: jest.fn(),
  disconnect: jest.fn(),
}));

jest.mock('../src/persistance', () => ({
  departmentTable: {
    getDepartmentById: jest.fn(),
    create: jest.fn(),
    getDepartments: jest.fn(),
    deleteDepartment: jest.fn(),
    updateDepartment: jest.fn(),
  },

}));

jest.mock('redis', () => ({
  createClient: jest.fn(),
}));

const token = jwt.sign({ id: '1' }, process.env.SECRET);

describe('gET /departments', () => {
  it('should return all department', async () => {
    departmentTable.getDepartments.mockResolvedValue([
      new Department({
        id: '1',
        name: 'IT',
        members: 5,
        salary: 50000,
      }),
      new Department({
        id: '2',
        name: 'HR',
        members: 3,
      }),
    ]);
    const response = await request(app)
      .get('/departments')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2);
  });
});

describe('pOST /departments', () => {
  it('should create a new department', async () => {
    departmentTable.create.mockResolvedValue(new Department({ id: '1868', name: 'Engineering', members: 4 }));

    const response = await request(app)
      .post('/departments').send({ name: 'Engineering' })
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe('Engineering');
  });

  it('should return 400 if required fields are missing', async () => {
    const response = await request(app).post('/departments')
      .send({})
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(400);
  });
});
