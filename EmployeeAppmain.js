const Employee = require('./EmployeeApp');

const employee = new Employee(1, 'John Doe', 'Engineering', 5000);

console.log('Employee ID:', employee.id);
console.log('Employee Name:', employee.name);
console.log('Employee Department:', employee.department);
console.log('Employee Salary:', employee.salary);
