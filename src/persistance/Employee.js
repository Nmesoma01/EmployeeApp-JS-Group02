/* eslint-disable class-methods-use-this */
import db from './Database';
import Employee from '../models/Employee';
import {
  del, delAll, get, getAll, set,
} from './cache';

export default class EmployeeTable {
  async create(employee) {
    const query = `INSERT INTO employees (id, name, department_id, salary) VALUES ('${employee.id}', '${employee.name}', '${employee.departmentId}', '${employee.salary}')`;
    await db.query(query);
    await set(`EMPLOYEE:${employee.id}`, employee.getJson());
    await delAll('DEPARTMENT:*');
    return employee;
  }

  async getEmployeeById(id) {
    const query = `SELECT * FROM employeeInfo WHERE id = '${id}'`;
    const cachedEmployee = await get(`EMPLOYEE:${id}`);
    if (cachedEmployee) {
      return new Employee(cachedEmployee);
    }
    const [[employee]] = await db.query(query);
    if (!employee) {
      return null;
    }
    await set(`EMPLOYEE:${id}`, {
      ...employee,
      departmentId: employee.department_id,
      departmentName: employee.department_name,
    });
    return new Employee({
      ...employee,
      departmentId: employee.department_id,
      departmentName: employee.department_name,
    });
  }

  async getEmployees() {
    const query = 'SELECT * FROM employeeInfo';
    const cachedEmployees = await getAll('EMPLOYEE:*');
    if (cachedEmployees.length > 0) {
      return cachedEmployees.map((employee) => new Employee(employee));
    }
    const [employees] = await db.query(query);
    const allEmployees = employees
      .map((employee) => new Employee({
        ...employee,
        departmentId: employee.department_id,
        departmentName: employee.department_name,
        id: employee.id,
      }));
    await Promise.all(allEmployees.map(async (employee) => {
      await set(`EMPLOYEE:${employee.id}`, employee.getJson());
    }));
    return allEmployees;
  }

  async deleleEmployee(id) {
    const query = `DELETE FROM employees WHERE id = '${id}'`;
    const [result] = await db.query(query);
    await del(`EMPLOYEE:${id}`);
    await delAll('DEPARTMENT:*');
    if (result.affectedRows === 0) {
      throw new Error('Unable to delete the employee');
    }
    return result;
  }

  async updateEmployee(employee) {
    const query = `UPDATE employees SET name = '${employee.name}', department_id = '${employee.departmentId}', salary = '${employee.salary}' WHERE id = '${employee.id}'`;
    const [result] = await db.query(query);
    await set(`EMPLOYEE:${employee.id}`, employee.getJson());
    await delAll('DEPARTMENT:*');
    if (result.changedRows === 0) {
      throw new Error('Unable to update the employee');
    }
    return result;
  }
}
