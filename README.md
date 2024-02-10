# Employee Tracker CLI Application

Welcome to the Employee Tracker CLI Application! This command-line interface (CLI) application allows you to manage a company's employee database efficiently. You can view and manage departments, roles, and employees, helping you organize and plan your business effectively.

Table of Contents
- Installation
- Usage
- Features
- Database Schema
- Dependencies
- Contributing
- License

## Installation
To install and run the Employee Tracker CLI Application, follow these steps:

1. Clone this repository to your local machine:

    <code>git clone https://github.com/lufranckousse/employee-tracker.git</code>


2. Navigate to the project directory:

     <code>cd employee-tracker</code>

3. Install dependencies using npm:

    <code>npm install</code>


4. Set up your MySQL database with the provided schema. Make sure to create a new database for your project and use the provided schema to create the necessary tables (department, role, employee).


5. Run the application:

     <code>node cli.js</code>


# Usage

Once the application is running, you will be presented with a menu of options:

- View all departments
- View all roles
- View all employees
- Add a department
- Add a role
- Add an employee
- Update an employee role

Simply select the desired option by using the arrow keys and pressing enter. Follow the prompts to perform the chosen action.

# Features

- **View All Departments:** View a list of all departments in the company along with their IDs.
- **View All Roles:** View a list of all roles in the company, including the job title, department, and salary.
- **View All Employees:** View a formatted table showing employee data, including IDs, first names, last names, job titles, departments, salaries, and managers.
- **Add a Department:** Add a new department to the database.
- **Add a Role:** Add a new role to the database, specifying the title, salary, and department.
- **Add an Employee:** Add a new employee to the database, providing their first name, last name, role, and manager.
- **Update an Employee Role:** Update the role of an existing employee.


# Database Schema

The application uses a MySQL database with the following schema:

- department: Contains information about company departments.
- role: Represents job roles within the company, including titles, salaries, and department IDs.
- employee: Stores employee data, including names, roles, and manager IDs.


# Dependencies

The Employee Tracker CLI Application uses the following npm packages:

- inquirer: For prompting users for input and choices in the command-line interface.
- mysql2: For connecting to the MySQL database and performing queries.
- console.table: For formatting database query results into tables for better readability.


# Contributing

Contributions are welcome! If you have any suggestions, enhancements, or bug fixes, please open an issue or create a pull request.