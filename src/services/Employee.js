/* eslint-disable class-methods-use-this */
import { v4 as uuidv4 } from 'uuid';
import Employee from '../models/Employee';
import EmployeeTable from '../persistance/Employee';
import DepartmentTable from '../persistance/Department';

export default class EmployeeService {
  employeeTable = null;

  departmentTable = null;

  constructor() {
    this.employeeTable = new EmployeeTable();
    this.departmentTable = new DepartmentTable();
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

    const department = await this.departmentTable
      .getDepartmentById(employeeData.departmentId || employee.departmentId);
    if (!department) {
      throw new Error('Department not found');
    }
    const updateEmployeeInfo = {
      id: employee.id,
      name: employeeData.name || employee.name,
      departmentId: employeeData.departmentId || employee.departmentId,
      departmentName: department.name,
      salary: employeeData.salary || employee.salary,
    };

    employee.update(updateEmployeeInfo);

    await this.employeeTable.updateEmployee(employee);
    return employee;
  }
}
