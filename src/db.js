// src/db.js
import mysql from 'mysql2/promise';

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: 'localhost',      // Your database host
  user: 'yourUsername',   // Your database username
  password: 'yourPassword', // Your database password
  database: 'yourDatabaseName', // Your database name
  waitForConnections: true,
  connectionLimit: 10,    // Adjust based on your server's capacity
  queueLimit: 0
});

export default pool;
