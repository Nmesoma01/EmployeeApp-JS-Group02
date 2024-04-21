# employee app
# Employee App

## Overview
manage company employees

## requirements
- Redis
- Mysql
- Node.js

## Installation & setup
1. Install dependencies:
    ```bash
    npm install
    ```

2. Create a `.env` file from the `.env.example` file and fill it with the actual environment variables.

3. Setup the database:
    ```bash
    npm run db:setup
    ```

## API
### Manager Endpoints
- POST `/manager/signup`: Sign up a new manager.
- POST `/manager/login`: Log in as a manager.
### Employee Endpoints
- POST `/employee`: Create a new employee.
- GET `/employee/:id`: Get an employee by id.
- GET `/employee`: Get all employees.
- PUT `/employee/:id`: Update an employee by id.
- DELETE `/employee/:id`: Delete an employee by id.
- GET `/employee/:id/report`: Get an employee's report by id.
- POST `/employee/:id/report`: save report for an employee by id.
### department Endpoints
- POST `/departments`: Create a new department.
- GET `/departments/:id`: Get a department by id.
- GET `/departments`: Get all departments.
