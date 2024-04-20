/* eslint-disable class-methods-use-this */
import { v4 as uuidv4 } from 'uuid';
import DepartmentTable from '../persistance/Department';
import Department from '../models/Department';

export default class DepartmentService {
  departmentTable = null;

  constructor() {
    this.departmentTable = new DepartmentTable();
  }

  async create(departmentData) {
    const newDepartmentData = { ...departmentData, id: uuidv4() };
    const newDepartment = new Department(newDepartmentData);
    await this.departmentTable.create(newDepartment);
    return newDepartment;
  }

  async getById(id) {
    return this.departmentTable.getDepartmentById(id);
  }

  async getAll() {
    return this.departmentTable.getDepartments();
  }

  async delete(id) {
    return this.departmentTable.deleleDepartment(id);
  }

  async update(departmentData, id) {
    const department = await this.departmentTable.getDepartmentById(id);
    if (!department) {
      throw new Error('department ID is required');
    }
    const updateDepartmentInfo = {
      id: department.id,
      name: departmentData.name || department.name,
      members: departmentData.members || department.members,
    };

    department.update(updateDepartmentInfo);

    await this.departmentTable.updateDepartment(department);
    return department;
  }
}
