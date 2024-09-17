import { Schema, model, Document } from 'mongoose';

interface ISpecialization extends Document {
  name: string;
}

const specializationSchema = new Schema<ISpecialization>({
  name: { type: String, required: true, unique: true }
});

const Specialization = model<ISpecialization>('Specialization', specializationSchema);

export default Specialization;
