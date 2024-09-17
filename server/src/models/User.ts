import mongoose, { Schema, Document, model } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: 'student' | 'adviser';
  profileImage: string;
  specializations: string[];
  course?: string; // For student course
  year?: number; // For student year
  handleNumber?: number; // For adviser handle number
  isApproved: boolean;
  chosenAdvisor: Schema.Types.ObjectId | null;
  advisorStatus: 'accepted' | 'declined' | 'pending' | null;
  declinedAdvisors: Schema.Types.ObjectId[];
  panelists: Schema.Types.ObjectId[];
  channelId?: string; // Optional field for channel ID
  
}

const userSchema: Schema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ['student', 'adviser'] },
  profileImage: { type: String, required: false },
  specializations: { type: [String], required: function() { return this.role === 'adviser'; } },
  course: { type: String }, // For student course
  year: { type: Number }, // For student year
  handleNumber: { type: Number }, // For adviser handle number
  isApproved: { type: Boolean, default: false },
  chosenAdvisor: { type: Schema.Types.ObjectId, ref: 'User', default: null },
  advisorStatus: { type: String, enum: ['accepted', 'declined', 'pending', null] },
  declinedAdvisors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  panelists: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  channelId: { type: String }, // Add the channelId field
});

const User = model<IUser>('User', userSchema);

export default User;
