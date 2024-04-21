import request from 'supertest';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import app from '../src/app';
import Employee from '../src/models/Employee';
import { employeeTable, departmentTable } from '../src/persistance';
import Department from '../src/models/Department';

dotenv.config();

jest.mock('../src/persistance/Database', () => ({
  connect: jest.fn(),
  disconnect: jest.fn(),
}));

jest.mock('../src/persistance', () => ({
  employeeTable: {
    getEmployees: jest.fn(),
    create: jest.fn(),
    getEmployeeById: jest.fn(),
    updateEmployee: jest.fn(),
    deleleEmployee: jest.fn(),
  },
  departmentTable: {
    getDepartmentById: jest.fn(),
  },

}));

jest.mock('redis', () => ({
  createClient: jest.fn(),
}));

const token = jwt.sign({ id: '1' }, process.env.SECRET);

describe('gET /employees', () => {
  it('should return all employees', async () => {
    employeeTable.getEmployees.mockResolvedValue([
      new Employee({
        id: '1',
        name: 'Jane Smith',
        departmentId: '1',
        departmentName: 'Engineering',
        salary: 50000,
      }),
      new Employee({
        id: '2',
        name: 'John Doe',
        departmentId: '2',
        departmentName: 'HR',
        salary: 55000,
      }),
    ]);
    const response = await request(app)
      .get('/employees')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body).toHaveLength(2);
  });

  it('should return 404 for non-existent route', async () => {
    const response = await request(app).get('/nonexistent-route');
    expect(response.status).toBe(404);
  });
});

describe('pOST /employees', () => {
  it('should create a new employee', async () => {
    const newEmployee = {
      name: 'John Doe',
      departmentId: '1868',
      salary: 50000,
    };

    departmentTable.getDepartmentById.mockResolvedValue(new Department({ id: '1868', name: 'Engineering', members: 3 }));

    employeeTable.create.mockResolvedValue(new Employee({ ...newEmployee, id: '1', departmentName: 'Engineering' }));
    const response = await request(app)
      .post('/employees').send(newEmployee)
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe('John Doe');
    expect(response.body.departmentId).toBe('1868');
    expect(response.body.departmentName).toBe('Engineering');
  });

  it('should return 400 if required fields are missing', async () => {
    const response = await request(app).post('/employees')
      .send({})
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(400);
  });
});

describe('pUT /employees/:id', () => {
  it('should update an existing employee', async () => {
    const updatedEmployee = {
      name: 'Jane Smith Updated',
      salary: 55000,
    };
    employeeTable.getEmployeeById.mockResolvedValue(new Employee({
      id: '1', name: 'John Doe', departmentId: '1868', salary: 50000, departmentName: 'Engineering',
    }));
    departmentTable.getDepartmentById.mockResolvedValue(new Department({ id: '1868', name: 'Engineering', members: 3 }));
    const response = await request(app)
      .put('/employees/1')
      .send(updatedEmployee)
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body.name).toBe('Jane Smith Updated');
    expect(response.body.salary).toBe(55000);
  });

  it('should return 400 if invalid data is provided', async () => {
    const response = await request(app)
      .put('/employees/1')
      .send({ invalidField: 'value' })
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(400);
  });
});

describe('dELETE /employees/:id', () => {
  it('should delete an existing employee', async () => {
    employeeTable.deleleEmployee.mockResolvedValue({ affectedRows: 1 });
    employeeTable.getEmployeeById.mockResolvedValue(new Employee({
      id: '1', name: 'John Doe', departmentId: '1868', salary: 50000, departmentName: 'Engineering',
    }));
    const response = await request(app).delete('/employees/1').set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(204);
  });

  it('should return 404 if employee with given ID does not exist', async () => {
    employeeTable.getEmployeeById.mockResolvedValue(null);
    const response = await request(app).delete('/employees/100').set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(404);
  });
});
