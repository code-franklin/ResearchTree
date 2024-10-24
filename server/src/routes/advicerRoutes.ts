import express, { Router } from 'express';
import { 
    registration, 
    login, 
    getSpecializations,
    listStudentsManage,
    updateStatusStudent,
    getAdviserStudents,
    getPanelistStudents,
    respondToStudent,
    getToken,
    addTaskMyAdvicee,
    updateManuscriptStatus 
} from '../controllers/advicerControllers';

import upload from '../middleware/upload';

const router: Router = express.Router();

router.post('/register', upload.single('profileImage'), registration);
router.post('/login', login);

// Add the route for CKEditor token
router.get('/get-ckeditor-token/:userId', getToken);

router.get('/specializations', getSpecializations);

// Adviser routes
router.get('/advisor-students/:advisorId', getAdviserStudents);
router.post('/add-task/:studentId', addTaskMyAdvicee)

router.patch('/thesis/manuscript-status', updateManuscriptStatus);

router.get('/panelist-students/:advisorId', getPanelistStudents);
router.post('/respond-student', respondToStudent);

// admin
router.get('/students-manage/:advisorId', listStudentsManage);
router.put('/update-student-status', updateStatusStudent);


export default router;