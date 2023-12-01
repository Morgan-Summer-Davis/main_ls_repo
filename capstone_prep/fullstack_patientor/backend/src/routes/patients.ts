import express, { Request, Response } from 'express';
import patientService from '../services/patientService';

const router = express.Router();

router.get('/', (_req: Request, res: Response) => {
  // @ts-ignore: Unreachable code error
  res.send(patientService.getNonSensitivePatients());
});

router.post('/', (req: Request, res: Response) => {
  // @ts-ignore: Unreachable code error
  const { name, dateOfBirth, ssn, gender, occupation } = req.body;
  const newPatient = { name, dateOfBirth, ssn, gender, occupation };
  // @ts-ignore: Unreachable code error
  res.send(patientService.addPatient(newPatient));
});

export default router;