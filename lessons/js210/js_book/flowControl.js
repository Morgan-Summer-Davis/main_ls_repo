function evenOrOdd(num) {
  if (num % 1 !== 0) {
    console.log('Number is not an integer');
    return;
  }

  console.log((num % 2) === 0 ? 'even' : 'odd');
}

evenOrOdd(3);
evenOrOdd(30);
evenOrOdd(3.3);

function upCaseIfLong(string) {
  console.log(string.length >= 10 ? string.toUpperCase() : string);
}

upCaseIfLong('hello');
upCaseIfLong('hello world!!!!!')

function numberRange(number) {
  if (number < 0) {
    console.log(`${number} is less than 0`);
  } else if (number <= 50) {
    console.log(`${number} is between 0 and 50`);
  } else if (number <= 100) {
    console.log(`${number} is between 51 and 100`);
  } else {
    console.log(`${number} is greater than 100`);
  }
}

numberRange(25);
numberRange(75);
numberRange(125);
numberRange(-25);

