import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import Specialization from '../models/Specialization';
import { ObjectId } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config(); // This loads the variables from your .env file

export const registration = async (req: Request, res: Response) => {
  const { name, email, password, role, course, year, handleNumber, groupMembers } = req.body;
  const specializations = JSON.parse(req.body.specializations);
  const profileImage = (req as any).file?.filename;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
      profileImage,
      specializations,
      course, // Add course
      year,   // Add year
      handleNumber, // Add handle number
      groupMembers: JSON.parse(groupMembers), // Store group members
      isApproved: false,
    });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully. Awaiting admin approval.' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};



export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
      const user = await User.findOne({ email });
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      if (!user.isApproved) {
          return res.status(403).json({ message: 'Your account has not been approved by the admin yet.' });
      }

      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) {
          return res.status(400).json({ message: 'Invalid credentials' });
      }

      // Create the token with user info
      const token = jwt.sign(
          { id: user._id, email: user.email, role: user.role },
          process.env.JWT_SECRET as string,
          { expiresIn: '1h' }
      );

      // Send the token and user information
      res.status(200).json({ token, user });
  } catch (error) {
      console.error('Login Error:', error);
      res.status(500).json({ message: 'Something went wrong', error: (error as Error).message });
  }
};

/* ckeditor API */

export const getToken = async (req: Request, res: Response) => {

  const accessKey = 'Wpung94G477QYTOHnekNJRaFwqwidLblAg5TH3TwhHhP7Kyr3vL00cepfjEs';
  const environmentId = 'fHHPZIrfIML2dQHco1XV';

    try {
        const userId = req.params.userId;
        console.log('Fetching user with ID:', userId);

        console.log('Environment ID:', process.env.environmentId);
        console.log('Access Key:', process.env.accessKey);


        const user = await User.findById(userId).exec();
        if (!user) {
            return res.status(404).send('User not found');
        }

        const payload = {
            aud: process.env.environmentId || environmentId,
            sub: (user._id as string).toString(),
            user: {
                email: user.email,
                name: user.name,
                role: user.role,
            },
            auth: {
                'collaboration': {
                    '*': {
                        'role': 'writer'
                    }
                }
            }
        };

        console.log('Payload for JWT:', payload);

        const token = jwt.sign(payload, accessKey, { algorithm: 'HS256', expiresIn: '24h' });
        res.send(token);
    } catch (error) {
        console.error('Error generating token:', error);
        res.status(500).send('Error generating token');
    }
};

/* admin & advicer */

/* // Get all proposals
export const getAllProposals = async (req: Request, res: Response) => {
  try {
    const proposals = await Proposal.find().populate('userId', 'name email');
    res.json(proposals);
  } catch (error) {
    console.error('Error fetching proposals:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}; */
/* admin & advicer */
/* // Get proposals by user ID
export const getProposalsByUserId = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const proposals = await Proposal.find({ userId }).populate('userId', 'name email');
    res.json(proposals);
  } catch (error) {
    console.error('Error fetching proposals by user ID:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}; */
