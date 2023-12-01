'use strict';

import express, { Request, Response } from 'express';
import cors                           from 'cors';

import patientRouter   from './routes/patients';
import diagnosisRouter from './routes/diagnoses';

const app  = express();
const PORT = 8081;

app.use(express.json());
app.use(cors({ origin: '*' }));

app.get('/api/ping', (_req: Request, res: Response) => {
  // @ts-ignore: Unreachable code error
  res.send('pong');
});

app.use('/api/patients', patientRouter);
app.use('/api/diagnoses', diagnosisRouter);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});