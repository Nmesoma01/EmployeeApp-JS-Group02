import Manager from '../src/models/manager';

describe('manager class', () => {
  it('calculatePaycheck method returns correct total paycheck amount', () => {
    // Create a Manager instance with base salary 5000 and bonus 1000
    const manager = new Manager('1', 'John Doe', 'Sales', 5000, 1000);

    // Check if calculatePaycheck returns correct total paycheck amount
    expect(manager.calculatePaycheck()).toBe(6000);
  });
});
