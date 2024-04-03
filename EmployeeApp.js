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

    get id() {
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
}

module.exports = Employee;
