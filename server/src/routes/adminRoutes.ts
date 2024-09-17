import express, { Router } from 'express';
import { registerAdmin, loginAdmin, getPendingUsers, approveUser, declineUser, getAllUsers, deleteUser } from '../controllers/adminController';
import { getSpecializations, addSpecialization, updateSpecialization, deleteSpecialization } from '../controllers/adminController';
import upload from '../middleware/upload';

const router: Router = express.Router();

router.post('/register', upload.single('profileImage'), registerAdmin);
router.post('/login', loginAdmin);
router.put('/approve/:userId', approveUser);
router.put('/decline/:userId', declineUser);
router.get('/pending', getPendingUsers);
router.get('/users', getAllUsers);
router.delete('/users/:id', deleteUser);

router.get('/specializations', getSpecializations);
router.post('/specializations', addSpecialization);
router.put('/specializations/:id', updateSpecialization);
router.delete('/specializations/:id', deleteSpecialization);


export default router;