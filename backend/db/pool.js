const pg = require('pg');

const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
});

pool.on('connect', () => {
    console.log('Connected to the database');
});

pool.on('error', (err) => {
    console.error('Error with the database', err);
});

module.exports = pool;