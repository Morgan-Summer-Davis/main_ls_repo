// iteration
function myForEach(array, func) {
for (let i = 0; i < array.length; i += 1) {
  func(array[i], i, array);
}
}

let min = Infinity;
let getMin = value => (min = value <= min ? value : min);
myForEach([4, 5, 12, 23, 3], getMin);
console.log(min);                        // 3


// filtering / selection
function myFilter(array, func) {
  let result = [];

  array.forEach((element, index) => {
    if (func(element, index, array)) array.push(element);
  })

  return result;
}

let isPythagoreanTriple = function (triple) {
  return Math.pow(triple.a, 2) + Math.pow(triple.b, 2) === Math.pow(triple.c, 2);
};

console.log(myFilter([{ a: 3, b: 4,  c: 5 },
          { a: 5, b: 12, c: 13 },
          { a: 1, b: 2,  c: 3 },], isPythagoreanTriple));

// returns [ { a: 3, b: 4, c: 5 }, { a: 5, b: 12, c: 13 } ]


// transformation
function myMap(array, func) {
  let result = [];
  array.forEach((element, index) => result.push(func(element, index, array)));
  return result;
}

let plusOne = n => n + 1;
myMap([1, 2, 3, 4], plusOne);       // [ 2, 3, 4, 5 ]


// reducing
function myReduce(array, func, accumulator) {
  array = array.slice();
  if (arguments.length <= 2) accumulator = array.shift();

  array.forEach((element, index) => {
    accumulator = func(accumulator, element, index, array);
  });

  return accumulator;
}

let smallest = (result, value) => (result <= value ? result : value);
let sum = (result, value) => result + value;

myReduce([5, 12, 15, 1, 6], smallest);           // 1
myReduce([5, 12, 15, 1, 6], sum, 10);            // 49


// interrogation
function myOwnEvery(array, func) {
  array.forEach(element => { if (!func(element)) return false });

  return true;
}

let isAString = value => typeof value === 'string';
myOwnEvery(['a', 'a234', '1abc'], isAString);       // true

