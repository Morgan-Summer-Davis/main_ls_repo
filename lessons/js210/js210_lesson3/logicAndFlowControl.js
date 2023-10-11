// Odd Numbers
function logOddNumbers(num) {
  for (let index = 1; index <= num; index += 2) {
    console.log(index);
  }
}

function furtherLogOddNumbers(num) {
  for (let index = 1; index <= num; index++) {
    if (index % 2 === 0) continue;
    console.log(index);
  }
}


// Multiples of Three and Five
function multiplesOfThreeAndFive(min = 1, max = 100) {
  for (let index = min; index <= max; index++) {
    if (index % 3 === 0 || index % 5 === 0) {
      if (index % 3 === 0 && index % 5 === 0) {
        console.log(index + '!');
      } else {
        console.log(index);
      }
    }
  }
}


// Print Multiples
function logMultiples(number) {
  let numArray = [];
  for (let index = 1; index * number <= 100; index += 2) {
    numArray.unshift(index * number);
  }

  numArray.forEach(num => console.log(num));
}


// FizzBuzz
function fizzBuzz() {
  let string = ''

  for (let index = 1; index <= 100; index++) {
    string = '';
    if (index % 3 === 0) string += 'Fizz';
    if (index % 5 === 0) string += 'Buzz';
    if (!string) string = index;
    console.log(string);
  }
}


// Prime Check
function isPrime(num) {
  if (num < 2) return false;

  for (let index = num - 1; index > 1; index--) {
    if (num % index === 0) return false;
  }

  return true;
}


// XOR
function isXor(arg1, arg2) {
  if ((arg1 || arg2) && !(arg1 && arg2)) return true;
  return false;
}


// Guessing the Password
const rlSync = require('readline-sync');

function guessThePassword() {
  let password = 'password'
  let guess = '';

  for (let index = 0; index < 3; index++) {
    console.log('What is the password?')
    guess = rlSync.prompt();
    if (guess === password) return console.log('You have successfully logged in.');
  }

  console.log('You have been denied access.')
}


// Student Grade
function calculateGrade(gradeNum = 3) {
  let scores = [];

  for (let index = 1; index <= gradeNum; index++) {
    console.log(`Enter score ${index}:`)
    scores.push(Number(rlSync.prompt()));
  }

  let score = scores.reduce((acc, value) => acc + value) / 3
  if (score >= 90) {
    score = 'A'
  } else if (score >= 70) {
    score = 'B'
  } else if (score >= 50) {
    score = 'C'
  } else {
    score = 'F'
  }

  console.log (`Based on the average of your 3 scores your letter grade is "${score}".`)
}


// Greatest Common Divisor
function gcd(...nums) {
  let divisors = [];

  nums.forEach(num => {
    for (let index = num; index >= 1; index--) {
      if (num % index === 0) divisors.push(index);
    }
  });

  divisors = divisors.filter(div1 => divisors.filter(div2 => div1 === div2).length > 1);
  return divisors.sort().pop();
}


// Goldbach Numbers
function checkGoldbach(num) {
  if (num < 4 || num % 2 !== 0) return null;

  for (let index = 1; index <= Math.round(num / 2); index++) {
    if (isPrime(index) && isPrime(num - index)) console.log(index + ' ' + (num - index));
  }
}


// Pattern Generation
function generatePattern(nStars) {
  let width = [...Array(nStars + 1).keys()].slice(1).join().replaceAll(',', '').length;
  let nums = '';

  for (let index = 1; index <= nStars; index++) {
    nums = [...Array(index + 1).keys()].slice(1).join().replaceAll(',', '');
    console.log(nums + '*'.repeat(width - nums.length));
  }
}


// Index of Substring
function indexOf(firstString, secondString) {
  for (let i = 0; i < firstString.length; i++) {
    if (firstString[i] === secondString[0]) {
      for (let j = 0; j < secondString.length; j++) {
        if (firstString[i + j] !== secondString[j]) break;
        if (j === secondString.length - 1) return console.log(i);
      }
    }
  }

  return console.log(-1);
}

