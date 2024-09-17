"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const specializationSchema = new mongoose_1.Schema({
    name: { type: String, required: true, unique: true }
});
const Specialization = (0, mongoose_1.model)('Specialization', specializationSchema);
exports.default = Specialization;
