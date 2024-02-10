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

async function addRole(title, salary, departmentid) {
    try {
        const pool = await poolPromise;
        const [result] = await pool.query(`INSERT INTO role
                                            (title, salary, department_id)
                                            VALUES (?, ?, ?)`, 
                                            [title, salary, departmentid]);

        return result;
    } catch (error) {
        throw new Error(`Error adding role: ${error.message}`);
    }
}

async function addEmployee(firstName, lastName, roleId,managerId) {
    try {
        const pool = await poolPromise;
        const [result] = await pool.query(`INSERT INTO employee 
                                            (first_name, last_name, role_id, manager_id) 
                                            VALUES (?, ?, ?, ?)`, 
                                            [firstName, lastName, roleId, managerId]);


        return result;
    } catch (error) {
        throw new Error(`Error adding employee: ${error.message}`);
    }
}

async function updateRole(EmpNameRoleUpdate,roleUpdate) {
    try {
        const pool = await poolPromise;
        const [result] = await pool.query(`UPDATE employee SET role_id = ? 
                                            WHERE employee.id = ?`, [roleUpdate, EmpNameRoleUpdate]);

        return result;
    } catch (error) {
        throw new Error(`Error update employee role: ${error.message}`);
    }
}



async function getAllEmployee() {
    try {
        const pool = await poolPromise;
        const [rows] = await pool.query(`SELECT e.id, e.first_name AS 'first_name', e.last_name AS 'last_name', 
                                            r.title AS 'title', d.name AS department, r.salary, 
                                            CONCAT(e2.first_name,"  ", e2.last_name) AS 'manager'
                                            FROM employee AS e
                                            LEFT JOIN role AS r
                                            ON e.role_id = r.id
                                            LEFT JOIN department AS d 
                                            ON r.department_id = d.id
                                            LEFT JOIN employee AS e2
                                            ON e.manager_id = e2.id`
                                        );
        return rows;
    } catch (error) {

        throw new Error(`Error getting Employee: ${error.message}`);
    }
}

async function getAllRoles() {
    try {
        const pool = await poolPromise;
        const [rows] = await pool.query(`SELECT r.id, r.title, r.salary, d.name AS 'department name' 
                                            FROM role AS r 
                                            LEFT JOIN department AS d 
                                            ON r.department_id = d.id`
                                        );
        return rows;
    } catch (error) {
        throw new Error(`Error getting roles: ${error.message}`);
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
    addRole,
    addEmployee,
    updateRole,
    getAllDepartments,
    getAllRoles,
    getAllEmployee
    // Add other functions here...
};
