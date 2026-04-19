import express from 'express';
// import { SAMPLE_BLOCKS } from '../../migrations/sample_blocks.js';
import { getBlocks } from '../../models/blocksModels.js';

// const blocks = SAMPLE_BLOCKS;
var router = express.Router();

router.get('/', function(req, res, next) {
    if (req.session && req.session.userId) {
        getBlocks(req.session.userId)
            .then(
                (blocks) => {
                    res.status(200).json(blocks.rows);
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

router.post('/', function(req, res, next) {
 console.log('POST /api/v1/blocks');
 blocks.push(req.body);
 res.status(200);
});

export default router; // ESM: export
