// Problem 1
// A distinct string is a string that is present only once in an array.

// Given an array of strings, arr, and an integer, k, return the kth distinct
// string present in arr. If there are fewer than k distinct strings, return an
// empty string "".

// Note that the result string is the one encountered earliest in the array.

/*
questions:
Can I assume I will receive exactly two arguments and that they will be a string
  and an array?
Can I assume k will be a positive integer?
Can the array be empty? If so, what should the output be? An empty string?
Can the array be sparse? If so, how should empty elements be treated?
Can the array contain any non-string elements?
Can the array contain non-element properties?
Should the function be case-sensitive or case-insensitive?
What should be output if the kth distinct string is empty? An empty string, same
  as if there is no kth distinct string?
Can the array be mutated during the function's execution?

algorithm:
First, remove duplicate elements
  - Filter any element for which the subsections of the array before and after it
    don't contain that string
Return the element at the uniquified array index k - 1 or ""
*/

function distinctString(arr, k) {
  arr = arr.filter((str, index) => {
    return !(arr.slice(0, index).includes(str) || arr.slice(index + 1).includes(str));
  });
  return arr[k - 1] || '';
}

// console.log(distinctString(["d","b","c","b","c","a"], 2)); // "a"
// console.log(distinctString([], 1)); // ""
// console.log(distinctString([""], 1)); // ""
// console.log(distinctString(["a"], 2)); // ""

//00:16:13

// Problem 2
// Given an array of integers, nums, return the third largest number in the array.
// If the third largest number does not exist, return the greatest number.

// You are not allowed to sort the array.

/*
questions:
Can I assume I will always receive exactly one argument and that it will be an array?
Can I assume that array will only contain numeric elements?
Can the array be empty? If so, what is the expected output?
Can the array be sparse? If so, how should empty elements be handled?
Can the array contain non-element properties? If so, how should they be handled?
How should duplicate numbers in the array be treated? Should [3, 3, 2] return
  2 (the third largest element) or 3 (the greatest element)?
Can the array contain Infinity or -Infinity?
Can the array contain NaN?
Should 0 and -0 be considered duplicates of one another?

algorithm:
First, uniqueify the array
  - Filter elements by whether the subarray following it contains that element
If the length of the array is 0, return 0
  - else, if the length of the array is less than 3, return the max of the array
Initialize a maxThree variable to [-Infinity, -Infinity, -Infinity]
Iterate through nums
  - If that num is greater than maxThree[0], set maxThree[2] to maxThree[1],
    maxThree[1] to maxThree[0], and maxThree[0] to that num
  - Else, if that num is greater than maxThree[1], set maxThree[2] to maxThree[1]
    and maxThree[1] to that num
  - Else, if that number is greater thaan maxThree[2], set maxThree[2] to that num
Return maxThree[2]
*/

function thirdMax(nums) {
  let uniqueNums = nums.filter((num, index) => !nums.slice(index + 1).includes(num) && !Number.isNaN(num));

  if      (uniqueNums.length === 0) return 0;
  else if (uniqueNums.length < 3)   return Math.max(...uniqueNums);

  let maxThree = [-Infinity, -Infinity, -Infinity];
  uniqueNums.forEach(num => {
    if (num > maxThree[0]) {
      [maxThree[2], maxThree[1], maxThree[0]] = [maxThree[1], maxThree[0], num];
    } else if (num > maxThree[1]) {
      [maxThree[2], maxThree[1]] = [maxThree[1], num];
    } else if (num > maxThree[2]) {
      maxThree[2] = num;
    }
  });

  if (isNegativeZero(maxThree[2]) && nums.some(num => isPositiveZero(num)) &&
      nums.some(num => isNegativeZero(num))) {
    maxThree[2] = 0;
  }

  return maxThree[2];
}

function isPositiveZero(num) {
  return (num === 0 && 1 / num === Infinity);
}

function isNegativeZero(num) {
  return (num === 0 && 1 / num === -Infinity);
}

