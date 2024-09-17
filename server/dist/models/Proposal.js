"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// Define Mongoose schema for Proposal
const proposalSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    proposalText: { type: String, required: true },
});
// Create and export Mongoose model
const Proposal = (0, mongoose_1.model)('Proposal', proposalSchema);
exports.default = Proposal;