/* admin & advicer */
  export const listStudentsManage = async (req: Request, res: Response) => {
  const { advisorId } = req.params;

  try {
    const students = await User.find({ chosenAdvisor: advisorId, advisorStatus: { $exists: false } });
    res.status(200).json({ students });
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

/* admin & advicer */
export const updateStatusStudent = async (req: Request, res: Response) => {
  const { studentId, status } = req.body;

  if (!studentId || !status) {
    return res.status(400).json({ message: 'studentId and status are required' });
  }

  try {
    await User.findByIdAndUpdate(studentId, { advisorStatus: status });
    res.status(200).json({ message: 'Student status updated successfully' });
  } catch (error) {
    console.error('Error updating student status:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

/* Specialization to choose */
export const getSpecializations = async (req: Request, res: Response) => {
  try {
    const specializations = await Specialization.find();
    res.status(200).json(specializations);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};


export const getAdviserStudents = async (req: Request, res: Response) => {
  const { advisorId } = req.params;

  try {
    // Fetch only students with the chosen advisor and their respective statuses
    const acceptedStudents = await User.find(
      { chosenAdvisor: advisorId, advisorStatus: 'accepted', role: 'student' }, // Ensure only students
      'name groupMembers channelId panelists course profileImage manuscriptStatus proposals tasks'
    ).lean();

    const declinedStudents = await User.find({ chosenAdvisor: advisorId, advisorStatus: 'declined', role: 'student' });
    const studentsToManage = await User.find({ chosenAdvisor: advisorId, advisorStatus: 'pending', role: 'student' });

    // Fetch names of panelists for each student
    const studentData = await Promise.all(
      acceptedStudents.map(async (student) => {
        // Fetch panelist names
        const panelistNames = await User.find({ _id: { $in: student.panelists } }, 'name').lean();
        const panelistNameList = panelistNames.map((panelist) => panelist.name);

        const latestProposal = student.proposals.length > 0 ? student.proposals[student.proposals.length - 1] : null;

        return {
          _id: student._id,
          name: student.name,
          groupMembers: student.groupMembers,
          channelId: student.channelId,
          panelists: panelistNameList, // Return panelist names instead of IDs
          course: student.course,
          profileImage: student.profileImage,
          manuscriptStatus: student.manuscriptStatus,
          chosenAdvisor: student.chosenAdvisor,
          proposalTitle: latestProposal ? latestProposal.proposalTitle : 'No proposal submitted',
          submittedAt: latestProposal ? latestProposal.submittedAt : null,
        };
      })
    );

    res.status(200).json({ acceptedStudents: studentData, declinedStudents, studentsToManage });
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Add Task API - POST /api/advicer/add-task/:studentId
export const addTaskMyAdvicee = async (req: Request, res: Response) => {
  const { studentId } = req.params;
  const { taskTitle } = req.body;

  try {
    const student = await User.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Add the new task
    student.tasks.push({
      taskTitle, isCompleted: false,
      _id: new ObjectId
    });
    await student.save();

    res.status(200).json({ message: 'Task added successfully' });
  } catch (error) {
    console.error('Error adding task:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};



export const getPanelistStudents = async (req: Request, res: Response) => {
  const { advisorId } = req.params;

  try {
    // Fetch students where the advisor is a panelist and their advisorStatus is 'accepted'
    const panelistStudents = await User.find(
      { panelists: advisorId, advisorStatus: 'accepted' },
      'name groupMembers channelId course profileImage chosenAdvisor manuscriptStatus proposals panelists tasks'
    )
    .populate('chosenAdvisor', 'name profileImage') // Populate advisor's name and profile image
    .populate('panelists', 'name'); // Fetch names of panelists
    

    // Map through students and fetch names of the panelists
    const studentData = await Promise.all(
      panelistStudents.map(async (student) => {
        // Fetch panelist names
        const panelistNames = await User.find({ _id: { $in: student.panelists } }, 'name').lean();
        const panelistNameList = panelistNames.map((panelist) => panelist.name);

        const latestProposal = student.proposals.length > 0 ? student.proposals[student.proposals.length - 1] : null;

        return {
          _id: student._id,
          name: student.name,
          groupMembers: student.groupMembers,
          channelId: student.channelId,
          course: student.course,
          profileImage: student.profileImage,
          chosenAdvisor: student.chosenAdvisor,
          manuscriptStatus: student.manuscriptStatus,
          panelists: panelistNameList, // Return panelist names instead of IDs
          proposalTitle: latestProposal ? latestProposal.proposalTitle : 'No proposal submitted',
          submittedAt: latestProposal ? latestProposal.submittedAt : null,
          tasks: student.tasks,
        };
      })
    );

    res.status(200).json({ panelistStudents: studentData });
  } catch (error) {
    console.error('Error fetching panelist students:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
  
// Function to update manuscript status for a student
export const updateManuscriptStatus = async (req: Request, res: Response) => {
  const { channelId, manuscriptStatus } = req.body;  // Frontend sends `channelId` of the student and new manuscript status

  try {
    // Find the student by channelId and update their manuscriptStatus
    const student = await User.findOneAndUpdate(
      { _id: channelId },  // `channelId` should be the student's ID
      { manuscriptStatus },
      { new: true }  // Return the updated document
    );

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Respond with success and the updated student data
    res.status(200).json({
      message: 'Manuscript status updated successfully',
      student,
    });

    console.log('Received ManuscriptStatus:', manuscriptStatus);

  } catch (error) {
    console.error('Error updating manuscript status:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

/* accepted opr declined the student */

export const respondToStudent = async (req: Request, res: Response) => {
  const { studentId, advisorId, status } = req.body;

  if (!studentId || !advisorId || !status) {
    return res.status(400).json({ message: 'studentId, advisorId, and status are required' });
  }

  try {
    const student = await User.findById(studentId);
    if (!student || !student.chosenAdvisor || student.chosenAdvisor.toString() !== advisorId) {
      return res.status(404).json({ message: 'Student not found or advisor mismatch' });
    }
    
    student.advisorStatus = status;
    await student.save();
    
    res.status(200).json({ message: `Student ${status} successfully` });
  } catch (error) {
    console.error('Error responding to student:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};