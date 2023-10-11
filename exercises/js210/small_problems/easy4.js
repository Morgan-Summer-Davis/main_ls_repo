// Cute Angles
function dms(input) {
  while (input < 0) {
    input += 360;
  }
  input %= 360;

  const degrees = padZeros(Math.floor(input));
  const minutes = padZeros(Math.floor((input - degrees) * 60));
  const seconds = padZeros(Math.floor((((input - degrees) * 60) - minutes) * 60));

  return `${degrees}˚${minutes}'${seconds}"`;
}

function padZeros(str) { return String(str).length < 2 ? `0${str}` : String(str) };

console.log(dms(30));           // 30°00'00"
console.log(dms(76.73));        // 76°43'48"
console.log(dms(254.6));        // 254°35'59"
console.log(dms(93.034773));    // 93°02'05"
console.log(dms(0));            // 0°00'00"
console.log(dms(360));          // 360°00'00" or 0°00'00"
console.log(dms(-1));   // 359°00'00"
console.log(dms(400));  // 40°00'00"
console.log(dms(-40));  // 320°00'00"
console.log(dms(-420)); // 300°00'00"


// Combining Arrays
function union(...args) {
  return [...new Set(args.flat())];
}

console.log(union([1, 3, 5], [3, 6, 9]));    // [1, 3, 5, 6, 9]


// Halvsies
function halvsies(array) {
  return [
    array.slice(0, Math.round(array.length / 2)),
    array.slice(Math.round(array.length / 2)),
  ];
}

halvsies([1, 2, 3, 4]);       // [[1, 2], [3, 4]]
halvsies([1, 5, 2, 4, 3]);    // [[1, 5, 2], [4, 3]]
halvsies([5]);                // [[5], []]
halvsies([]);                 // [[], []]


// Find the Duplicate
function findDup(array) {
  return array.find((elem, index = index || 0) => {
    index += 1;
    return array.slice(index).includes(elem);
  });
}

findDup([1, 5, 3, 1]);                                // 1
findDup([18,  9, 36, 96, 31, 19, 54, 75, 42, 15,
         38, 25, 97, 92, 46, 69, 91, 59, 53, 27,
         14, 61, 90, 81,  8, 63, 95, 99, 30, 65,
         78, 76, 48, 16, 93, 77, 52, 49, 37, 29,
         89, 10, 84,  1, 47, 68, 12, 33, 86, 60,
         41, 44, 83, 35, 94, 73, 98,  3, 64, 82,
         55, 79, 80, 21, 39, 72, 13, 50,  6, 70,
         85, 87, 51, 17, 66, 20, 28, 26,  2, 22,
         40, 23, 71, 62, 73, 32, 43, 24,  4, 56,
          7, 34, 57, 74, 45, 11, 88, 67,  5, 58]);    // 73


// Combine Two Lists
function interleave(...args) {
  let result = [];

  for (let column = 0; column < args[0].length; column += 1) {
    args.forEach(array => {
      result.push(array[column]);
    });
  }

  console.log(result);
}

interleave([1, 2, 3], ['a', 'b', 'c']);    // [1, "a", 2, "b", 3, "c"]


// Multiplicative Average
function showMultiplicativeAverage(array) {
  return (array.reduce((num, total) => num * total, 1) / array.length).toFixed(3);
}

showMultiplicativeAverage([3, 5]);                   // "7.500"
showMultiplicativeAverage([2, 5, 7, 11, 13, 17]);    // "28361.667"


// Multiply Lists
function multiplyList(...args) {
  let rotatedArgs = args[0].map((_, column) => args.map(row => row[column]));
  return rotatedArgs.map(array => array.reduce((product, num) => product * num, 1));
}

multiplyList([3, 5, 7], [9, 10, 11], [2, 2, 2]);    // [27, 50, 77]


// Digits List
function digitList(num) {
  return String(num).split('').map(string => Number(string));
}

digitList(12345);       // [1, 2, 3, 4, 5]
digitList(7);           // [7]
digitList(375290);      // [3, 7, 5, 2, 9, 0]
digitList(444);         // [4, 4, 4]


// How Many
function countOccurrences(array) {
  let result = {};

  for (let index = 0; index < array.length; index += 1) {
    result[array[index]] = result[array[index]] + 1 || 1;
  }

  for (const key in result) {
    console.log(`${key} => ${result[key]}`);
  }
}

const vehicles = ['car', 'car', 'truck', 'car', 'SUV', 'truck',
                'motorcycle', 'motorcycle', 'car', 'truck'];

countOccurrences(vehicles);


// Array Average
function average(array) {
  return Math.floor(array.reduce((total, num) => total + num, 0) / array.length);
}

average([1, 5, 87, 45, 8, 8]);       // 25
average([9, 47, 23, 95, 16, 52]);    // 40