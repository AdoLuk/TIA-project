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
                        console.log(event_type.rows);
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

// router.put('/', function(req, res) {
//     const { event_id } = req.query;
//     const id = parseInt(event_id);
//     if (!Number.isInteger(id)) return res.status(400).json({ error: 'Invalid id' });
//     const { title, place, begin_time, end_time, description } = req.body;

//     editEvent(id, title, place, begin_time, end_time, description)
//     .then((result) => {
//         if (result.rowCount === 0) return res.status(404).json({ error: 'Not found' })
//         res.status(200).json(result.rows[0])
//     })
//     .catch((err) => {
//         console.error(err)
//         res.status(500)
//     })
// })

// router.post('/', function(req, res, next) {
//  console.log('POST /api/v1/events');
//  events.push(req.body);
//  res.status(200);
// });

export default router; // ESM: export
