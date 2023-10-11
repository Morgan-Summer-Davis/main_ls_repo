// Literal
// a is not defined. Line 9 should read "myObject['a'];"


// Literal Method
// It will print both function objects coerced into strings, as they lack trailing
// parentheses.


// Mutation
//  ['Moe', 'Larry', 'Curly', 'Shemp', 'Harpo', 'Chico', 'Groucho', 'Zeppo']


// Dynamic
// 678
// 456

// Array Object Part 1
// a
// undefined
// d
// 5
// ['a', 'b', 'c', 'f', '-1': 'd', e: 5]


// Array Object Part 2
// No, the result will be 10, as length only counts elements, not attributes.


// What's my Bonus
// arguments
// arguments is a reserved keyword which returns an array-like structure of every
// argument passed to a function, regardless of whether ir has an associated parameter
// or not.


// The End is Near But Not Here
function penultimate(string) {
  let array = string.split(' ')[-2];
  return array[array.length - 2];
}


// After Midnight Part 1
function timeOfDay(deltaMinutes) {
  let date = new Date(1, 1, 1, 0, deltaMinutes);
  return `${padWithZeroes(date.getHours(), 2)}:${padWithZeroes(date.getMinutes(), 2)}`;
}

function padWithZeroes(number, length) {
  let numberString = String(number);

  while (numberString.length < length) {
    numberString = `0${numberString}`;
  }

  return numberString;
}


// After Midnight Part 2
const MINUTES_PER_HOUR = 60;
const HOURS_PER_DAY = 24;
const MINUTES_PER_DAY = HOURS_PER_DAY * MINUTES_PER_HOUR;

function afterMidnight(timeStr) {
  let date = Date.parse(`January 1st, 1970 ${timeStr}:00`);
  return date.getHours() * MINUTES_PER_HOUR + date.getMinutes();
}

function beforeMidnight(timeStr) {
  let date = Date.parse(`January 1st, 1970 ${timeStr}:00`);
  return HOURS_PER_DAY - date.getHours() + MINUTES_PER_HOUR - date.getMinutes();
}