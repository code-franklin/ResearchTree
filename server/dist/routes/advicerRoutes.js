"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const advicerControllers_1 = require("../controllers/advicerControllers");
const upload_1 = __importDefault(require("../middleware/upload"));
const router = express_1.default.Router();
router.post('/register', upload_1.default.single('profileImage'), advicerControllers_1.registration);
router.post('/login', advicerControllers_1.login);
router.get('/specializations', advicerControllers_1.getSpecializations);
// admin & advicer
router.get('/proposals', advicerControllers_1.getAllProposals);
router.get('/proposals/:userId', advicerControllers_1.getProposalsByUserId);
// Adviser routes
router.get('/advisor-students/:advisorId', advicerControllers_1.getAdviserStudents);
router.get('/panelist-students/:advisorId', advicerControllers_1.getPanelistStudents);
router.post('/respond-student', advicerControllers_1.respondToStudent);
// admin
router.get('/students-manage/:advisorId', advicerControllers_1.listStudentsManage);
router.put('/update-student-status', advicerControllers_1.updateStatusStudent);
exports.default = router;