// console.log(thirdMax([3, 2, 1])); // 1
// console.log(thirdMax([4, 3, 2, 1])); // 2
// console.log(thirdMax([3, 2])); // 3
// console.log(thirdMax([3, 3, 2])); // 3
// console.log(thirdMax([])); // 0
// console.log(thirdMax([3, 0, -0, 1])); // 0
// console.log(thirdMax([3, 2, -0])); // -0
// console.log(thirdMax([-0, 0])); // 0
// console.log(thirdMax([3, 2, NaN])); // 3
// console.log(thirdMax([3, 2, 1, NaN])); // 1
// console.log(thirdMax([Infinity, 2, 1])); // 1
// console.log(thirdMax([Infinity, 2])); // Infinity
// console.log(thirdMax([-Infinity, 2])); // 2
// console.log(thirdMax([-Infinity, 2, 1])); // -Infinity

//00:38:31

// Problem 3
// Write a function, primeNumberPrinter, that prints all prime numbers present as
// substrings in a given string.

/*
Can I assume I will receive exactly one argument and that it will be a string?
What is the expected output if there are no prime numbers in the string? Is it
  the same if passed an empty string?
I take it from the given example that prime numbers inside of prime numbers should
  not be included? Ie, given '13', [13] should be returned, not [13, 3]
Typically, prime numbers are defined as positive integers greater than 1. Given
  that, should I ignore numbers less than 2? If yes, should '-2' return [2] or []?
Does the order of the elements in the returned array matter?
The prompt indicates that the function should print the numbers. Given that, should
  the function return any specific value? Should they be printed in the given format
  ([2, 13]) or some other way?
How should duplicate primes be treated? Ie, should '2a2' print [2, 2] or [2]?
If there is only one prime in the string, should it be printed as a single-element
  array?

algorithm
Create an isPrime helper function
  - Iterate from 2 up to the given number
    - If num / i is ever an integer, return false
  - Return true

Split the string into numeric substrings
Unique the array and remove negative numbers
For each number string, iterate through its digits, starting with the last one
  - If the first digit through that digit is prime, split the string between those
    two substrings
  - Continue iterating until no strings are split
Convert the array into numbers
Filter the array into only prime elements
Log the array
*/

function primeNumberPrinter(string) {
  let nums = string.split(/[^-\d]/g)
                   .map(numStr => {
                     return numStr.includes('-') ? numStr.substring(0, numStr.indexOf('-')) : numStr;
                   }).filter(numStr => numStr !== '');

  let i = 0;
  while (i < nums.length) {
    let numStr = nums[i];
    let primes = [];

    for (let j = 0; j <= numStr.length; j += 1) {
      for (let k = numStr.length; k > j; k -= 1) {
        if (isPrime(numStr.substring(j, k))) {
          primes.push(numStr.substring(j, k));
          j += k - j - 1;
        }
      }
    }

    nums[i] = primes;
    i += 1;
  }

  nums = nums.flat().filter((num, index) => !nums.flat().slice(0, index).includes(num));

  console.log(nums.map(str => parseInt(str, 10)));
}

function isPrime(num) {
  if (typeof num === 'string') num = parseInt(num, 10);
  if (num < 2) return false;

  for (let i = 2; i < num; i += 1) {
    if ((num / i) === parseInt(num / i, 10)) return false;
  }

  return true;
}

function splitAtIndex(string, index) {
  return [string.substring(0, index), string.substring(index)];
}

// primeNumberPrinter("a4bc2k13d"); // [2, 13]
// primeNumberPrinter(""); // []
// primeNumberPrinter("a"); // []
// primeNumberPrinter("3"); // [3]
// primeNumberPrinter("-2"); // []
// primeNumberPrinter("3a13"); // [3, 13]
// primeNumberPrinter("13a13"); // [13]
// primeNumberPrinter("1363"); // [13, 3]
// primeNumberPrinter("133"); // [13, 3]
// primeNumberPrinter("1353"); // [13, 53]
// primeNumberPrinter("13533"); // [13, 53, 3]
// primeNumberPrinter("-3"); // []
// primeNumberPrinter("13-42"); // [13]
// primeNumberPrinter("13-42-3"); // [13]
// primeNumberPrinter("13-42-a3"); // [13, 3]
// primeNumberPrinter("13-42-a-3"); // [13]
// primeNumberPrinter("13-a2"); // [13, 2]


//01:47:57
// I hate this problem so fucking much

// Problem 4
//​Write a function that takes a two-dimensional array as the argument and turns
// it into a flat array with all duplicated elements removed. Treat numbers and
// number strings (e.g., 1 and '1') as duplicates, and keep the one that comes
// first in the result.

