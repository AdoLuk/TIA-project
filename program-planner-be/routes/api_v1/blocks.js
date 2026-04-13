import express from 'express';
import { SAMPLE_BLOCKS } from '../../migrations/sample_blocks.js';

const blocks = SAMPLE_BLOCKS;
var router = express.Router();

router.get('/', function(req, res, next) {
 //console.log('GET /api/v1/blocks');
 res.status(200).json(blocks);
});

router.post('/', function(req, res, next) {
 console.log('POST /api/v1/blocks');
 blocks.push(req.body);
 res.status(200);
});

export default router; // ESM: export
