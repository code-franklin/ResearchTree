"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStudentAdvisorInfo = exports.chooseAdvisor = exports.createProposal = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const User_1 = __importDefault(require("../models/User"));
const Proposal_1 = __importDefault(require("../models/Proposal"));
// Dynamic import of NlpManager
let NlpManager;
// Dynamically import NlpManager
(() => __awaiter(void 0, void 0, void 0, function* () {
    const nlpModule = yield Promise.resolve().then(() => __importStar(require('@nlpjs/nlu')));
    NlpManager = nlpModule.NlpManager;
}))();
const getTopAdvisors = () => __awaiter(void 0, void 0, void 0, function* () {
    const advisors = yield User_1.default.find({ role: 'adviser', isApproved: true }).limit(5);
    return advisors.map(advisor => ({
        id: advisor._id.toString(),
        specializations: advisor.specializations,
    }));
});
const analyzeProposal = (proposalText, advisors) => __awaiter(void 0, void 0, void 0, function* () {
    // Wait for NlpManager to be loaded
    if (!NlpManager) {
        throw new Error("NlpManager is not loaded yet.");
    }
    // Initialize the NLP Manager and add the language
    const manager = new NlpManager({ languages: ['en'], forceNER: true });
    advisors.forEach((advisor) => {
        advisor.specializations.forEach((specialization) => {
            manager.addDocument('en', `I am interested in ${specialization}`, advisor.id);
            manager.addDocument('en', `My research is about ${specialization}`, advisor.id);
            manager.addDocument('en', `${specialization} is my focus area`, advisor.id);
            manager.addDocument('en', `I need guidance on ${specialization}`, advisor.id);
        });
    });
    yield manager.train();
    const response = yield manager.process('en', proposalText);
    const classifiedAdvisors = response.classifications.map((classification) => ({
        id: classification.intent,
        score: classification.score,
    }));
    classifiedAdvisors.sort((a, b) => b.score - a.score);
    const topAdvisors = classifiedAdvisors
        .map((classifiedAdvisor) => advisors.find((advisor) => advisor.id === classifiedAdvisor.id))
        .filter((advisor) => advisor !== undefined);
    return topAdvisors.slice(0, 5); // Return top 5 advisors
});
const createProposal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, proposalText } = req.body;
    if (!userId || !proposalText) {
        return res.status(400).json({ message: 'userId and proposalText are required' });
    }
    try {
        const student = yield User_1.default.findById(userId);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        if (student.advisorStatus === 'accepted') {
            return res.status(400).json({ message: 'Cannot submit proposal after advisor acceptance' });
        }
        const declinedAdvisors = student.declinedAdvisors || [];
        const advisors = yield User_1.default.find({
            role: 'adviser',
            isApproved: true,
            _id: { $nin: declinedAdvisors }
        });
        const topAdvisors = yield analyzeProposal(proposalText, advisors);
        const newProposal = yield Proposal_1.default.create({ userId, proposalText });
        res.status(201).json({ proposal: newProposal, topAdvisors });
    }
    catch (error) {
        console.error('Error creating proposal:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.createProposal = createProposal;
const chooseAdvisor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, advisorId } = req.body;
    if (!userId || !advisorId) {
        return res.status(400).json({ message: 'userId and advisorId are required' });
    }
    try {
        const student = yield User_1.default.findById(userId);
        if ((student === null || student === void 0 ? void 0 : student.chosenAdvisor) && student.advisorStatus !== 'declined') {
            return res.status(400).json({ message: 'Advisor already chosen' });
        }
        const topAdvisors = yield getTopAdvisors();
        const panelists = topAdvisors.filter(advisor => advisor.id !== advisorId).slice(0, 3);
        if (student) {
            student.chosenAdvisor = advisorId;
            student.advisorStatus = 'pending';
            student.panelists = panelists.map(panelist => new mongoose_1.default.Types.ObjectId(panelist.id));
            yield student.save();
        }
        res.status(200).json({ message: 'Advisor chosen and panelists assigned successfully', student });
    }
    catch (error) {
        console.error('Error choosing advisor:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.chooseAdvisor = chooseAdvisor;
const getStudentAdvisorInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        const student = yield User_1.default.findById(userId).populate('chosenAdvisor').populate('panelists');
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.status(200).json({ chosenAdvisor: student.chosenAdvisor, advisorStatus: student.advisorStatus, panelists: student.panelists });
    }
    catch (error) {
        console.error('Error fetching student advisor info:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.getStudentAdvisorInfo = getStudentAdvisorInfo;
