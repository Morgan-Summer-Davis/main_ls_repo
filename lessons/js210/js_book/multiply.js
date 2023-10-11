function multiply(num1, num2) {
  return num1 * num2;
}

let rlSync    = require('readline-sync');
let firstNum  = Number(rlSync.question('Enter the first number: '));
let secondNum = Number(rlSync.question('Enter the second number: '));

console.log(`${firstNum} * ${secondNum} = ${multiply(firstNum, secondNum)}`)