import mongoose, { Schema, Document, model } from 'mongoose';

// Define interface for the proposal within the user schema
interface IProposal {
  proposalTitle: string;
  proposalText: string;
  submittedAt: Date;
}

// Define interface for a task (as a subdocument)
interface ITask extends mongoose.Types.Subdocument {
  taskTitle: string;
  isCompleted: boolean;
}

// Define interface for User document
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: 'student' | 'adviser';
  profileImage: string;
  specializations: string[];
  course?: string;
  year?: number;
  handleNumber?: number;
  isApproved: boolean;
  chosenAdvisor: Schema.Types.ObjectId | null;
  advisorStatus: 'accepted' | 'declined' | 'pending' | null;
  declinedAdvisors: Schema.Types.ObjectId[];
  panelists: Schema.Types.ObjectId[];
  channelId?: string;
  groupMembers: string[];
  proposals: IProposal[];
  tasks: mongoose.Types.DocumentArray<ITask>; // Updated tasks array
}

const userSchema: Schema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ['student', 'adviser'] },
  profileImage: { type: String, required: false },
  specializations: { type: [String], required: function() { return this.role === 'adviser'; } },
  course: { type: String },
  year: { type: Number },
  handleNumber: { type: Number },
  isApproved: { type: Boolean, default: false },
  chosenAdvisor: { type: Schema.Types.ObjectId, ref: 'User', default: null },
  advisorStatus: { type: String, enum: ['accepted', 'declined', 'pending', null] },
  declinedAdvisors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  panelists: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  channelId: { type: String },
  groupMembers: { type: [String], required: function() { return this.role === 'student'; } },
  proposals: [{
    proposalTitle: { type: String, required: true },
    proposalText: { type: String, required: true },
    submittedAt: { type: Date, default: Date.now },
  }],
  tasks: [
    {
      taskTitle: { type: String, required: true },
      isCompleted: { type: Boolean, default: false },
    },
  ],
});

const User = model<IUser>('User', userSchema);

export default User;
