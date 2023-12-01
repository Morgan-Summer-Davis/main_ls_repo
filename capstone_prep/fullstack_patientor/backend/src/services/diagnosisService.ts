import diagnoses from '../../data/diagnoses';
import { Diagnosis } from '../types';

export default function getDiagnoses(): Diagnosis[] {
  return diagnoses;
}