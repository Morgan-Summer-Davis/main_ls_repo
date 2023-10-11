// Building Strings
// Because there is trailing whitespace following 'rutrum \', this throws a SyntaxError.


// Conditionals Part 1
// 7: 'Hello'
// 11: will not execute
// 15: 'World'
// 19: '!'


// Conditionals Part 2
// 5


// String Assignment
// Bob Bob
// String.prototype.toUpperCase() does not mutate its caller, as strings are immutable.


// Arithmetic Integer
const rlSync = require("readline-sync");

console.log('==> Enter the first number:');
let firstNum = rlSync.prompt();
console.log('==> Enter the second number:');
let secondNum = rlSync.prompt();

['+', '-', '*', '/', '%', '**'].forEach (operator => {
  console.log(`==> ${firstNum} ${operator} ${secondNum} = ${eval(firstNum + operator + secondNum)}`);
});


// Counting the Number of Characters
console.log('Please enter a phrase:');
let phrase = rlSync.prompt();
let phraseLength = (phrase.match(/[a-zA-z]+/g) || []).join('').length;
console.log(`There are ${phraseLength} alphabetic characters in "${phrase}".`);

// Convert a String to a Number
const NUMERIC_STRING_ARRAY = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

function stringToInteger(str) {
  let negative = (str[0] === '-');
  if (str[0] === '-' || str[0] === '+') str = str.slice(1);

  let numArray = str.split('').map(char => {
    return NUMERIC_STRING_ARRAY.findIndex(numStr => numStr === char);
  });
  numArray = numArray.reverse();

  let multiplier = 1;
  let output = 0;


  return negative ? -output : output;
};

console.log(stringToInteger('+4321'));      // 4321
console.log(stringToInteger('-570'));       // 570

// Convert a String to a Signed Number
// Incoprorated into the answer above.

// Convert a Number to a String
function integerToString(int) {
  let numArray = [];
  let negative = (int < 0 || int === -0);
  int = Math.abs(int);

  do {
    numArray.unshift( int % 10);
    int = (int - int % 10) / 10;
  } while (int > 0);
  numArray.unshift(negative ? '-' : '+');

  return numArray.join().replaceAll(',', '');
};

console.log(integerToString(-4321));      // "4321"
console.log(integerToString(-0));         // "0"
console.log(integerToString(5000));      // "5000"

// Convert a Signed Number to a String
// Implemented into solution above.