type Combinable = string | number;

function combine(a: Combinable, b: Combinable): Combinable {
  if      (typeof a === 'number' && typeof b === 'number') return a + b;
  else if (typeof a === 'string' && typeof b === 'string') return a + b;
  else throw new Error('Invalid combination');
}