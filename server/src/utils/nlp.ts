/* import { execFile } from 'child_process';
import path from 'path';
import { IUser } from '../models/User';

export const analyzeProposal = (proposal: string, advisors: IUser[]): Promise<IUser[]> => {
  return new Promise((resolve, reject) => {
    const scriptPath = path.join(__dirname, '../../scripts/analyze_proposal.py');
    const advisorsJson = JSON.stringify(advisors.map(advisor => ({
      id: advisor._id,
      specializations: advisor.specializations
    })));

    execFile('python', [scriptPath, proposal, advisorsJson], (error, stdout, stderr) => {
      if (error) {
        reject(error);
        return;
      }
      if (stderr) {
        reject(stderr);
        return;
      }
      const result = JSON.parse(stdout);
      const topAdvisors = result.map((item: any) => advisors.find((advisor: any) => advisor._id.toString() === item[0]));
      resolve(topAdvisors);
    });
  });
};
 */