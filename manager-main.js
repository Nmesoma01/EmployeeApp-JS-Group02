const Manager = require('./manager');

// Create a Manager instance
const manager = new Manager(1, 'John Doe', 'Sales', 5000, 1000);

// Get manager details
console.log('Manager Name:', manager.getName());
console.log('Department:', manager.getDepartment());
console.log('Base Salary:', manager.getSalary());
console.log('Bonus:', manager.getBonus());

// Calculate and print paycheck
console.log('Total Paycheck:', manager.calculatePaycheck());
