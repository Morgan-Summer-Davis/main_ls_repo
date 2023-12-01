'use strict';

import { NewPatient } from './types';

export function toNewPatient(data: unknown): NewPatient {
  if (typeof data !== 'object') throw new Error('Invalid data');
  if (!data) throw new Error('Data is empty');

  if ('name' in data) console.log(data.name);

  if ('name' in data && 'dateOfBirth' in data && 'ssn' in data &&
      'gender' in data && 'occupation' in data) {
    
    const newPatient = {
      name: validateName(data.name),
      dateOfBirth: validateDateOfBirth(data.dateOfBirth),
      ssn: validateSsn(data.ssn),
      gender: validateGender(data.gender),
      occupation: validateOccupation(data.occupation),
    }
    
    return newPatient;
  }
  
  throw new Error('Malformed data');
}
