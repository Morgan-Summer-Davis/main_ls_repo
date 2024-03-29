'use strict';

import express, { Request, Response } from 'express';
import calculateBMI from './bmiCalculator';
import calculateExercises from './exerciseCalculator';

interface ErrorObject {
  error: string,
}

interface QueryParams {
  [key: string]: unknown;
}

const app = express();
const PORT = 8080;

app.use(express.json());

app.get('/hello', (_req: Request, res: Response) => {
  // @ts-ignore: Unreachable code error
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req: Request, res: Response) => {
  let results: { height: number, weight: number, bmi: string } | ErrorObject;
  // This should likely be done by setting req as a generic Request, but I can't
  // seem to figure that out rn.
  // @ts-ignore: Unreachable code error
  const query: QueryParams = req.query as QueryParams;
  
  if (typeof query.height !== 'string' ||
      typeof query.weight !== 'string' ||
      Number.isNaN(parseInt(query.height, 10)) ||
      Number.isNaN(parseInt(query.weight, 10))) {
    results = { error: 'malformed parameters' };
    // @ts-ignore: Unreachable code error
    return res.send(JSON.stringify(results));
  }
  
  const height: number = parseInt(query.height, 10);
  const weight: number = parseInt(query.weight, 10);
  
  // @ts-ignore: Unreachable code error
  return res.send({
    height: height,
    weight: weight,
    bmi: calculateBMI(height, weight),
  });
});

app.post('/exercises/', (req: Request, res: Response) => {
  // @ts-ignore: Unreachable code error
  res.send(calculateExercises(req.body));
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});