"use strict";
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
exports.getPanelistStudents = exports.respondToStudent = exports.getAdviserStudents = exports.getSpecializations = exports.updateStatusStudent = exports.listStudentsManage = exports.getProposalsByUserId = exports.getAllProposals = exports.login = exports.registration = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const Specialization_1 = __importDefault(require("../models/Specialization"));
const Proposal_1 = __importDefault(require("../models/Proposal"));
const registration = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { name, email, password, role } = req.body;
    const specializations = JSON.parse(req.body.specializations);
    const profileImage = (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename;
    try {
        const existingUser = yield User_1.default.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const hashedPassword = yield bcryptjs_1.default.hash(password, 12);
        const newUser = new User_1.default({
            name,
            email,
            password: hashedPassword,
            role,
            profileImage,
            specializations,
            isApproved: false,
        });
        yield newUser.save();
        res.status(201).json({ message: 'User registered successfully. Awaiting admin approval.' });
    }
    catch (error) {
        res.status(500).json({ message: 'Something went wrong', error });
    }
});
exports.registration = registration;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield User_1.default.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (!user.isApproved) {
            return res.status(403).json({ message: 'Your account has not been approved by the admin yet.' });
        }
        const isPasswordCorrect = yield bcryptjs_1.default.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const token = jsonwebtoken_1.default.sign({ id: user._id, email: user.email, role: user.role }, 'your_jwt_secret', { expiresIn: '1h' });
        res.status(200).json({ token, user });
    }
    catch (error) {
        res.status(500).json({ message: 'Something went wrong', error });
    }
});
exports.login = login;
/* admin & advicer */
// Get all proposals
const getAllProposals = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const proposals = yield Proposal_1.default.find().populate('userId', 'name email');
        res.json(proposals);
    }
    catch (error) {
        console.error('Error fetching proposals:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.getAllProposals = getAllProposals;
/* admin & advicer */
// Get proposals by user ID
const getProposalsByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        const proposals = yield Proposal_1.default.find({ userId }).populate('userId', 'name email');
        res.json(proposals);
    }
    catch (error) {
        console.error('Error fetching proposals by user ID:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.getProposalsByUserId = getProposalsByUserId;
/* admin & advicer */
const listStudentsManage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { advisorId } = req.params;
    try {
        const students = yield User_1.default.find({ chosenAdvisor: advisorId, advisorStatus: { $exists: false } });
        res.status(200).json({ students });
    }
    catch (error) {
        console.error('Error fetching students:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.listStudentsManage = listStudentsManage;
/* admin & advicer */
const updateStatusStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { studentId, status } = req.body;
    if (!studentId || !status) {
        return res.status(400).json({ message: 'studentId and status are required' });
    }
    try {
        yield User_1.default.findByIdAndUpdate(studentId, { advisorStatus: status });
        res.status(200).json({ message: 'Student status updated successfully' });
    }
    catch (error) {
        console.error('Error updating student status:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.updateStatusStudent = updateStatusStudent;
/* Specialization to choose */
const getSpecializations = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const specializations = yield Specialization_1.default.find();
        res.status(200).json(specializations);
    }
    catch (error) {
        res.status(500).json({ message: 'Something went wrong', error });
    }
});
exports.getSpecializations = getSpecializations;
const getAdviserStudents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { advisorId } = req.params;
    try {
        const acceptedStudents = yield User_1.default.find({ chosenAdvisor: advisorId, advisorStatus: 'accepted' });
        const declinedStudents = yield User_1.default.find({ chosenAdvisor: advisorId, advisorStatus: 'declined' });
        const studentsToManage = yield User_1.default.find({ chosenAdvisor: advisorId, advisorStatus: 'pending' || null });
        res.status(200).json({ acceptedStudents, declinedStudents, studentsToManage });
    }
    catch (error) {
        console.error('Error fetching students:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.getAdviserStudents = getAdviserStudents;
const respondToStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { studentId, advisorId, status } = req.body;
    if (!studentId || !advisorId || !status) {
        return res.status(400).json({ message: 'studentId, advisorId, and status are required' });
    }
    try {
        const student = yield User_1.default.findById(studentId);
        if (!student || !student.chosenAdvisor || student.chosenAdvisor.toString() !== advisorId) {
            return res.status(404).json({ message: 'Student not found or advisor mismatch' });
        }
        student.advisorStatus = status;
        yield student.save();
        res.status(200).json({ message: `Student ${status} successfully` });
    }
    catch (error) {
        console.error('Error responding to student:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.respondToStudent = respondToStudent;
const getPanelistStudents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { advisorId } = req.params;
    try {
        const students = yield User_1.default.find({ panelists: advisorId }).populate('panelists');
        res.status(200).json({ panelistStudents: students });
    }
    catch (error) {
        console.error('Error fetching panelist students:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.getPanelistStudents = getPanelistStudents;
