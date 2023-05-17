import express from "express";
import * as rankingsController from '../controllers/rankingsController.js';

const router = express.Router();

router.get('/rankings', rankingsController.showAllRankings);
router.get('/rankings/:idRanking', rankingsController.showRankingById);
router.post('/rankings', rankingsController.newRanking);    
router.put('/rankings', rankingsController.updateRanking);
router.delete('/rankings/:idRanking', rankingsController.deleteRanking);

router.get('/rankings/level/:level', rankingsController.showRankingByLevel);

export default router;