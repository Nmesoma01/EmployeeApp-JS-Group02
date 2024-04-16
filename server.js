import Joi from 'joi';
import express from 'express';
import Employee from './Employee';
import { set, get } from './cache'; // Import the cache functions

const app = express();
const port = 8080;

app.use(express.json());

const employeeSchema = Joi.object({
  id: Joi.number().integer().min(1).required(),
  name: Joi.string().alphanum().min(3).max(50)
    .required(),
  department: Joi.string().alphanum().min(3).max(50)
    .required(),
  salary: Joi.number().integer().min(0).required(),
});

const employees = [
  new Employee(1, 'John Doe', 'Engineering', 5000),
  new Employee(2, 'Jane Smith', 'HR', 4500),
  new Employee(3, 'Tom Brown', 'Finance', 5500),
];

app.get('/employees', async (req, res) => {
  try {
    const cachedEmployees = await get('employees'); // Check cache first
    if (cachedEmployees) {
      res.json(cachedEmployees);
    } else {
      // If data not in cache, fetch from database and set in cache
      set('employees', employees);
      res.json(employees);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/employees/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const employee = employees.find((emp) => emp.id === id);
  if (!employee) {
    res.status(404).json({ error: 'Employee not found' });
  } else {
    res.json(employee);
  }
});

app.post('/employees', (req, res) => {
  const newEmployeeData = req.body;
  const { error } = employeeSchema.validate(newEmployeeData);
  if (error) {
    res.status(400).json({ error: error.details[0].message });
  } else {
    const newEmployee = new Employee(
      newEmployeeData.id,
      newEmployeeData.name,
      newEmployeeData.department,
      newEmployeeData.salary,
    );
    employees.push(newEmployee);
    res.status(201).json(newEmployee);
  }
});

app.put('/employees/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const updatedEmployeeData = req.body;
  const { error } = employeeSchema.validate(updatedEmployeeData);
  if (error) {
    res.status(400).json({ error: error.details[0].message });
    return;
  }
  const index = employees.findIndex((emp) => emp.id === id);
  if (index !== -1) {
    const updatedEmployee = new Employee(
      id,
      updatedEmployeeData.name,
      updatedEmployeeData.department,
      updatedEmployeeData.salary,
    );
    employees[index] = updatedEmployee;
    res.json(updatedEmployee);
  } else {
    res.status(404).json({ error: 'Employee not found' });
  }
});

app.delete('/employees/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const index = employees.findIndex((emp) => emp.id === id);
  if (index !== -1) {
    const deletedEmployee = employees.splice(index, 1);
    res.json(deletedEmployee);
  } else {
    res.status(404).json({ error: 'Employee not found' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
