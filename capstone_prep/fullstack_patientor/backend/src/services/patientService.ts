import patients                                     from '../../data/patients';
import { NonSensitivePatient, Patient, NewPatient } from '../types';
import { v1 as uuid }                               from 'uuid';
import { toNewPatient }                             from '../utils';

function getPatients(): Patient[] {
  return patients;
}

function getNonSensitivePatients(): NonSensitivePatient[] {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

function addPatient(data: unknown): Patient {
  const newPatient: NewPatient = toNewPatient(data);
  
  const patient: Patient = { id: uuid(), ...newPatient };
  patients.push(patient);
  
  return patient;
}

export default {
  getPatients,
  getNonSensitivePatients,
  addPatient,
}