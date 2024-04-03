import Employee from './EmployeeApp';

class Manager extends Employee {
    #bonus;

    constructor(id, name, department, salary, bonus) {
        super(id, name, department, salary);
        this.#bonus = bonus;
    }

    getBonus() {
        return this.#bonus;
    }

    getSalary() {
        // Calculate total salary including bonus
        return super.getSalary() + this.#bonus;
    }
}

module.exports = Manager;
