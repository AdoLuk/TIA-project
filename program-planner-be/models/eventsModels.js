import pool from '../config/db.js';

// use parametrized queries to prevent SQL injection 

// returns promise !
const getEvents = function (id) {
    if (id != null) {
        console.log("getEvents called with id: " + id);
        return pool.query(
            "select * from events e where e.event_id = $1",
            [id]
        );
    }
    return pool.query(
            "select * from events e order by e.begin_date desc"
        );
};

const getEventTypes = function (id) {
    if (id != null) {
        return pool.query(
            "select type from event_types et where et.event_type_id = $1",
            [id]
        );
    }
    return pool.query(
        "select * from event_types"
    );
}

// const editEvent = function (id, title, place, begin_time, end_time, description) {
//     return pool.query(
//         `UPDATE events
//          SET title=$1, place=$2, begin_time=$3, end_time=$4, description=$5
//          WHERE event_id=$6
//          RETURNING *`,
//         [title, place, begin_time, end_time, description, id]
//     );
// }

export { getEvents, getEventTypes };
