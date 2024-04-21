export default class Employee {
  #id;

  #name;

  #salary;

  #departmentName;

  #departmentId;

  constructor({
    id, name, departmentId, salary, departmentName,
  }) {
    if (typeof id !== 'string') {
      throw new Error('Id need to be a string');
    }
    if (typeof name !== 'string') {
      throw new Error('Name need to be a string');
    }
    if (typeof departmentId !== 'string') {
      throw new Error('departmentId need to be a string');
    }
    if (typeof salary !== 'number') {
      throw new Error('Salary need to be a number');
    }
    if (typeof departmentName !== 'string') {
      throw new Error('Department name need to be a string');
    }
    this.#id = id;
    this.#name = name;
    this.#departmentName = departmentName;
    this.#departmentId = departmentId;
    this.#salary = salary;
  }

  get id() {
    return this.#id;
  }

  set id(id) {
    if (typeof id !== 'string') {
      throw new Error('Id need to be a string');
    }
    this.#id = id;
  }

  get name() {
    return this.#name;
  }

  set name(name) {
    if (typeof name !== 'string') {
      throw new Error('Name need to be a string');
    }
    this.#name = name;
  }

  get departmentName() {
    return this.#departmentName;
  }

  set departmentName(departmentName) {
    if (typeof departmentName !== 'string') {
      throw new Error('Department need to be a string');
    }
    this.#departmentName = departmentName;
  }

  get departmentId() {
    return this.#departmentId;
  }

  set departmentId(departmentId) {
    if (typeof departmentId !== 'string') {
      throw new Error('Department need to be a string');
    }
    this.#departmentId = departmentId;
  }

  get salary() {
    return this.#salary;
  }

  set salary(salary) {
    if (typeof salary !== 'number') {
      throw new Error('Salary need to be a number');
    }
    this.#salary = salary;
  }

  update({
    id, name, departmentName, departmentId, salary,
  }) {
    if (typeof id !== 'string' && id.length > 0) {
      throw new Error('Id need to be a string');
    }
    if (typeof name !== 'string' && name.length > 0) {
      throw new Error('Name need to be a string');
    }
    if (typeof departmentName !== 'string' && departmentName.length > 0) {
      throw new Error('Department need to be a string');
    }
    if (typeof departmentId !== 'string' && departmentId.length > 0) {
      throw new Error('Department need to be a string');
    }
    if (typeof salary !== 'number' && salary > 0) {
      throw new Error('Salary need to be a number');
    }
    if (name) {
      this.name = name;
    }
    if (departmentName) {
      this.departmentName = departmentName;
    }
    if (departmentId) {
      this.departmentId = departmentId;
    }
    if (salary) {
      this.salary = salary;
    }
  }

  getJson() {
    return {
      id: this.id,
      name: this.name,
      departmentName: this.departmentName,
      departmentId: this.departmentId,
      salary: this.salary,
    };
  }
}
