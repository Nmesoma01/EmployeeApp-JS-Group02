import Joi from 'joi';
import express from 'express';
import Employee from './Employee';

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

app.get('/employees', (req, res) => {
  res.json(employees);
});

app.get('/employees/:id', (req, res) => {
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

/* const express = require('express');

const app = express();
const port = 8080;

app.use(express.json());

const users = [
  { id: 1, name: 'John Doe', age: 30 },
  { id: 2, name: 'Jane Smith', age: 25 },
  { id: 3, name: 'Tom Brown', age: 35 },
];

app.get('/users', (req, res) => {
  res.json(users);
});

app.get('/users/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const user = users.find((user) => user.id === id);
  if (!user) {
    res.status(404).json({ error: 'User not found' });
  } else {
    res.json(user);
  }
});

app.post('/users', (req, res) => {
  const newUser = req.body;
  users.push(newUser);
  res.status(201).json(newUser);
});

app.put('/users/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const updatedUser = req.body;
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) {
    users[index] = { ...users[index], ...updatedUser };
    res.json(users[index]);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

app.delete('/users/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) {
    const deletedUser = users.splice(index, 1);
    res.json(deletedUser);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); */
