import express, { Router } from 'express';
import { 
    createProposal, 
    chooseAdvisor,
    getStudentInfoAndProposal,
    updateProposalTitle,
    trainModel,
    markTaskAsCompleted
/*     postUploadManuscript */
} from '../controllers/studentControllers';

const router: Router = express.Router();

router.post('/submit-proposal', createProposal);
router.patch('/mark-task/:taskId', markTaskAsCompleted)
router.post('/choose-advisor', chooseAdvisor);
router.get('/advisor-info-StudProposal/:userId', getStudentInfoAndProposal);
router.put('/update-proposal-title/:userId', updateProposalTitle);
router.post('/train-model', trainModel);
/* router.post('/upload-manuscript', postUploadManuscript); */

export default router;
