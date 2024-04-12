/* eslint-disable no-console */
import db from './src/persistance/Database';

import EmployeeService from './src/services/Employee';

async function main() {
  db.connect();
  const employeeService = new EmployeeService();
  const newEmployee = await employeeService.create({
    id: '1',
    name: 'John Doe',
    department: 'IT',
    salary: 50000,
  });
  console.log(newEmployee.name, newEmployee.id, '==== new employee ====');
  const allEmployees = await employeeService.getAll();
  console.log(allEmployees);
  console.log(allEmployees.length);
  const employee = await employeeService.getById('1');
  console.log(employee.name, '==== fetched employee ====');
  console.log(employee.id, '===== id ====');
  await employeeService.update({
    name: 'Jane Doe',
  }, '1');

  const updatedEmployee = await employeeService.getById('1');
  console.log(updatedEmployee.name, '==== updated employee ====');
  await employeeService.delete('1');
  console.log('Employee deleted');
  db.disconnect();
}

main();
