import { Request, Response } from 'express';
import mongoose, { Document, ObjectId } from 'mongoose';
import User from '../models/User';
import Proposal from '../models/Proposal';
import { v4 as uuidv4 } from 'uuid'; // Using UUID to generate a unique channel ID

interface IAdvisor {
  id: string;
  specializations: string[];
}

interface IStudent extends Document {
  channelId: string;
  _id: ObjectId;
  advisorStatus: string;
  chosenAdvisor: ObjectId | null;
  declinedAdvisors: ObjectId[];
  panelists: ObjectId[];
}

let NlpManager: any;

// Function to dynamically load NlpManager
const loadNlpManager = async () => {
  const nlpModule = await import('node-nlp');
  NlpManager = nlpModule.NlpManager;
};

// Load NlpManager at the start
loadNlpManager().catch(err => console.error('Failed to load NlpManager:', err));

const getTopAdvisors = async (): Promise<IAdvisor[]> => {
  const advisors = await User.find({ role: 'adviser', isApproved: true }).limit(5);
  return advisors.map(advisor => ({
    id: (advisor._id as unknown as string).toString(),
    specializations: advisor.specializations,
  }));
};
// Refine analyzeProposal function for better NLP matching
const analyzeProposal = async (proposalText: string, advisors: IAdvisor[]): Promise<IAdvisor[]> => {
  if (!NlpManager) {
    throw new Error("NlpManager is not loaded yet.");
  }

  const manager = new NlpManager({ languages: ['en'], forceNER: true });

  // Adding documents based on specializations
  advisors.forEach((advisor: IAdvisor) => {
    advisor.specializations.forEach((specialization: string) => {
      manager.addDocument('en', `I am researching ${specialization}`, advisor.id);
      manager.addDocument('en', `My research focuses on ${specialization}`, advisor.id);
      manager.addDocument('en', `I need help with ${specialization}`, advisor.id);
      manager.addDocument('en', `${specialization} is my primary research area`, advisor.id);
    });
  });

  await manager.train();

  const response = await manager.process('en', proposalText);
  const classifiedAdvisors = response.classifications.map((classification: any) => ({
    id: classification.intent,
    score: classification.score,
  }));

  classifiedAdvisors.sort((a: any, b: any) => b.score - a.score);

  // Map classifications back to advisor objects and filter top matches
  const topAdvisors = classifiedAdvisors
    .map((classifiedAdvisor: any) => advisors.find((advisor: IAdvisor) => advisor.id === classifiedAdvisor.id))
    .filter((advisor: IAdvisor | undefined): advisor is IAdvisor => advisor !== undefined);

  return topAdvisors.slice(0, 5); // Return top 5 matching advisors
};

// Updating the createProposal function
export const createProposal = async (req: Request, res: Response) => {
  const { userId, proposalText } = req.body;

  if (!userId || !proposalText) {
    return res.status(400).json({ message: 'userId and proposalText are required' });
  }

  try {
    // Ensure NLP manager is loaded
    await loadNlpManager();

    // Find the student by userId
    const student = await User.findById(userId) as IStudent | null;
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Prevent proposal submission if the advisor has already accepted
    if (student.advisorStatus === 'accepted') {
      return res.status(400).json({ message: 'Cannot submit proposal after advisor acceptance' });
    }

    // Generate a unique channelId
    const channelId = uuidv4();
    student.channelId = channelId;
    await student.save(); // Save the updated channelId to the student's record

    // Fetch advisors excluding those the student has declined
    const declinedAdvisors = student.declinedAdvisors || [];
    const advisors = await User.find({
      role: 'adviser',
      isApproved: true,
      _id: { $nin: declinedAdvisors }
    });

    // Analyze proposal and get top advisors based on specialization matching
    const topAdvisors = await analyzeProposal(proposalText, advisors as IAdvisor[]);

    // Create and save the new proposal
    const newProposal = await Proposal.create({ userId, proposalText });

    // Respond with the created proposal, top advisors, and channelId
    res.status(201).json({ proposal: newProposal, topAdvisors, channelId });
    console.log('Top Advisors after slicing:', topAdvisors.slice(0, 5));

  } catch (error) {
    console.error('Error creating proposal:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Get Proposal by userId
export const getProposalByUser = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    // Find the proposal for the specific user
    const proposal = await Proposal.findOne({ userId });

    if (!proposal) {
      return res.status(404).json({ message: 'No proposal found for this user' });
    }

    // Respond with the proposal data
    res.status(200).json(proposal);
  } catch (error) {
    console.error('Error fetching proposal:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const chooseAdvisor = async (req: Request, res: Response) => {
  const { userId, advisorId } = req.body;

  if (!userId || !advisorId) {
    return res.status(400).json({ message: 'userId and advisorId are required' });
  }

  try {
    const student = await User.findById(userId) as IStudent | null;
    if (student?.chosenAdvisor && student.advisorStatus !== 'declined') {
      return res.status(400).json({ message: 'Advisor already chosen' });
    }

    const topAdvisors = await getTopAdvisors();
    const panelists = topAdvisors.filter(advisor => advisor.id !== advisorId).slice(0, 3);

    if (student) {
      student.chosenAdvisor = advisorId;
      student.advisorStatus = 'pending';
      student.panelists = panelists.map(panelist => new mongoose.Types.ObjectId(panelist.id) as unknown as ObjectId);
      await student.save();
    }

    res.status(200).json({ message: 'Advisor chosen and panelists assigned successfully', student });
  } catch (error) {
    console.error('Error choosing advisor:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

/* export const postUploadManuscript = (req: Request, res: Response) => {
  const { channelId, userId } = req.body;

  if (!channelId || !userId) {
    return res.status(400).json({ error: 'Missing channelId or userId' });
  }

  // Handle the unique channel ID and user ID
  console.log(`Received upload request: channelId=${channelId}, userId=${userId}`);

  // Here, you can associate the channelId with the userId and store it in your database if needed.

  res.status(200).json({ message: 'Upload process started' });
}; */

export const getStudentAdvisorInfo = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const student = await User.findById(userId).populate('chosenAdvisor').populate('panelists');
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json({ chosenAdvisor: student.chosenAdvisor, advisorStatus: student.advisorStatus, panelists: student.panelists });
  } catch (error) {
    console.error('Error fetching student advisor info:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Training Endpoint
export const trainModel = async (req: Request, res: Response) => {
  const { language, data } = req.body; // Extracting language and data

  try {
    if (!NlpManager) {
      throw new Error("NlpManager is not loaded yet.");
    }

    const manager = new NlpManager({ languages: ['en'], forceNER: true });

    // Check if data is an array and contains training entries
    if (language && Array.isArray(data)) {
      data.forEach(({ text, sentiment, specializations, keywords }) => {
        if (text && sentiment && Array.isArray(specializations) && Array.isArray(keywords)) {
          manager.addDocument(language, text, sentiment);

          specializations.forEach(spec => {
            const keywordText = `This proposal is related to ${spec} and involves ${keywords.join(', ')}`;
            console.log('Adding document:', keywordText);
            manager.addDocument(language, keywordText, sentiment);
          });
        } else {
          throw new Error('Invalid input data for a specific training entry.');
        }
      });
    } else {
      throw new Error('Invalid input data.');
    }

    await manager.train();
    manager.save();

    res.json({ message: 'Training data with keywords added successfully!' });
  } catch (error) {
    console.error('Error training model:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
          