function lastIndexOf(firstString, secondString) {
  for (let i = firstString.length - 1; i >= 0; i--) {
    if (firstString[i] === secondString[0]) {
      for (let j = 0; j < secondString.length; j++) {
        if (firstString[i + j] !== secondString[j]) break;
        if (j === secondString.length - 1) return i;
      }
    }
  }

  return -1;
}


// Trimming Spaces
function trim(str) {
  let output = '';

  for (let index = 0; index < str.length; index++) {
    if (str[index] === ' ') continue;

    output += str[index];
  }

  for (let i = output.length; i >= 0; i--) {
    if (str[i] === ' ') continue;

    let finalIndex = i;
    output = '';

    for (let j = 0; j <= finalIndex; j++) {
      output += str[j];
    }
  }
}

function trim(str) {
  while (str[0] === ' ') {
    str = str.slice(1);
  }

  while (str.slice(-1) === ' ') {
    str = str.slice(0, str.length - 1);
  }

  return console.log(str);
}


// Splitting a String
function splitString(string, delimiter) {
  if (delimiter === undefined) return console.log('ERROR: No delimiter');

  let output = []
  let delimiterIndexes = [-1];

  if (delimiter === '') {
    for (let index = 0; index < string.length; index++) {
      output.push(string[index]);
    }
  } else {
    for (let index = 0; index < string.length; index++) {
      if (string[index] === delimiter) delimiterIndexes.push(index);
    }
    delimiterIndexes.push(string.length);

    delimiterIndexes.forEach(delimiterIndex => {
      if (delimiterIndex >= delimiterIndexes[delimiterIndexes.length - 1]) return;

      let arrIndex = delimiterIndexes.indexOf(delimiterIndex);
      let substring = '';

      for (let index = delimiterIndex + 1; index < delimiterIndexes[arrIndex + 1]; index++) {
             substring += string[index];
           }

      output.push(substring);
    });

    while (output[output.length - 1] === '') {
      output.pop();
    }
  }

  output.forEach(substring => console.log(substring));
}


// Repeating Strings
function repeat(string, times) {
  if (typeof times !== 'number' || times < 0) return undefined;

  let output = '';
  let index = 1;

  while (index <= times) {
    output += string;
    index++;
  }

  return output;
}


// String StartsWith
function startsWith(string, searchString) {
  for (let index = 0; index < searchString.length; index++) {
    if (string[index] !== searchString[index]) return false;
  }

  return true;
}


// Converting Strings to Lower Case
function toLowerCase(string) {
  const ASCII_CASE_CONVERSION_NUMBER = 32;
  let output = '';

  for (let index = 0; index < string.length; index++) {
    if (string[index] >= 'A' && string[index] <= 'Z') {
      output += String.fromCharCode(string.charCodeAt(index) + ASCII_CASE_CONVERSION_NUMBER);
      continue;
    }

    output += string[index];
  }

  return output;
}


// Substring (1)
function substr(string, start, length) {
  if (start < 0) start += string.length;
  let output = '';

  for (let index = start; index < start + length && index < string.length; index++) {
    output += string[index];
  }

  return output;
}


// Substring (2)
function substring(string, num1 = 0, num2 = string.length) {
  if (num1 < 0 || num1 !== num1 || typeof num1 !== 'number') num1 = 0;
  if (num2 < 0 || num2 !== num2 || typeof num2 !== 'number') num2 = 0;
  let start  = Math.min(num1, num2);
  let end    = Math.max(num1, num2);
  let output = '';

  for (let index = start; index < end && index < string.length; index++) {
    output += string[index];
  }

  return console.log(output);
}


// Rot13 Cipher


function rot13(str) {
  let alphabet = 'abcdefghijklmnopqrstuvwxyz';
  const ROTATION_DEGREES = 13;

  let output = str.split('').map(char => {
    if (/[A-Za-z]/.test(char)) {
      let rotatedChar = alphabet[(alphabet.indexOf(char.toLowerCase()) + ROTATION_DEGREES)
                        % alphabet.length];
      if (/[A-Z]/.test(char)) rotatedChar = rotatedChar.toUpperCase();

      return rotatedChar;
    }

    return char;
  })

  return output.join('');
}