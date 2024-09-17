import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin';
import User from '../models/User'
import Specialization from '../models/Specialization';

const JWT_SECRET = 'your_jwt_secret';

export const registerAdmin = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const profileImage = req.file ? `/public/uploads/${req.file.filename}` : undefined;

  // Manually check if all required fields are present
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Please include all fields' });
  }

  try {
    let admin = await Admin.findOne({ email });

    if (admin) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    admin = new Admin({
      name,
      email,
      password: hashedPassword,
      profileImage
    });

    await admin.save();

    const token = jwt.sign({ id: admin._id }, JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const loginAdmin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: admin._id }, JWT_SECRET, { expiresIn: '1h' });

    res.json({ token, user: { name: admin.name, email: admin.email, profileImage: admin.profileImage } });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const approveUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const user = await User.findByIdAndUpdate(userId, { isApproved: true }, { new: true });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User approved', user });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const declineUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User declined and removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const getPendingUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find({ isApproved: false });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};


export const getSpecializations = async (req: Request, res: Response) => {
  try {
    const specializations = await Specialization.find();
    res.status(200).json(specializations);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};

export const addSpecialization = async (req: Request, res: Response) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: 'Specialization name is required' });
  }

  try {
    const newSpecialization = new Specialization({ name });
    await newSpecialization.save();
    res.status(201).json(newSpecialization);
  } catch (error) {
    console.error('Error adding specialization:', error);
    res.status(500).json({ message: 'Something went wrong', error });
  }
};


export const updateSpecialization = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const updatedSpecialization = await Specialization.findByIdAndUpdate(id, { name }, { new: true });
    res.status(200).json(updatedSpecialization);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};

export const deleteSpecialization = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await Specialization.findByIdAndDelete(id);
    res.status(200).json({ message: 'Specialization deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};
