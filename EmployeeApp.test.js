const Employee = require('./EmployeeApp');

describe('Employee Class', () => {
    test('Constructor sets properties correctly', () => {
        const employee = new Employee(1, 'John Doe', 'Engineering', 5000);
        expect(employee.getId()).toBe(1);
        expect(employee.getName()).toBe('John Doe');
        expect(employee.getDepartment()).toBe('Engineering');
        expect(employee.getSalary()).toBe(5000);
    });
});