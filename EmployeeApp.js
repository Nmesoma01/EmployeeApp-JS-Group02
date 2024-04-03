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

    get name() {
        return this.#name;
    }

    get department() {
        return this.#department;
    }

    get salary() {
        return this.#salary;
    }
}

module.exports = Employee;
