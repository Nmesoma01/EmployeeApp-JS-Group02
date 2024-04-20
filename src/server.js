import Joi from 'joi';
import express from 'express';
import cors from 'cors';
import fs from 'fs';
import EmployeeService from './services/Employee';
import db from './persistance/Database';
import DepartmentService from './services/Department';

const asyncFs = fs.promises;

const app = express();
const port = 8080;

db.connect();

const employeeService = new EmployeeService();
const departmentService = new DepartmentService();
app.use(cors());
app.use(express.json());

const createEmployeeSchema = Joi.object({
  name: Joi.string().min(3).max(50)
    .required(),
  departmentId: Joi.string().min(2).max(50)
    .required(),
  salary: Joi.number().integer().min(0).required(),
});

const updateEmployeeSchema = Joi.object({
  name: Joi.string().min(3).max(50),
  departmentId: Joi.string().min(2).max(50),
  salary: Joi.number().integer().min(0),
});

const createDepartmentSchema = Joi.object({
  name: Joi.string().min(3).max(50)
    .required(),
});

app.get('/employees', async (req, res) => {
  try {
    const employees = await employeeService.getAll();
    res.json(employees.map((emp) => emp.getJson()));
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/employees/:id', async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(400).json({ error: 'Id parameter is required' });
    return;
  }
  const employee = await employeeService.getById(id);
  if (!employee) {
    res.status(404).json({ error: 'Employee not found' });
  } else {
    res.json(employee.getJson());
  }
});

app.post('/employees', async (req, res) => {
  try {
    const newEmployeeData = req.body;
    console.log(newEmployeeData);
    const { error } = createEmployeeSchema.validate(newEmployeeData);
    console.log(error, '====');
    if (error) {
      res.status(400).json({ error: error.details[0].message });
    } else {
      const department = await departmentService.getById(newEmployeeData.departmentId);
      console.log(department, '=== department');
      if (!department) {
        res.status(400).json({ error: 'Department not found' });
        return;
      }
      newEmployeeData.departmentName = department.name;
      const newEmployee = await employeeService.create(newEmployeeData);
      res.status(201).json(newEmployee.getJson());
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.put('/employees/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedEmployeeData = req.body;

    console.log(updatedEmployeeData);

    const { error } = updateEmployeeSchema.validate(updatedEmployeeData);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const updatedEmployee = await employeeService.update(updatedEmployeeData, id);
    return res.json(updatedEmployee.getJson());
  } catch (error) {
    console.log(error);
    if (error.message === 'Employee ID is required') {
      return res.status(400).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Internal server error' });
  }
});

app.delete('/employees/:id', async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ error: 'Id parameter is required' });
  }
  try {
    await employeeService.delete(id);
    return res.status(204).send();
  } catch (error) {
    if (error.message === 'Unable to delete the employee') {
      return res.status(404).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/employees/:id/report', async (req, res) => {
  const { id } = req.params;
  const { report } = req.body;
  if (!id) {
    return res.status(400).json({ error: 'Id parameter is required' });
  }
  try {
    const employee = await employeeService.getById(id);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    const parent = '/tmp/reports';
    await asyncFs.mkdir(parent, { recursive: true });
    const path = `/tmp/reports/${id}.md`;
    await asyncFs.writeFile(path, report, 'utf-8');
    return res.status(201).json({ report });
  } catch (error) {
    if (error.message === 'Employee not found') {
      return res.status(404).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/employees/:id/report', async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ error: 'Id parameter is required' });
  }
  try {
    const employee = await employeeService.getById(id);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    const path = `/tmp/reports/${id}.md`;
    const report = await asyncFs.readFile(path, 'utf-8');
    return res.status(200).json({ report });
  } catch (error) {
    if (error.message === 'Employee not found') {
      return res.status(404).json({ error: error.message });
    }
    if (error.code === 'ENOENT') {
      return res.status(200).json({ report: '' });
    }
    return res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/departments', async (req, res) => {
  try {
    const departments = await departmentService.getAll();
    res.json(departments.map((dep) => dep.getJson()));
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/departments/:id', async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(400).json({ error: 'Id parameter is required' });
    return;
  }
  const department = await departmentService.getById(id);
  if (!department) {
    res.status(404).json({ error: 'Department not found' });
  } else {
    res.json(department.getJson());
  }
});

app.post('/departments', async (req, res) => {
  try {
    const newDepartmentData = req.body;
    const { error } = createDepartmentSchema.validate(newDepartmentData);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const newDepartment = await departmentService.create(newDepartmentData);
    return res.status(201).json(newDepartment.getJson());
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on port ${port}`);
});
