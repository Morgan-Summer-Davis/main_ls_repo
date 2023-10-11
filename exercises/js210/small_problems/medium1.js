// Rotation Part 1
function rotateArray(array) {
  if (!Array.isArray(array)) return undefined;

  array = array.slice()
  if (array.length > 0) array.push(array.shift());

  return array;
}

rotateArray([7, 3, 5, 2, 9, 1]);       // [3, 5, 2, 9, 1, 7]
rotateArray(['a', 'b', 'c']);          // ["b", "c", "a"]
rotateArray(['a']);                    // ["a"]
rotateArray([1, 'a', 3, 'c']);         // ["a", 3, "c", 1]
rotateArray([{ a: 2 }, [1, 2], 3]);    // [[1, 2], 3, { a: 2 }]
rotateArray([]);                       // []

// return `undefined` if the argument is not an array
rotateArray();                         // undefined
rotateArray(1);                        // undefined


// the input array is not mutated
const array = [1, 2, 3, 4];
rotateArray(array);                    // [2, 3, 4, 1]
array;                                 // [1, 2, 3, 4]


// Rotation Part 2
function rotateRightmostDigits(number, degrees) {
  let digits = String(number).split('');

  digits = digits.slice(0, digits.length - degrees)
                 .concat(rotateArray(digits.slice(digits.length - degrees),
                                                  digits.length));

  return parseInt(digits.join(''), 10);
}

rotateRightmostDigits(735291, 1);      // 735291
rotateRightmostDigits(735291, 2);      // 735219
rotateRightmostDigits(735291, 3);      // 735912
rotateRightmostDigits(735291, 4);      // 732915
rotateRightmostDigits(735291, 5);      // 752913
rotateRightmostDigits(735291, 6);      // 352917


// Rotation Part 3
function maxRotation(number) {
  let digits = String(number).split('');

  for (let i = 0; i < String(number).length; i += 1) {
    digits = digits.slice(0, i).concat(rotateArray(digits.slice(i, digits.length)));
  }

  return parseInt(digits.join(''), 10);
}

maxRotation(735291);          // 321579
maxRotation(3);               // 3
maxRotation(35);              // 53
maxRotation(105);             // 15 -- the leading zero gets dropped
maxRotation(8703529146);      // 7321609845


// Stack Machine Interpretation
function minilang(program) {
  let stack    = [];
  let register = 0;
  program = program.split(' ').map(command => (parseInt(command, 10) || command));

  program.forEach(command => {
    switch (command) {
      case 'PUSH':
        stack.push(register);
        break;
      case 'ADD':
        register += stack.pop();
        break;
      case 'SUB':
        register -= stack.pop();
        break;
      case 'MULT':
        register *= stack.pop();
        break;
      case 'DIV':
        register = Math.floor(register / stack.pop());
        break;
      case 'REMAINDER':
        register = Math.floor(register % stack.pop());
        break;
      case 'POP':
        register = stack.pop();
        break;
      case 'PRINT':
        console.log(register);
        break;
      default:
        register = command;
    }
  })
}

minilang('PRINT');
// 0

minilang('5 PUSH 3 MULT PRINT');
// 15

minilang('5 PRINT PUSH 3 PRINT ADD PRINT');
// 5
// 3
// 8

minilang('5 PUSH POP PRINT');
// 5

minilang('3 PUSH 4 PUSH 5 PUSH PRINT ADD PRINT POP PRINT ADD PRINT');
// 5
// 10
// 4
// 7

minilang('3 PUSH PUSH 7 DIV MULT PRINT');
// 6

minilang('4 PUSH PUSH 7 REMAINDER MULT PRINT');
// 12

minilang('-3 PUSH 5 SUB PRINT');
// 8

minilang('6 PUSH');
// (nothing is printed because the `program` argument has no `PRINT` commands)


// Word to Digit
const NUMBER_WORDS = { 'zero': 0, 'one': 1, 'two': 2, 'three': 3, 'four': 4,
                       'five': 5, 'six': 6, 'seven': 7, 'eight': 8, 'nine': 9 }

function wordToDigit(string) {
  Object.keys(NUMBER_WORDS).forEach((key) => {
    string.replace(new RegExp('\\b' + key + '\\b', 'g'), NUMBER_WORDS[key]);
  })

  return string;
}

wordToDigit('Please call me at five five five one two three four. Thanks.');


// Fibonacci Number Location By Length
function findFibonacciIndexByLength(targetLength) {
  let lastNums = [0n, 1n];
  let currentNum = 0n;
  let index = 1;

  while (String(currentNum).length < targetLength) {
    index += 1;
    currentNum = lastNums.reduce((a, b) => a + b);
    lastNums = [lastNums[1], currentNum];
  }

  console.log(index);
}

findFibonacciIndexByLength(2n) === 7n;    // 1 1 2 3 5 8 13
findFibonacciIndexByLength(3n) === 12n;   // 1 1 2 3 5 8 13 21 34 55 89 144
findFibonacciIndexByLength(10n) === 45n;
findFibonacciIndexByLength(16n) === 74n;
findFibonacciIndexByLength(100n) === 476n;
findFibonacciIndexByLength(1000n) === 4782n;
// findFibonacciIndexByLength(10000n) === 47847n;


// Fibonacci Numbers (Recursion)
function fibonacci(n) {
  if (n <= 1) return n;
  else        return fibonacci(n - 2) + fibonacci(n - 1);
}

fibonacci(1);       // 1
fibonacci(2);       // 1
fibonacci(3);       // 2
fibonacci(4);       // 3
fibonacci(5);       // 5
fibonacci(12);      // 144
fibonacci(20);      // 6765


// Fibonacci Numbers (Procedural)
function fibonacci(n) {
  let lastNums = [0n, 1n];
  let currentNum = 0n;

  for (let i = 1; i < n; i += 1) {
    currentNum = lastNums.reduce((a, b) => a + b);
    lastNums = [lastNums[1], currentNum];
  }

  return currentNum;
}

fibonacci(20);       // 6765
fibonacci(50);       // 12586269025
fibonacci(75);       // 2111485077978050


// Fibonacci Numbers (Memoization)
let fibNums = { 0: 0, 1: 1 };

let fibonacci2 = function fibonacci(n) {
  if (fibNums[n] !== undefined) {
    return fibNums[n];
  } else {
    return fibNums[n] = fibonacci2(n - 2) + fibonacci2(n - 1);
  }
}

console.log(fibonacci2(1));       // 1
console.log(fibonacci2(2));       // 1
console.log(fibonacci2(3));       // 2
console.log(fibonacci2(4));       // 3
console.log(fibonacci2(5));       // 5
console.log(fibonacci2(12));      // 144
console.log(fibonacci2(20));      // 6765