/* eslint-disable class-methods-use-this */
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import ManagerTable from '../persistance/Manager';
import Manager from '../models/manager';

export default class ManagerService {
  managerTable = null;

  constructor() {
    this.managerTable = new ManagerTable();
  }

  async create(managerData) {
    const manager = await this.managerTable.getManagerByUsername(managerData.username);
    if (manager) {
      throw new Error('Username already exists');
    }
    const hashedPassword = await bcrypt.hash(managerData.password, 10);
    const newManagerData = { ...managerData, id: uuidv4(), password: hashedPassword };
    const newManager = new Manager(newManagerData);
    await this.managerTable.create(newManager);
    return newManager;
  }

  async login(username, password) {
    const manager = await this.managerTable.getManagerByUsername(username);
    if (!manager) {
      throw new Error('Invalid username or password');
    }

    const isValid = await manager.checkPassword(password);
    if (!isValid) {
      throw new Error('Invalid username or password');
    }
    return manager;
  }

  async getById(id) {
    return this.managerTable.getManagerById(id);
  }

  async getAll() {
    return this.managerTable.getManagers();
  }

  async delete(id) {
    return this.managerTable.deleteManager(id);
  }

  async update(managerData, id) {
    const manager = await this.employeeTable.getEmployeeById(id);
    if (!manager) {
      throw new Error('manager ID is required');
    }

    manager.update({ name: managerData.name });

    await this.managerTable.updateManager(manager);
    return manager;
  }
}
