import express from 'express';
// import { SAMPLE_BLOCKS } from '../../migrations/sample_blocks.js';
import { getBlocks, editBlock } from '../../models/blocksModels.js';

// const blocks = SAMPLE_BLOCKS;
var router = express.Router();

router.get('/', function(req, res, next) {
    const { block_id } = req.query;
    if (req.session && req.session.userId) {
        getBlocks(block_id)
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

router.put('/', function(req, res) {
    const { block_id } = req.query;
    const id = parseInt(block_id);
    if (!Number.isInteger(id)) return res.status(400).json({ error: 'Invalid id' });
    const { title, place, begin_time, end_time, description } = req.body;

    editBlock(id, title, place, begin_time, end_time, description)
    .then((result) => {
        if (result.rowCount === 0) return res.status(404).json({ error: 'Not found' })
        res.status(200).json(result.rows[0])
    })
    .catch((err) => {
        console.error(err)
        res.status(500)
    })
})

router.post('/', function(req, res, next) {
 console.log('POST /api/v1/blocks');
 blocks.push(req.body);
 res.status(200);
});

export default router; // ESM: export
