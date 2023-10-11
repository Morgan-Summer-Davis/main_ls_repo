// Lettercase Percentage Ratio
function letterPercentages(string) {
  console.log( {
    lowercase: (string.match(/[a-z]/g) || []).length / string.length * 100,
    uppercase: (string.match(/[A-Z]/g) || []).length / string.length * 100,
    neither:   (string.match(/[^A-Za-z]/g) || []).length / string.length * 100,
  })
}

letterPercentages('abCdef 123');
// { lowercase: "50.00", uppercase: "10.00", neither: "40.00" }

letterPercentages('AbCd +Ef');
// { lowercase: "37.50", uppercase: "37.50", neither: "25.00" }

letterPercentages('123');
// { lowercase: "0.00", uppercase: "0.00", neither: "100.00" }


// Triangle Sides
function triangle(side1, side2, side3) {
  let sides = [side1, side2, side3].sort((a, b) => a - b);
  if (sides.some(side => side === 0)
      || sides.slice(0, 2).reduce((a, b) => a + b) <= sides[2]) {
    return 'invalid';
  }

  if (sides.every(side => side === sides[0]))  {
    return 'equilateral';
  } else if (sides.some((side, index, triangle) => triangle.indexOf(side) !== index)) {
    return 'isoceles';
  } else {
    return 'scelene';
  }
}

console.log(triangle(3, 3, 3));        // "equilateral"
console.log(triangle(3, 3, 1.5));      // "isosceles"
console.log(triangle(3, 4, 5));        // "scalene"
console.log(triangle(0, 3, 3));        // "invalid"
console.log(triangle(3, 1, 1));        // "invalid"


// Tri-Angles
function triAngle(angle1, angle2, angle3) {
  let angles = [angle1, angle2, angle3];
  if (angles.reduce((a, b) => a + b) !== 180 || angles.some(angle => angle <= 0)) {
    return 'invalid';
  }

  if      (angles.some(angle => angle === 90)) return 'right';
  else if (angles.every(angle => angle < 90))  return 'acute';
  else                                         return 'obtuse';
}

console.log(triAngle(60, 70, 50));       // "acute"
console.log(triAngle(30, 90, 60));       // "right"
console.log(triAngle(120, 50, 10));      // "obtuse"
console.log(triAngle(0, 90, 90));        // "invalid"
console.log(triAngle(50, 50, 50));       // "invalid"


// Unlucky Days
function fridayThe13ths(year) {
  let date = new Date(year, 1, 13);
  let numOfFridayThe13ths = 0;

  for (let i = 0; i < 12; i += 1) {
    date.setMonth(i);
    if (date.getDay() === 5) numOfFridayThe13ths += 1;
  }

  return numOfFridayThe13ths;
}

fridayThe13ths(1986);      // 1
fridayThe13ths(2015);      // 3
fridayThe13ths(2017);      // 2


// Next Featured Number Higher than a Given Value
function featured(num) {
  if (num >= 9876543201) return "There is no possible number that fulfills those requirements.";

  do {
    num += 1;
  } while (num % 7 !== 0 && num % 2 !== 0)

  while (String(num).split('').some((digit, index, digits) => digits.indexOf(digit) !== index)) {
    num += 7;
  }

  return num;
}

// featured(12);           // 21
// featured(20);           // 21
// featured(21);           // 35
// featured(997);          // 1029
// featured(1029);         // 1043
// featured(999999);       // 1023547
// featured(999999987);    // 1023456987
// featured(9876543186);   // 9876543201
// featured(9876543200);   // 9876543201
// featured(9876543201);   // "There is no possible number that fulfills those requirements."


// Sum Square - Square Sum
function sumSquareDifference(num) {
  let sum     = 0;
  let squares = 0;

  for (let i = 1; i <= num; i += 1) {
    sum += i;
    squares += i**2;
  }

  console.log( sum**2 - squares);
}

sumSquareDifference(3);      // 22 --> (1 + 2 + 3)**2 - (1**2 + 2**2 + 3**2)
sumSquareDifference(10);     // 2640
sumSquareDifference(1);      // 0
sumSquareDifference(100);    // 25164150


// Bubble Sort
function bubbleSort(array) {
  let stop = false;
  while (!stop) {
    stop = true;
    array.forEach((elem, index) => {
      if (elem > array[index + 1]) {
        stop = false;
        [ array[index], array[index + 1] ] = [array[index + 1], array[index]];
      }
    });
  }

  console.log(array);
  return array;
}

const array1 = [5, 3];
bubbleSort(array1);
console.log(array1);    // [3, 5]

const array2 = [6, 2, 7, 1, 4];
bubbleSort(array2);
console.log(array2);    // [1, 2, 4, 6, 7]

const array3 = ['Sue', 'Pete', 'Alice', 'Tyler', 'Rachel', 'Kim', 'Bonnie'];
bubbleSort(array3);
console.log(array3);    // ["Alice", "Bonnie", "Kim", "Pete", "Rachel", "Sue", "Tyler"]