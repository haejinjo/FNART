const { Pool } = require('pg');
require('dotenv').config();

// WHY WE NEED TO PARAMETRIZE OUR TEXT QUERIES:
// frontend: login page, with input elements in HTML that a user can type ANYTHING into
// backend: 'SELECT * FROM table(x, y) WHERE name =' userInput + 'AND password = ' + userInput2;
// => ALL user information in the database 

const PG_URI = process.env.PG_URI;

// create a new pool here using the connection string above
const pool = new Pool({
  connectionString: PG_URI
});

// Adding some notes about the database here will be helpful for future you or other developers.
// Schema for the database can be found below:
// https://github.com/CodesmithLLC/unit-10SB-databases/blob/master/docs/images/schema.png?raw=true

// We export an object that contains a property called query,
// which is a function that returns the invocation of pool.query() after logging the query
// This will be required in the controllers to be the access point to the database
module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  }
};