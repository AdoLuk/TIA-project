import express from 'express';
// import { SAMPLE_BLOCKS } from '../../migrations/sample_blocks.js';
import { getBlocks, editBlock, getBlockTypes, getBlocksByEvent } from '../../models/blocksModels.js';
import { isMyBlock } from "../../models/blockAssignmentsModels.js";

// const blocks = SAMPLE_BLOCKS;
var router = express.Router();

router.get('/', function(req, res, next) {
    const { block_id } = req.query;
    if (req.session && req.session.userId) {
        getBlocks(req.session.userId, block_id)
            .then(
                (blocks) => {
                    // console.log(JSON.stringify(blocks.rows))
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

router.get('/byEvent', function(req, res, next) {
    const { event_id } = req.query;
    // console.log("getting blocks by event: " + event_id)
    if (req.session && req.session.userId) {
        getBlocksByEvent(req.session.userId, event_id)
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
    // console.log("_\nEditing block " + id + "\n_");
    const { title, place, begin_time, end_time, description } = req.body;
    if (req.session && req.session.userId) {
        isMyBlock(id, req.session.userId)
            .then((result) => {
                if (result.isMyBlock) {
                    editBlock(id, title, place, begin_time, end_time, description)
                        .then((result) => {
                            if (result.rowCount === 0) return res.status(404).json({ error: 'Not found' })
                            res.status(200).json(result.rows[0])
                        })
                        .catch((err) => {
                            console.error(err)
                            res.status(500)
                        })
                } else {
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

router.post('/', function(req, res, next) {
 console.log('POST /api/v1/blocks');
 blocks.push(req.body);
 res.status(200);
});

router.get('/types', function(req, res, next) {
    const { block_type_id } = req.query;
    if (req.session && req.session.userId) {
        getBlockTypes(block_type_id)
            .then(
                (block_type) => {
                    if (block_type_id == null) {
                        res.status(200).json(block_type.rows);
                        return;
                    }
                    res.status(200).json(block_type.rows[0].type);
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
