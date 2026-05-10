import express from 'express';
import { editEvent, getEvents, getEventTypes, isMyEvent } from '../../models/eventsModels.js';
import e from 'express';

var router = express.Router();

router.get('/', function(req, res, next) {
    const { event_id } = req.query;
    if (req.session && req.session.userId) {
        getEvents(req.session.userId, event_id)
            .then(
                (events) => {
                    // console.log(JSON.stringify(events.rows))
                    res.status(200).json(events.rows);
                })
            .catch(
                (err) => {
                    console.log(err);
                    // internal server error
                    res.status(500).end();
                })
    }
    // unauthorized
    else {
        res.status(401).end();
    }
});

router.get('/types', function(req, res, next) {
    const { event_type_id } = req.query;
    if (req.session && req.session.userId) {
        getEventTypes(event_type_id)
            .then(
                (event_type) => {
                    if (event_type_id == null) {
                        res.status(200).json(event_type.rows);
                        return;
                    }
                    res.status(200).json(event_type.rows[0].type);
                })
            .catch(
                (err) => {
                    console.log(err);
                    // internal server error
                    res.status(500).end();
                })
    }
    // unauthorized
    else {
        res.status(401).end();
    }
});

router.put('/', function(req, res) {
    const { event_id } = req.query;
    const id = parseInt(event_id);
    if (!Number.isInteger(id)) return res.status(400).json({ error: 'Invalid id' });
    // console.log("_\nEditing event " + id + "\n_");
    const { title, event_type_id, begin_date, end_date } = req.body;
    if (req.session && req.session.userId) {
        // console.log("user: " + req.session.userId + " editing event: " + id)
        isMyEvent(id, req.session.userId)
            .then((result) => {
                // console.log(result);
                if (result.isMyEvent) {
                    editEvent(id, title, event_type_id, begin_date, end_date)
                        .then((result) => {
                            if (result.rowCount === 0) return res.status(404).json({ error: 'Not found' })
                            res.status(200).json(result.rows[0])
                        })
                        .catch((err) => {
                            console.error(err)
                            res.status(500)
                        })
                } else { // unauthorised
                    return res.status(401).end();
                }
            }).catch((e) => {
                console.log(e);
                return res.status(500).end();
            })
    } else {
        res.status(401).end();
    }
})

export default router; // ESM: export
