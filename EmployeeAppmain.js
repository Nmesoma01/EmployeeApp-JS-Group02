const Employee = require('./EmployeeApp');

const employee1 = new Employee(1, 'John Doe', 'Engineering', 5000);
const employee2 = new Employee(2, 'Mimi Jeff', 'Marketing', 6000);

console.log('Employee 1:');
console.log('ID:', employee1.getId());
console.log('Name:', employee1.getName());
console.log('Department:', employee1.getDepartment());
console.log('Salary:', employee1.getSalary());
console.log();

console.log('Employee 2:');
console.log('ID:', employee2.getId());
console.log('Name:', employee2.getName());
console.log('Department:', employee2.getDepartment());
console.log('Salary:', employee2.getSalary());
