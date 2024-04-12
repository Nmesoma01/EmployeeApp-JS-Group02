/* eslint-disable class-methods-use-this */
import db from './Database';
import Employee from '../models/Employee';

export default class EmployeeTable {
  async create(employee) {
    const query = `INSERT INTO employees (id, name, department, salary) VALUES ('${employee.id}', '${employee.name}', '${employee.department}', '${employee.salary}')`;
    const [result] = await db.query(query);
    return result;
  }

  async getEmployeeById(id) {
    const query = `SELECT * FROM employees WHERE id = '${id}'`;
    const [[employee]] = await db.query(query);
    if (!employee) {
      return null;
    }
    return new Employee(employee);
  }

  async getEmployees() {
    const query = 'SELECT * FROM employees';
    const [employees] = await db.query(query);
    return employees
      .map((employee) => new Employee(employee));
  }

  async deleleEmployee(id) {
    const query = `DELETE FROM employees WHERE id = '${id}'`;
    const [result] = await db.query(query);
    if (result.affectedRows === 0) {
      throw new Error('Unable to delete the employee');
    }
    return result;
  }

  async updateEmployee(employee) {
    const query = `UPDATE employees SET name = '${employee.name}', department = '${employee.department}', salary = '${employee.salary}' WHERE id = '${employee.id}'`;
    const [result] = await db.query(query);
    if (result.changedRows === 0) {
      throw new Error('Unable to update the employee');
    }
    return result;
  }
}
