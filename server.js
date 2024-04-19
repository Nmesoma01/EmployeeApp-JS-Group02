import Joi from 'joi';
import express from 'express';
import EmployeeService from './Employee';
import db from './persistance/Database';

const app = express();
const port = 8080;

db.connect();

const employeeService = new EmployeeService();

app.use(express.json());

const createEmployeeSchema = Joi.object({
  name: Joi.string().min(3).max(50)
    .required(),
  department: Joi.string().min(2).max(50)
    .required(),
  salary: Joi.number().integer().min(0).required(),
});

const updateEmployeeSchema = Joi.object({
  name: Joi.string().min(3).max(50),
  department: Joi.string().min(2).max(50),
  salary: Joi.number().integer().min(0),
});

app.get('/employees', async (req, res) => {
  try {
    const { department, minSalary, maxSalary } = req.query;

    const criteria = {};
    if (department) {
      criteria.department = department;
    }
    if (minSalary) {
      criteria.minSalary = parseInt(minSalary);
    }
    if (maxSalary) {
      criteria.maxSalary = parseInt(maxSalary);
    }
    const employees = await employeeService.getAll(criteria);
    res.json(employees.map((emp) => emp.getJson()));
  } catch (error) {
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
    const { error } = createEmployeeSchema.validate(newEmployeeData);
    if (error) {
      res.status(400).json({ error: error.details[0].message });
    } else {
      const newEmployee = await employeeService.create(newEmployeeData);
      res.status(201).json(newEmployee.getJson());
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.put('/employees/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedEmployeeData = req.body;

    const { error } = updateEmployeeSchema.validate(updatedEmployeeData);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const updatedEmployee = await employeeService.update(updatedEmployeeData, id);
    return res.json(updatedEmployee.getJson());
  } catch (error) {
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

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on port ${port}`);
});
