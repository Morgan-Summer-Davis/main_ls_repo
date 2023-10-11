// Odd Numbers
function oddNumbers(max) {
  for (let index = 1; index <= max; index += 2) {
    console.log(index);
  }
  // Further exploration
  [...Array(max).keys()].forEach(num => { if (num % 2 !== 0) console.log(num) });
}


// Even Numbers
function evenNumbers() {
  for (let index = 2; index <= 98; index += 2) {
    console.log(index);
  }
}


// How Big is the Room
const rlSync = require('readline-sync');

function howBigIsTheRoom() {
  const FEET_IN_A_METER = 10.7639;
  let unit = '';

  console.log('Enter the unit for measurement (feet or meters):')
  while (!unit) {
    let input = rlSync.prompt();

    if (input === 'feet' || input === 'meters') {
      unit = input
    } else {
      console.log('Invalid input. Please enter either feet or meters.')
    }
  }

  console.log('Enter the length of the room:');
  let length = rlSync.prompt();
  console.log('Enter the width of the room:');
  let width  = rlSync.prompt();

  let area          = length * width;
  let convertedArea = unit === 'meters' ? area * FEET_IN_A_METER : area / FEET_IN_A_METER;
  let otherUnit     = unit === 'meters' ? 'feet' : 'meters'

  console.log(`The area of the room is ${area} square ${unit} (${convertedArea} square ${otherUnit}).`)
}


// Tip Calculator
function tipCalculator() {
  console.log('What is the bill?');
  let bill = Number(rlSync.prompt());
  console.log('What is the tip percentage?');
  let tip  = Number(rlSync.prompt());
  tip      *= bill * 0.01;

  let formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
  console.log(`The tip is ${formatter.format(tip)}`);
  console.log(`The total is ${formatter.format(bill + tip)}`);
}


// Sum or Product of Consecutive Integers
function sumOrProducteOfConsecutiveIntegers() {
  console.log('Please enter an integer greater than 0:');
  let int      = Number(rlSync.prompt());
  console.log('Enter "s" to compute the sum, or "p" to compute the product.');
  let operator = rlSync.prompt();

  while (operator !== 's' && operator !== 'p') {
    console.log('Invalid input. Please enter "s" or "p".');
    operator = rlSync.prompt();
  }

  let output = 0;
  if (operator === 's') {
    output   = [...Array(int + 1).keys()].slice(1).reduce((acc, num) => acc + num, 0);
    operator = 'sum';
  } else {
    output   = [...Array(int + 1).keys()].slice(1).reduce((acc, num) => acc * num, 1);
    operator = 'product';
  }

  console.log(`The ${operator} of the integers between 1 and ${int} is ${output}.`);
}


// Short Long Short
function shortLongShort(str1, str2) {
  let long  = '';
  let short = '';

  if (str1.length < str2.length) {
    long  = str2;
    short = str1;
  } else {
    long  = str1;
    short = str2;
  }

  return short + long + short;
}


// Leap Years Part 1
function isLeapYear(year) {
  if (year % 400 === 0 || (year < 1752 && year % 4 === 0) || (year % 4 === 0 && year % 100 !== 0)) {
    return true;
  }

  return false;
}


// Leap Years Part 2
// Implemented into solution above.


// Multiples of 3 and 5
function multisum(lastNum) {
  let numArray = [...Array(lastNum + 1).keys()].slice(1).filter(num => num % 3 === 0 || num % 5 === 0);

  return numArray.reduce((acc, elem) => acc + elem, 0);
}


// UTF-16 String Value
function utf16Value(str) {
  return str.split('').map(char => char.charCodeAt(0)).reduce((acc, elem) => acc + elem, 0);
}