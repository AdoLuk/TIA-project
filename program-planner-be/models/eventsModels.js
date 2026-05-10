import e from 'express';
import pool from '../config/db.js';

// use parametrized queries to prevent SQL injection 

// returns promise !
const getEvents = function (id) {
    if (id != null) {
        // console.log("getEvents called with id: " + id);
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

const isMyEvent = function (event_id, team_member_id) {
    return getEvents(event_id)
        .then((result) => {
            // console.log("isMyBlock result: " + JSON.stringify(result.rows && result.rows.length > 0));
            result.isMyEvent = result.rowCount > 0 && result.rows[0].team_member_id === team_member_id;
            return result;
        })
        .catch((e) => {
            console.log(e);
        });
}

const editEvent = function (id, title, event_type_id, begin_date, end_date) {
    return pool.query(
        `UPDATE events
         SET title=$1, event_type_id=$2, begin_date=$3, end_date=$4
         WHERE event_id=$5
         RETURNING *`,
        [title, event_type_id, begin_date, end_date, id]
    );
}

export { getEvents, getEventTypes, isMyEvent, editEvent };
