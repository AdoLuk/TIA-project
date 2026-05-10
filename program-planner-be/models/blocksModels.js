import pool from '../config/db.js';

// use parametrized queries to prevent SQL injection 

// returns promise !
const getBlocks = function (user_id, block_id) {
    if (block_id != null) {
        // console.log("getBlocks called with id: " + block_id);
        return pool.query(
            `select b.*, (EXISTS(SELECT 1 FROM block_assignments ba WHERE ba.block_id = b.block_id AND ba.team_member_id = $1)) AS "isMyBlock" 
            from blocks b 
            where b.block_id = $2`,
            [user_id, block_id]
        );
    }
    return pool.query(
        `SELECT b.*, e.title AS event_title, bt.type AS block_type,
            (EXISTS(SELECT 1 FROM block_assignments ba WHERE ba.block_id = b.block_id AND ba.team_member_id = $1)) AS "isMyBlock"
         FROM blocks b
         JOIN (
             SELECT event_id, MAX(date) AS max_date
             FROM blocks
             GROUP BY event_id
         ) grp USING (event_id)
         JOIN events e USING (event_id)
         JOIN block_types bt USING (block_type_id)
         ORDER BY grp.max_date DESC, b.date ASC, b.begin_time ASC;`,
        [user_id]
    );
};

const getBlocksByEvent = function(user_id, event_id) {
    return pool.query(
        `SELECT b.*, e.title as event_title, bt.type AS block_type,
            (EXISTS(SELECT 1 FROM block_assignments ba WHERE ba.block_id = b.block_id AND ba.team_member_id = $1)) AS "isMyBlock"
         FROM blocks b
         JOIN block_types bt USING (block_type_id)
         JOIN events e USING (event_id)
         WHERE b.event_id = $2
         ORDER BY b.date ASC, b.begin_time ASC;`,
        [user_id, event_id]
    )
}

const editBlock = function (id, title, place, begin_time, end_time, description) {
    return pool.query(
        `UPDATE blocks
         SET title=$1, place=$2, begin_time=$3, end_time=$4, description=$5
         WHERE block_id=$6
         RETURNING *`,
        [title, place, begin_time, end_time, description, id]
    );
}

const getBlockTypes = function (id) {
    if (id != null) {
        return pool.query(
            "select type from block_types bt where bt.block_type_id = $1",
            [id]
        );
    }
    return pool.query(
        "select * from block_types"
    );
}

export { getBlocks, getBlocksByEvent, editBlock, getBlockTypes }
