import express from 'express';
import { getUsername } from '../../models/usersModels.js';

var router = express.Router();


router.get('/username', function(req, res, next) {
    const { user_id } = req.query;
    if (req.session && req.session.userId) {
        getUsername(user_id)
            .then(
                (username) => {
                    res.status(200).json(username.rows[0].username);
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
