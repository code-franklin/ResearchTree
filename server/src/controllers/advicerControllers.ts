import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import Specialization from '../models/Specialization';
import Proposal from '../models/Proposal';

export const registration = async (req: Request, res: Response) => {
  const { name, email, password, role, course, year, handleNumber } = req.body;
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

  const accessKey = 'S39CqUk66cOWo112MpqhlfMjR6qDUlNfRCfs84o2WfIr6v8DQBJ6WK6qHfXe';
  const environmentId = 'ow71fdmlwFekVF3udAQA';

    try {
        const userId = req.params.userId;
        console.log('Fetching user with ID:', userId);

        const user = await User.findById(userId).exec();
        if (!user) {
            return res.status(404).send('User not found');
        }

        const payload = {
            aud: environmentId,
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

// Get all proposals
export const getAllProposals = async (req: Request, res: Response) => {
  try {
    const proposals = await Proposal.find().populate('userId', 'name email');
    res.json(proposals);
  } catch (error) {
    console.error('Error fetching proposals:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
/* admin & advicer */
// Get proposals by user ID
export const getProposalsByUserId = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const proposals = await Proposal.find({ userId }).populate('userId', 'name email');
    res.json(proposals);
  } catch (error) {
    console.error('Error fetching proposals by user ID:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
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
    const acceptedStudents = await User.find({ chosenAdvisor: advisorId, advisorStatus: 'accepted' });
    const declinedStudents = await User.find({ chosenAdvisor: advisorId, advisorStatus: 'declined' });
    const studentsToManage = await User.find({ chosenAdvisor: advisorId, advisorStatus: 'pending' || null });

    res.status(200).json({ acceptedStudents, declinedStudents, studentsToManage });
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ message: 'Internal Server Error' });
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

export const getPanelistStudents = async (req: Request, res: Response) => {
  const { advisorId } = req.params;

  try {
    // Filter students who have been accepted by the panelist
    const students = await User.find({ panelists: advisorId, advisorStatus: 'accepted' }).populate('panelists');
    res.status(200).json({ panelistStudents: students });
  } catch (error) {
    console.error('Error fetching panelist students:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

