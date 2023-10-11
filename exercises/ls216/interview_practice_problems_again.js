//Problem 1
// A distinct string is a string that is present only once in an array.

// Given an array of strings, arr, and an integer, k, return the kth distinct string
// present in arr. If there are fewer than k distinct strings, return an empty string "".

// Note that the result string is the one encountered earliest in the array.

/*
questions:
Can I assume I will receive exactly two arguments?
Can I assume that the first argument will be an array and that the second will
  be an integer?
Can I assume that any array argument passed to the array will only contain strings?
  If no, how should non-string elements be treated?
Should the function be case sensitive or insensitive?
Can the array passed to the function ever be empty? Can it be sparse? If so,
  what should its output be and how do empty elements affect the output, respectively?
Can the integer be zero or negative? If so, how should that impact the output?
Can the array be mutated during the function's execution?
Can the array have any non-element properties? If so, how should they be handled?
What if the kth distinct string is empty? Should the function return an empty string,
  despite that output being the same as indicating that there are not k distinct strings?

algorithm (simple conditions):
Filter the array to only unique values
Return the array's kth - 1 element or ''

algorithm (complex conditions):
Initialize a variable, arr, to the first array argument or []
Initialize a variable, k, to the first integer argument or 1
If k is 0 or less, return ''
CLean the array
  - Remove non-string elements, empty spaces, empty strings, and duplicate strings
Return the kth - 1 element or ''
*/

function simpleDistinctString(arr, k) {
  return arr.filter((str, index) => {
    return !arr.slice(0, index).includes(str) && !arr.slice(index + 1).includes(str);
  })[k - 1] || '';
}

// console.log(simpleDistinctString(["d","b","c","b","c","a"], 2)); // "a"
// console.log(simpleDistinctString(["d","b","c","b","c","a"], 3)); // ''

// 00:09:41

function distinctString(...args) {
  let arr = args.find(elem => Array.isArray(elem)) || [];
  let k   = args.find(elem => Number.isInteger(elem));

  if      (k === undefined) k = 1;
  else if (k <= 0)          return '';

  return arr.filter((elem, i) => {
    return typeof elem === 'string' && elem.length > 0 &&
           !(arr.slice(0, i).includes(elem.toUpperCase()) ||
             arr.slice(0, i).includes(elem.toLowerCase()) ||
             arr.slice(i + 1).includes(elem.toUpperCase()) ||
             arr.slice(i + 1).includes(elem.toLowerCase()));
  })[k - 1] || '';

}

// console.log(distinctString(["d","b","c","b","c","a"], 2)); // "a"
// console.log(distinctString(2, ["d","b","c","b","c","a"])); // "a"
// console.log(distinctString(["d","b","c","b","c","a"])); // "d"
// console.log(distinctString(["d", true, "b", undefined, "c","b","c", 1, "a"], 2)); // "a"
// console.log(distinctString(["d","B","C","b","c","A"], 2)); // "A"
// console.log(distinctString(["d","b","c","b","c","a"], 0)); // ""
// console.log(distinctString(["d","b","c","b","c","a"], -1)); // ""
// console.log(distinctString(["d","b","c","b","c","","a"], 2)); // "a"
// console.log(distinctString()); // ""
// console.log(distinctString(1)); // ""

let test = ['a', 'b', 'b', 'c'];
// console.log(distinctString(test, 2)); // "c"
delete test[1];
// console.log(distinctString(test, 2)); // "b"

//00:25:41


//Problem 2
// Given an array of integers, nums, return the third largest number in the array.
// If the third largest number does not exist, return the greatest number.

// You are not allowed to sort the array.

