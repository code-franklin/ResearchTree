import { Schema, model, Document } from 'mongoose';

// Define interface for Proposal document
export interface IProposal extends Document {
  userId: Schema.Types.ObjectId;
  proposalText: string;
}

// Define Mongoose schema for Proposal
const proposalSchema = new Schema<IProposal>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  proposalText: { type: String, required: true },
});

// Create and export Mongoose model
const Proposal = model<IProposal>('Proposal', proposalSchema);

export default Proposal;