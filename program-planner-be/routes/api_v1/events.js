import express from 'express';
import { getEvents, getEventTypes } from '../../models/eventsModels.js';

var router = express.Router();

router.get('/', function(req, res, next) {
    const { event_id } = req.query;
    if (req.session && req.session.userId) {
        getEvents(event_id)
            .then(
                (events) => {
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

export default router; // ESM: export
