import Employee from './Employee';

describe('employee Class', () => {
  it('constructor sets properties correctly', () => {
    const employee = new Employee(1, 'John Doe', 'Engineering', 5000);
    expect(employee.id).toBe(1);
    expect(employee.name).toBe('John Doe');
    expect(employee.department).toBe('Engineering');
    expect(employee.salary).toBe(5000);
  });
});