/*
questions:
Can I assume that I will receive only one argument and that that argument will be
  an array?
Can I assume that the array will contain only integers? If no, how should non-integer
  values be treated?
Can the array be sparse? If so, how should empty spaces be treated?
What should the output be if passed an empty array?
Can the array have non-element properties? If so how should they be treated?
What specifically is meant by not being allowed to sort the array? I take it I
  cannot use the sort() function, but can I sort it through a loop? Can I construct
  another array of only three elements based on iterating over the array?
How should duplicate numbers be treated? For instance, should [1, 1, 2] return 1,
  2, or some other value?
Can the array contain Infinity or -Infinity and if so, how should they be treated?
Should -0 be considered a duplicate of 0? If no, how should it be compared to 0?

algorithm:
Initialize nums to the first array argument
  - If there is none or that array is empty, return undefined
Clean the array to only integer values, integer properties, inifinities, and remove duplicates
  - Be sure to maintain one 0 and one -0. if relevant
Iterate over the cleaned array, storing each value in a maxThree array variable
  - If it is large enough, displacing the other values as necessary
Return the value at index 2 || index 0
*/

function simpleThirdMax(nums) {
  let maxThree = [Math.min(...nums), Math.min(...nums), Math.min(...nums)];

  nums.forEach(num => {
    if      (num > maxThree[0]) maxThree = [num, maxThree[0], maxThree[1]];
    else if (num > maxThree[1]) maxThree = [maxThree[0], num, maxThree[1]];
    else if (num > maxThree[2]) maxThree = [maxThree[0], maxThree[1], num];
  })

  return nums[2];
}

// console.log(simpleThirdMax([3, 2, 1])); // 1

// 00:08:55

function thirdMax(...args) {
  let nums = args.find(elem => Array.isArray(elem)) || [];
  if (Object.values(nums).length === 0) return null;

  nums = Object.values(nums);
  nums = nums.filter((elem, i) => {
    if (!(Number.isInteger(elem) || Math.abs(elem) === Infinity)) return false;

    return i === nums.findIndex(num => Object.is(num, elem));
  });

  let maxNums = [Math.min(...nums), Math.min(...nums), Math.min(...nums)];
  nums.forEach(num => {
    if      (negZeroInclusiveGreaterThan(num, maxNums[0])) maxNums = [num, maxNums[0], maxNums[1]];
    else if (negZeroInclusiveGreaterThan(num, maxNums[1])) maxNums = [maxNums[0], num, maxNums[1]];
    else if (negZeroInclusiveGreaterThan(num, maxNums[2])) maxNums = [maxNums[0], maxNums[1], num];
  });

  maxNums = maxNums.filter((elem, index) => index === maxNums.findIndex(num => Object.is(num, elem)));
  return maxNums[2] === undefined ? maxNums[0] : maxNums[2];
}

function negZeroInclusiveGreaterThan(num1, num2) {
  if ((Object.is(num1, 0) && Object.is(num2, -0)) || num1 > num2) return true;

  return false;
}

// console.log(thirdMax([3, 2, 1])); // 1
// console.log(thirdMax([3, 2])); // 3
// console.log(thirdMax([3, 2, 2])); // 3
// console.log(thirdMax([Infinity, 3, 2, 2])); // 2
// console.log(thirdMax([3, 2, 2, 1])); // 1
// console.log(thirdMax([Infinity, 3, -Infinity])); // -Infinity
// console.log(thirdMax([1, -0, 0])); // -0
// console.log(thirdMax()); // null
// console.log(thirdMax([])); // null

test = [3, 2];
test.a = 1;
// console.log(thirdMax(test)); // 1
test = [];
test.a = 5;
test.b = 4;
test.c = 3;
// console.log(thirdMax(test)); // 3
test = [3, 2, 1, 0]
delete test[1];
// console.log(thirdMax(test)); // 0

//00:39:33

//Problem 3
// Write a function, primeNumberPrinter, that prints all prime numbers present as
// substrings in a given string.

