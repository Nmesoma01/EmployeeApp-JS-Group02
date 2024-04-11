import Employee from './Employee';
import { prompt } from './prompt';

const employees = [];

export function addEmployee() {
  const id = prompt('Enter employee ID: ');
  const name = prompt('Enter employee name: ');
  const department = prompt('Enter employee department: ');
  const salary = prompt('Enter employee salary: ');

  const employee = new Employee(id, name, department, salary);
  employees.push(employee);
}

export function displayEmployeeDetails(employee) {
  console.log('============');
  console.log(`Employee ID: ${employee.id} details:`);
  console.log(`\tEmployee Name: ${employee.name}`);
  console.log(`\tEmployee Department: ${employee.department}`);
  console.log(`\tEmployee Salary: ${employee.salary}`);
  console.log('============\n');
}

export function displayEmployees() {
  for (const employee of employees) {
    displayEmployeeDetails(employee);
  }
}

export function findEmpoyeeById() {
  const id = prompt('Enter employee ID: ');
  const employee = employees.find((employee) => employee.id === id);
  if (employee) {
    displayEmployeeDetails(employee);
  } else {
    console.log('Employee was not found');
  }
}

// eslint-disable-next-line no-unused-vars
function main() {
  addEmployee();
  displayEmployees();
  addEmployee();
  displayEmployees();
}
