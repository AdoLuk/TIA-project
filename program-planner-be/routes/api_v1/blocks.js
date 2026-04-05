import express from 'express';
import { SAMPLE_BLOCKS } from '../../migrations/sample_blocks.js';

const blocks = [
    {
        "block_id": 1,
        "title": "Koncert 123",
        "place": "Hlavné pódium",
        "begin_time": "8:00",
        "end_time": "10:00",
        "description": `Akustické vystúpenie lokálnej indie kapely v intímnom prostredí, vhodné pre všetky vekové 
            skupiny, s miestami na sedenie aj státie, predaj nápojov pri vstupe. Začiatok 20:00, dĺžka ~90 min, 
            vstup voľný.`
    },
    {
        "block_id": 2,
        "title": "Workshop 123",
        "place": "Tvorivá dielňa",
        "begin_time": "10:00",
        "end_time": "12:00",
        "description": `"Umenie recyklovanej tvorby": interaktívna 60-minútová hodina s limitovaným počtom miest, 
            praktické ukážky výroby doplnkov z recyklovaných materiálov, materiál zabezpečený, lektor k dispozícii, 
            vhodné pre začiatočníkov i pokročilých.`
    },
    {
        "block_id": 3,
        "title": "Obed 123",
        "place": "Gastronomická zóna",
        "begin_time": "12:00",
        "end_time": "13:00",
        "description": `pokojná atmosféra pri spoločnom sedení, krátke servírovanie, rýchla obsluha, 
            vhodné pre rodiny i skupiny, stolovanie v priestoroch festivalu s výhľadom na hlavné pódium.`
    }
]; // sample data
var router = express.Router();
router.get('/', function(req, res, next) {
 console.log('GET /api/v1/blocks');
 res.status(200).json(blocks);
});

export default router; // ESM: export