/*
questions:
Can I assume I will get only one parameter?
Can I assume that it will be a string?
Does the order that the prime numbers appear in the output array matter?
I take it from the example here that prime substrings of prime numbers should
  not be included? That is to say, '13' will output [13], not [13, 3]?
The prompt indicates that the function should print the prime numbers. Can I take
  that this means they should print to the console? Should the function have any
  meaningful output?
What should the output be if the string has no prime numbers? Is that also true
  if passed an empty string?
Ordinarily prime numbers are considered positive integers. Does this rule apply
  here? Should negative numbers be considered at all?
How should duplicate substrings be treated? Should they be included in or excluded
  from the output? ie, should '242' output [2] or [2, 2]?

algorithm:
Check the type of the passed argument
  - If it's not a number, bigint, string, or non-null object, output undefined
  - If it's a non-null, non-array object, convert it to its values
  - If it's a number or bigint, convert it to a string
  - If it's a string (including if it was converted), split it into digits
    - Map each digit into an array containing each substring of that digit
      through the end of the string

Map the parameter coerced into an array
  - Set it to the return of array.find finding the first element that is prime
    (coerced into a number)
    - To test for primeness:
      - Use a for loop starting at 2 and ending at the number - 1
        - If the num % i ever === 0, return false
      - Return true

Return the mapped parameter, filtering out undefined values
*/

// a

// Just outright failed this one :/

// primeNumberPrinter("a4bc2k13d"); // [2, 13]
// primeNumberPrinter("213"); // [2, 13]
// primeNumberPrinter("132"); // [13, 2]
// primeNumberPrinter("242"); // [2]
// primeNumberPrinter("24213"); // [2, 13]

// primeNumberPrinter(24213); // [2, 13]
// primeNumberPrinter(24213n); // [2, 13]

// primeNumberPrinter(); // []
// primeNumberPrinter(''); // []
// primeNumberPrinter('a'); // []
// primeNumberPrinter('4'); // []
// primeNumberPrinter(4); // [2, 13]

// primeNumberPrinter(undefined); // undefined
// primeNumberPrinter(null); // undefined
// primeNumberPrinter(true); // undefined

// primeNumberPrinter({ a: '13', b: '2' }); // [13. 2]
// primeNumberPrinter({ a: '13', b: 2 }); // [13. 2]
// primeNumberPrinter({ a: 13, b: 2 }); // [13. 2]
// primeNumberPrinter({ a: '132' }); // []
// primeNumberPrinter({ a: '13', b: true }); // [13]
// primeNumberPrinter({}); // []

// primeNumberPrinter(['13', '2']); // [13. 2]
// primeNumberPrinter(['13', 2]); // [13. 2]
// primeNumberPrinter([13, 2]); // [13. 2]
// primeNumberPrinter(['132']); // []
// primeNumberPrinter(['13', true]); // [13]
// primeNumberPrinter([]); // []

// test = ['13']
// test.a = '3';
// primeNumberPrinter(test); // [13]

// test = ['13', '2', '3']
// delete test[1];
// primeNumberPrinter(test); // [13, 3]

//Problem 4
//​Write a function that takes a two-dimensional array as the argument and turns
// it into a flat array with all duplicated elements removed. Treat numbers and
// number strings (e.g., 1 and '1') as duplicates, and keep the one that comes
// first in the result.

/*
questions:
One argument, will be an array
Array will be dense
Empty array returns empty array
Subarrays will only contain numbers and strings
  - Non-numeric strings follow regular coercion rules
  - '1a' -> 1, '1b' -> 1; [[1, '1a'], ['1b']] => [1, 1, 1]? [1]?
    - Strings which coerce to the same value are NOT considered duplicates
Outer array will always only contain subarrays
Outer array may contain any number of subarrays
Arrays cannot be mutated
Subarrays will not contain NaN values or stringified NaN
Strings will never be empty
Numbers / strings may be negative but wwill always be integers
-2 === '-2' && -2 !== '2'
*/

function flattenAndUnique(matrix) {
  
}

console.log(flattenAndUnique([])); // []
console.log(flattenAndUnique([[1, 2, 3], ['3', 4, 5, 'a']])); // [1, 2, 3, 4, 5, 'a']
console.log(flattenAndUnique([[]])); // []
console.log(flattenAndUnique([])); // []
console.log(flattenAndUnique([])); // []
console.log(flattenAndUnique([])); // []
console.log(flattenAndUnique([])); // []