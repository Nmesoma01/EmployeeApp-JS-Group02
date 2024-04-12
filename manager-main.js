/* eslint-disable no-console */
import Manager from './src/models/manager';

// Create a Manager instance
const manager = new Manager(1, 'John Doe', 'Sales', 5000, 1000);

// Log manager information
console.log('Manager Name:', manager.name); // Accessing name property directly
console.log('Department:', manager.department); // Accessing department property directly
console.log('Base Salary:', manager.salary); // Accessing salary property directly
console.log('Bonus:', manager.bonus); // Use the bonus getter
console.log('Total Paycheck:', manager.calculatePaycheck());
