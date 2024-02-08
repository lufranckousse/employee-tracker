const poolPromise = require('./db'); // Import the MySQL connection pool

// Function to add a new department
async function addDepartment(name) {
    try {
        const pool = await poolPromise;
        const [result] = await pool.query('INSERT INTO department (name) VALUES (?)', [name]);
        return result;
    } catch (error) {
        throw new Error(`Error adding department: ${error.message}`);
    }
}

// Function to get all departments
async function getAllDepartments() {
    try {
        const pool = await poolPromise;
        const [rows] = await pool.query('SELECT * FROM department');
        return rows;
    } catch (error) {
        throw new Error(`Error getting departments: ${error.message}`);
    }
}

// Add more functions for CRUD operations on roles and employees...

module.exports = {
    addDepartment,
    getAllDepartments
    // Add other functions here...
};
