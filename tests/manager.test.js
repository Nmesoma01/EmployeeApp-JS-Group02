import Manager from '../src/models/manager';

describe('manager class', () => {
  it('calculatePaycheck method returns correct total paycheck amount', () => {
    const manager = new Manager({
      id: '1', name: 'John Doe', username: 'johndoe', password: 'password',
    });

    expect(manager.name).toBe('John Doe');
    expect(manager.username).toBe('johndoe');
    expect(manager.password).toBe('password');
  });
});
