import { Schema, model, Document } from 'mongoose';

// Define interface for Proposal document
export interface IProposal extends Document {
  userId: Schema.Types.ObjectId; // Refers to the User model
  proposalTitle: string;          // Proposal title as a string
  proposalText: string;           // Proposal text as a string
  revisionStatus: 'pending' | 'in-review' | 'approved' | 'declined'; // Enum for revision status
  manuscriptStatus: 'draft' | 'submitted' | 'revised' | 'accepted';   // Enum for manuscript status
}

// Define Mongoose schema for Proposal
const proposalSchema = new Schema<IProposal>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  proposalTitle: { type: String, required: true }, // Add this field to the schema
  proposalText: { type: String, required: true },
  revisionStatus: { 
      type: String, 
      enum: ['pending', 'in-review', 'approved', 'declined'], 
      default: 'pending' 
  },
  manuscriptStatus: { 
      type: String, 
      enum: ['draft', 'submitted', 'revised', 'accepted'], 
      default: 'draft' // Default status for manuscript
  },
});

// Create and export Mongoose model
const Proposal = model<IProposal>('Proposal', proposalSchema);

export default Proposal;
