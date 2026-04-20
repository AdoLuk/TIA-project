import pool from '../config/db.js';

// use parametrized queries to prevent SQL injection 

// returns promise !
const getBlocks = function (id) {
    if (id != null) {
        console.log("getBlocks called with id: " + id);
        return pool.query(
            "select * from blocks b where b.block_id = $1",
            [id]
        );
    }
    return pool.query(
            "select * from blocks b"
        );
};

const editBlock = function (id, title, place, begin_time, end_time, description) {
    return pool.query(
        `UPDATE blocks
         SET title=$1, place=$2, begin_time=$3, end_time=$4, description=$5
         WHERE block_id=$6
         RETURNING *`,
        [title, place, begin_time, end_time, description, id]
    );
}

export { getBlocks, editBlock }