/*
questions:
Can I assume I will only receive one argument and that that argument will be an array?
Can I assume that array will only contain arrays?
Can the inner arrays contain non-string, non-number elements? If so, should
  they be compared to other data types in any unique way? How should objects
  and arrays be compared?
Can the inner arrays contain NaN and if so, how should NaN be compared to NaN?
  What about 'NaN'?
How should string / number equivalency be treated--by coercion, by visual nature, or
  some other criteria? That is, is '1a' considered a duplicate of 1 or '1'?
Can the outer array be empty? If so, what should the output be?
Can it be sparse? If so, how should empty elements be treated?
Can it have non-element properties? If so, how should they be treated?
Can the inner arrays be empty, sparse, or have non-element properties?

algorithm:
Create a function to compare arrays and objects by their keys and values

Flatten the argument
Filter each element by whether the subarray preceding includes an element
  equal (using the helper method) to it

*/

function equal(object1, object2) {
  if (typeof object1 !== 'object' || typeof object2 !== 'object' ||
      object1 === null || object2 === null) {
    if (Number.isNaN(object1) && Number.isNaN(object2)) return true;

    return object1 === object2;
  }

  let keys1 = Object.keys(object1);
  let keys2 = Object.keys(object2);

  for (let i = 0; i < Math.max(keys1.length, keys2.length); i += 1) {
    if (keys1[i] !== keys2[i] || !equal(object1[keys1[i]], object2[keys2[i]])) {
      return false;
    }
  }

  return true;
}

function equalNumString(arg1, arg2) {
  if ([arg1, arg2].some(arg => Number.isNaN(arg)) && [arg1, arg2].some(arg => arg === 'NaN')) {
    return true;
  }

  if ((String(parseInt(arg1, 10)) !== arg1 && parseInt(String(arg1), 10) !== arg1) ||
      (String(parseInt(arg2, 10)) !== arg2 && parseInt(String(arg2), 10) !== arg2)) {
    return false;
  }

  return String(arg1) === String(arg2);
}

function flattenAndUnique(matrix) {
  let array = matrix.flat();
  array = array.filter((i, index) => !array.slice(0, index).some(j => equal(i, j)))
               .filter((i, index) => !array.slice(0, index).some(j => equalNumString(i, j)));

  console.log(array);
}

flattenAndUnique([]); // []
flattenAndUnique([[1, 2, 3], ['3', 4, 5, 'a']]); // [1, 2, 3, 4, 5, 'a']
flattenAndUnique([['3'], [3]]); // ['3']
flattenAndUnique([['3'], ['3']]); // ['3']
flattenAndUnique([[3], [3]]); // [3]
flattenAndUnique([[3, 3]]); // [3]
flattenAndUnique([[3, 4]]); // [3, 4]
flattenAndUnique([[3], ['3a']]); // [3, '3a']
flattenAndUnique([[3], [3], ['3']]); // [3]
flattenAndUnique([[3], [3], ['a']]); // [3, 'a']

flattenAndUnique([[undefined], [null]]); // [undefined, null]
flattenAndUnique([[undefined], [undefined]]); // [undefined]
flattenAndUnique([[NaN], [NaN]]); // [NaN]
flattenAndUnique([['NaN'], [NaN]]); // ['NaN']
flattenAndUnique([[NaN], ['NaN']]); // [NaN]
flattenAndUnique([[NaN], [undefined]]); // [NaN, undefined]

flattenAndUnique([[[3]], [[3]]]); // [[3]]
flattenAndUnique([[[[3]]], [[[3]]]]); // [[[3]]]
flattenAndUnique([[[3]], [[4]], ['a']]); // [[3], [4], 'a']
flattenAndUnique([[{a: 3}], {a: 3}]); // [{a: 3}]
flattenAndUnique([[{a: 3}], {b: 3}]); // [{a: 3}, {b: 3}]
flattenAndUnique([[{a: 3}], {a: 3, b: 3}]); // [{a: 3}, {a: 3, b: 3}]
flattenAndUnique([{}]); // [{}]

flattenAndUnique([]); // []
flattenAndUnique([[]]); // []
flattenAndUnique([[], []]); // []

//00:58:17