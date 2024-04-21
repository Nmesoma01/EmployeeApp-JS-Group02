import request from 'supertest';
import app from '../src/server';

describe('GET /employees', () => {
  it('should return all employees', async () => {
    const response = await request(app).get('/employees');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should return 404 for non-existent route', async () => {
    const response = await request(app).get('/nonexistent-route');
    expect(response.status).toBe(404);
  });
});

describe('POST /employees', () => {
  it('should create a new employee', async () => {
    const newEmployee = {
      name: 'John Doe',
      department: 'Engineering',
      salary: 50000,
    };
    const response = await request(app).post('/employees').send(newEmployee);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe('John Doe');
  });

  it('should return 400 if required fields are missing', async () => {
    const response = await request(app).post('/employees').send({});
    expect(response.status).toBe(400);
  });
});

describe('PUT /employees/:id', () => {
  it('should update an existing employee', async () => {
    const updatedEmployee = {
      name: 'Jane Smith Updated',
      department: 'HR',
      salary: 55000,
    };
    const response = await request(app).put('/employees/1').send(updatedEmployee);
    expect(response.status).toBe(200);
    expect(response.body.name).toBe('Jane Smith Updated');
  });

  it('should return 400 if invalid data is provided', async () => {
    const response = await request(app).put('/employees/1').send({ invalidField: 'value' });
    expect(response.status).toBe(400);
  });
});

describe('DELETE /employees/:id', () => {
  it('should delete an existing employee', async () => {
    const response = await request(app).delete('/employees/1');
    expect(response.status).toBe(204);
  });

  it('should return 404 if employee with given ID does not exist', async () => {
    const response = await request(app).delete('/employees/100');
    expect(response.status).toBe(404);
  });
});
