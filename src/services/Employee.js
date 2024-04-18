/* eslint-disable class-methods-use-this */
import { v4 as uuidv4 } from 'uuid';
import Employee from '../models/Employee';
import EmployeeTable from '../persistance/Employee';

export default class EmployeeService {
  employeeTable = null;

  constructor() {
    this.employeeTable = new EmployeeTable();
  }

  async create(employeeData) {
    const newEmployeeData = { ...employeeData, id: uuidv4() };
    const newEmployee = new Employee(newEmployeeData);
    await this.employeeTable.create(newEmployee);
    return newEmployee;
  }

  async getById(id) {
    return this.employeeTable.getEmployeeById(id);
  }

  async getAll() {
    return this.employeeTable.getEmployees();
  }

  async delete(id) {
    return this.employeeTable.deleleEmployee(id);
  }

  async update(employeeData, id) {
    const employee = await this.employeeTable.getEmployeeById(id);
    if (!employee) {
      throw new Error('Employee ID is required');
    }
    const updateEmployeeInfo = {
      id: employee.id,
      name: employeeData.name || employee.name,
      department: employeeData.department || employee.department,
      salary: employeeData.salary || employee.salary,
    };

    employee.update(updateEmployeeInfo);

    await this.employeeTable.updateEmployee(employee);
    return employee;
  }
}
