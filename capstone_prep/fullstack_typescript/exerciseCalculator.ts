interface ExerciseInfo {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number,
}

function calculateExercises(target: number, days: number[]): ExerciseInfo | null {
  try {
    if (typeof target !== 'number' || Number.isNaN(target) || 
        days.some(day => typeof day !== 'number' || Number.isNaN(day))) {
      throw new Error('Invalid input');
    }
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
    return null;
  }
  
  const average = days.reduce((a, b) => a + b, 0) / (days.length || 1);
  
  let rating;
  let ratingDescription;
  if (average >= target) {
    rating = 3;
    ratingDescription = 'You did it!';
  } else if (average >= target / 2) {
    rating = 2;
    ratingDescription = 'Not bad but needs improvement.';
  } else {
    rating = 1;
    ratingDescription = 'Needs significant improvement.';
  }
  
  return {
    periodLength: days.length,
    trainingDays: days.filter(num => num !== 0).length,
    success: average >= target,
    rating,
    ratingDescription,
    target,
    average,
  };
}

interface Exercises {
  daily_exercises?: number[],
  target?: number,
}

export default function webCalculateExercises(data: Exercises) {
  if (!data.daily_exercises || !data.target) return JSON.stringify({ error: 'parameters missing' });
  
  const results: ExerciseInfo | null = calculateExercises(data.target, data.daily_exercises);
  const json: ExerciseInfo | { error: string } = results ? results : { error: 'malformed parameters' };
  
  return JSON.stringify(json);
  
}