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
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: ['student', 'adviser'] },
    profileImage: { type: String, required: false },
    specializations: { type: [String], required: function () { return this.role === 'adviser'; } },
    isApproved: { type: Boolean, default: false },
    chosenAdvisor: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', default: null },
    advisorStatus: { type: String, enum: ['accepted', 'declined', 'pending', null] },
    declinedAdvisors: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User' }],
    panelists: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User' }],
});
const User = (0, mongoose_1.model)('User', userSchema);
exports.default = User;
