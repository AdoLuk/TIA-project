import pool from '../config/db.js';

// use parametrized queries to prevent SQL injection 

// returns promise !
const getBlocks = function () {    
    return pool.query(
            "select * from blocks b"
        );
};

export { getBlocks }
