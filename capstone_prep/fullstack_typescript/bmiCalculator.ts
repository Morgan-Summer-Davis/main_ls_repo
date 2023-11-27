const CENTIMETERS_IN_METER: number = 100;

export default function calculateBMI(height: number, weight: number): string | null {
  console.log('args:', height, weight);
  try {
    if ([height, weight].some((arg: number) => {
      return typeof arg !== 'number' || Number.isNaN(arg) || arg === 0;
    })) {
      throw new Error('Invalid input');
    }
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
    return null;
  }
  
  const index: number = weight / (height / CENTIMETERS_IN_METER)**2;

  if      (index < 16)    return 'Underweight (Severe thinness)';
  else if (index <= 16.9) return 'Underweight (Moderate thinness)';
  else if (index <= 18.4) return 'Underweight (Mild thinness)';
  else if (index <= 24.9) return 'Normal range';
  else if (index <= 29.9) return 'Overweight (Pre-obese)';
  else if (index <= 34.9) return 'Obese (Class I)';
  else if (index <= 39.9) return 'Obese (Class II)';
  else                    return 'Obese (Class III)';
}