import express, { Request, Response } from 'express';
import patientService from '../services/diagnosisService';

const router = express.Router();

router.get('/', (_req: Request, res: Response) => {
  // @ts-ignore: Unreachable code error
  res.send(patientService.getDiagnoses());
});

export default router;