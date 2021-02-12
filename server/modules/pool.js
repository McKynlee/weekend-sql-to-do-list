// Bring postgreSQL into the party!
const pg = require('pg');
const config = { 
  database: 'weekend_to_do_app', 
  host: 'localhost' 
  port: 5432, 
};

const pool = new pg.Pool(config);

pool.on("connect", () => {
  console.log('connected to postgres');
});

pool.on("error", (error) => {
  console.log('ERROR: Connecting to postgres', error);
});


module.exports = pool;