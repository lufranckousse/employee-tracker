const inquirer = require('inquirer');
const { addDepartment, getAllDepartments } = require('./databaseFunctions');
const consoleTable = require('console.table');

// Function to display all departments
async function displayDepartments() {
    try {
        const departments = await getAllDepartments();
        console.log('\nAll Departments:');
        console.table(departments);
    } catch (error) {
        console.error('Error:', error);
    }
}

// Function to prompt user for action
async function promptAction() {
    const { action } = await inquirer.prompt({
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: [
            'View all departments',
            'Add a department',
            'Exit'
        ]
    });

    switch (action) {
        case 'View all departments':
            await displayDepartments();
            break;
        case 'Add a department':
            await promptAddDepartment();
            break;
        case 'Exit':
            console.log('Goodbye!');
            process.exit();
    }
}

// Function to prompt user for department details and add a department
async function promptAddDepartment() {
    const { name } = await inquirer.prompt({
        type: 'input',
        name: 'name',
        message: 'Enter the name of the department:',
        validate: function(value) {
            if (value.trim() === '') {
                return 'Please enter a department name.';
            }
            return true;
        }
    });

    try {
        // Check if the department already exists
        const departments = await getAllDepartments();
        const departmentExists = departments.some(department => department.name === name.trim());
        if (departmentExists) {
            console.log('Department already exists.');
        } else {
            // Add the department
            await addDepartment(name.trim());
            console.log('Department added successfully!');
        }
    } catch (error) {
        console.error('Error adding department:', error);
    }

    // Prompt user for next action
    await promptAction();
}

// Start the CLI
async function start() {
    console.log('Welcome to the Employee Tracker CLI!');
    await promptAction();
}

// Call the start function to begin the CLI
start();
