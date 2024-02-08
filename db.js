const mysql = require('mysql2');

// Create MySQL connection pool
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Book123@!',
    database: 'employee_tracker',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Ensure connection is asynchronous
const poolPromise = pool.promise();

module.exports = poolPromise;