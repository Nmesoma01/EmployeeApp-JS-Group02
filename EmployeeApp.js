class Employee {
    #id;
    #name;
    #department;
    #salary;

    constructor(id, name, department, salary) {
        this.#id = id;
        this.#name = name;
        this.#department = department;
        this.#salary = salary;
    }

    getId() {
        return this.#id;
    }

    getName() {
        return this.#name;
    }

    getDepartment() {
        return this.#department;
    }

    getSalary() {
        return this.#salary;
    }

    calculatePaycheck() {
        return this.#salary;
    }
}

module.exports = Employee;
