/* eslint-disable no-console */
import { prompt } from './prompt';
import { addEmployee, displayEmployeeDetails } from './EmployeeApp';
import Employee from './src/models/Employee';

jest.mock('./prompt', () => ({
  prompt: jest.fn(),
}));

jest.mock('./src/models/Employee');

describe('addEmployee', () => {
  it("should add an employee to the employee's list", () => {
    prompt.mockReturnValueOnce('123');
    prompt.mockReturnValueOnce('John Doe');
    prompt.mockReturnValueOnce('Engineering');
    prompt.mockReturnValueOnce('5000');
    addEmployee();
    expect(Employee).toHaveBeenCalledWith({
      id: '123',
      name: 'John Doe',
      department: 'Engineering',
      salary: 5000,
    });
    expect(prompt).toHaveBeenCalledTimes(4);
    expect(1).toBe(1);
  });
});

describe('displayEmployeeDetails', () => {
  it('should display employee details', () => {
    jest.spyOn(console, 'log').mockImplementation();
    displayEmployeeDetails({
      id: 1, name: 'John Doe', department: 'Engineering', salary: 5000,
    });
    expect(console.log).toHaveBeenCalledTimes(6);
  });
});
