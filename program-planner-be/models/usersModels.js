// var pool = require('../config/db.js');
import pool from '../config/db.js';

// use parameterized queries to prevent SQL injection !

// returns promise !
const getUsers = function(username) {  
    console.log("getUsers called with username: " + username);
    return pool.query(
        "select * from users u where u.username = $1",
        [username]
    );
};

export { getUsers }