const Employee = require('./EmployeeApp');

class Manager extends Employee {
    #bonus;

    constructor(id, name, department, salary, bonus) {
        super(id, name, department, salary);
        this.#bonus = bonus;
    }

    get bonus() {
        return this.#bonus;
    }

    get salary() {
        // Calculate total salary including bonus
        return super.getSalary() + this.#bonus;
    }    

    calculatePaycheck() {
        return this.salary;
    }
}

module.exports = Manager;
