import express, { Router } from 'express';
import { 
    createProposal, 
    chooseAdvisor,
    getStudentInfoAndProposal,
    trainModel,
/*     postUploadManuscript */
} from '../controllers/studentControllers';

const router: Router = express.Router();

router.post('/submit-proposal', createProposal);
router.post('/choose-advisor', chooseAdvisor);
router.get('/advisor-info-StudProposal/:userId', getStudentInfoAndProposal);
router.post('/train-model', trainModel);
/* router.post('/upload-manuscript', postUploadManuscript); */

export default router;
