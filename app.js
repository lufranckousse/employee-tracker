// Import required modules
const { addDepartment, getAllDepartments } = require('./databaseFunctions');

// Function to add a new department
async function createDepartment() {
    try {
        // Call the addDepartment function and pass the department name as a parameter
        await addDepartment('Engineering');
        console.log('Department added successfully');
    } catch (error) {
        console.error('Error adding department:', error);
    }
}

// Function to get all departments
async function displayAllDepartments() {
    try {
        // Call the getAllDepartments function to fetch all departments from the database
        const departments = await getAllDepartments();
        console.log('All departments:', departments);
    } catch (error) {
        console.error('Error getting departments:', error);
    }
}

// Call functions to perform database operations
createDepartment(); // Add a new department
displayAllDepartments(); // Display all departments

// You can define more functions and perform other database operations as needed
