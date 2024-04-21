import Employee from '../src/models/Employee';

describe('employee Class', () => {
  it('constructor sets properties correctly', () => {
    const employee = new Employee({
      id: '1',
      name: 'John Doe',
      departmentId: '4556',
      departmentName: 'Engineering',
      salary: 5000,
    });
    expect(employee.id).toBe('1');
    expect(employee.name).toBe('John Doe');
    expect(employee.departmentName).toBe('Engineering');
    expect(employee.salary).toBe(5000);
  });
});
