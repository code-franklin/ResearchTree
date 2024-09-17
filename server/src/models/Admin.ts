// models/Admin.ts

import { Schema, model, Document } from 'mongoose';

interface IAdmin extends Document {
  name: string;
  email: string;
  password: string;
  profileImage?: string;
}

const adminSchema = new Schema<IAdmin>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profileImage: { type: String },
});

const Admin = model<IAdmin>('Admin', adminSchema);

export default Admin;
