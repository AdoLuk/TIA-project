import pool from '../config/db.js';

// use parametrized queries to prevent SQL injection 

const getBlockAssignments = function (block_id, team_member_id) {
    return pool.query(
        "select * from block_assignments ba where ba.block_id = $1 and ba.team_member_id = $2",
        [block_id, team_member_id]
    );
}

const isMyBlock = function (block_id, team_member_id) {
    return getBlockAssignments(block_id, team_member_id)
        .then((result) => {
            result.isMyBlock = result.rows && result.rows.length > 0;
            return result;
        })
        .catch((e) => {
            console.log(e);
        });
}

export { getBlockAssignments, isMyBlock };
