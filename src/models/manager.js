import bcrypt from 'bcrypt';

export default class Manager {
  #name;

  #username;

  #password;

  #id;

  constructor({
    id, name, username, password,
  }) {
    if (typeof id !== 'string') {
      throw new Error('Invalid id');
    }
    if (typeof name !== 'string') {
      throw new Error('Invalid name');
    }
    if (typeof username !== 'string') {
      throw new Error('Invalid username');
    }
    if (typeof password !== 'string') {
      throw new Error('Invalid password');
    }
    this.#id = id;
    this.#name = name;
    this.#username = username;
    this.#password = password;
  }

  get id() {
    return this.#id;
  }

  set id(value) {
    if (typeof value !== 'string') {
      throw new Error('Invalid id');
    }
    this.#id = value;
  }

  get name() {
    return this.#name;
  }

  set name(value) {
    if (typeof value !== 'string') {
      throw new Error('Invalid name');
    }
    this.#name = value;
  }

  get username() {
    return this.#username;
  }

  set username(value) {
    if (typeof value !== 'string') {
      throw new Error('Invalid username');
    }
    this.#username = value;
  }

  get password() {
    return this.#password;
  }

  set password(value) {
    if (typeof value !== 'string') {
      throw new Error('Invalid password');
    }
    this.#password = value;
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.#password);
  }

  getJson() {
    return {
      id: this.#id,
      name: this.#name,
      username: this.#username,
      password: this.#password,
    };
  }
}
