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
exports.deleteSpecialization = exports.updateSpecialization = exports.addSpecialization = exports.getSpecializations = exports.deleteUser = exports.getAllUsers = exports.getPendingUsers = exports.declineUser = exports.approveUser = exports.loginAdmin = exports.registerAdmin = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Admin_1 = __importDefault(require("../models/Admin"));
const User_1 = __importDefault(require("../models/User"));
const Specialization_1 = __importDefault(require("../models/Specialization"));
const JWT_SECRET = 'your_jwt_secret';
const registerAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    const profileImage = req.file ? `/public/uploads/${req.file.filename}` : undefined;
    // Manually check if all required fields are present
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Please include all fields' });
    }
    try {
        let admin = yield Admin_1.default.findOne({ email });
        if (admin) {
            return res.status(400).json({ message: 'Admin already exists' });
        }
        const salt = yield bcryptjs_1.default.genSalt(10);
        const hashedPassword = yield bcryptjs_1.default.hash(password, salt);
        admin = new Admin_1.default({
            name,
            email,
            password: hashedPassword,
            profileImage
        });
        yield admin.save();
        const token = jsonwebtoken_1.default.sign({ id: admin._id }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});
exports.registerAdmin = registerAdmin;
const loginAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const admin = yield Admin_1.default.findOne({ email });
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }
        const isMatch = yield bcryptjs_1.default.compare(password, admin.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const token = jsonwebtoken_1.default.sign({ id: admin._id }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, user: { name: admin.name, email: admin.email, profileImage: admin.profileImage } });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});
exports.loginAdmin = loginAdmin;
const approveUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const user = yield User_1.default.findByIdAndUpdate(userId, { isApproved: true }, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User approved', user });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});
exports.approveUser = approveUser;
const declineUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const user = yield User_1.default.findByIdAndDelete(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User declined and removed' });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});
exports.declineUser = declineUser;
const getPendingUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.default.find({ isApproved: false });
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});
exports.getPendingUsers = getPendingUsers;
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.default.find({});
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});
exports.getAllUsers = getAllUsers;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield User_1.default.findByIdAndDelete(req.params.id);
        res.json({ message: 'User deleted' });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});
exports.deleteUser = deleteUser;
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
const addSpecialization = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ message: 'Specialization name is required' });
    }
    try {
        const newSpecialization = new Specialization_1.default({ name });
        yield newSpecialization.save();
        res.status(201).json(newSpecialization);
    }
    catch (error) {
        console.error('Error adding specialization:', error);
        res.status(500).json({ message: 'Something went wrong', error });
    }
});
exports.addSpecialization = addSpecialization;
const updateSpecialization = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name } = req.body;
    try {
        const updatedSpecialization = yield Specialization_1.default.findByIdAndUpdate(id, { name }, { new: true });
        res.status(200).json(updatedSpecialization);
    }
    catch (error) {
        res.status(500).json({ message: 'Something went wrong', error });
    }
});
exports.updateSpecialization = updateSpecialization;
const deleteSpecialization = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield Specialization_1.default.findByIdAndDelete(id);
        res.status(200).json({ message: 'Specialization deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Something went wrong', error });
    }
});
exports.deleteSpecialization = deleteSpecialization;
