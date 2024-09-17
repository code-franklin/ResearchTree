"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const studentControllers_1 = require("../controllers/studentControllers");
const router = express_1.default.Router();
router.post('/submit-proposal', studentControllers_1.createProposal);
router.post('/choose-advisor', studentControllers_1.chooseAdvisor);
router.get('/student-advisor-info/:userId', studentControllers_1.getStudentAdvisorInfo);
exports.default = router;
