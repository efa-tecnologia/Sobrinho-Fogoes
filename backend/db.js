const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: '147.93.33.72',
  database: 'EFACommerceBR',
  password: 'Banadoura5@3',
  port: 2345,
});

module.exports = pool;
