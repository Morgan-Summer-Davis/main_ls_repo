// problem 1
/*
A distinct string is a string that is present only once in an array.

Given an array of strings, arr, and an integer, k, return the kth distinct string
present in arr. If there are fewer than k distinct strings, return an empty string "".

Note that the result string is the one encountered earliest in the array.
*/

/*
questions:
Can I assume that I will get an array and integer as arguments or do I need to verify
  data types?
Can I assume I will get exactly two arguments?
Can I assume that the array will only contain strings?
Do substrings count as present in larger strings? For example, passed the args ['test', 't'] and 1,
  does the function return 't', 'test', or ''?
Am I right to assume that if the array is empty, the output will alwas be an empty string?
What should be returned if k is 0?
Can the passed array be mutated?
How should sparse arrays be handled, if at all? If there is only one empty space, is that considered
  a distinct value and if so, what should be returned?

input: an array and an integer
output: a string

algorithm:
Remove any non-unique entries
  - Filter the array
    - If a slice of the array from 0 to the string's index or a slice of the array from
      its index + 1 to the end contains a value equal to the string, remove it
    - Store this array in a variable
Find the kth - 1 index of the modified arra
  - If that returns undefined, return ''
  - Else, return the returned value
*/

function distinctString(array, k) {
  array = array.filter((string, index) => {
    return !(array.slice(0, index).includes(string) ||
             array.slice(index + 1).includes(string))
  })

  return array[k - 1] ? array[k - 1] : '';
}

// console.log(distinctString(["d","b","c","b","c","a"], 2)); // "a"
// console.log(distinctString(['d', 'd'], 1)); // ''
// console.log(distinctString(['d'], 1)); //'d'
// console.log(distinctString([], 1)); //''
// console.log(distinctString(['d', 'a'], 0)); //''
// console.log(distinctString(['d', 'a'], -1)); //''
// console.log(distinctString(['test', 't'], 1)); //'test'
// let test = ['a'];
// delete test[0];
// console.log(distinctString(test, 1)); //''
// test = ['a', 'b', 'c'];
// delete test[0];
// console.log(distinctString(test, 1)); //'b'

//00:23:34

// problem 2
/*
Given an array of integers, nums, return the third largest number in the array.
If the third largest number does not exist, return the greatest number.

You are not allowed to sort the array.
*/

/*
questions:
Can I assume I will get an array as an argument?
Can I assume that array will only contain integers?
Do I have to account for the possibility of an empty array? If yes, what should I
  return?
Can the array be sparse? If yes, how should empty elements be treated?
What should I do in cases of duplicate values? Should [1, 2, 2] return 1 (the
  third-greatest if the 2's are considered separately) or 2 (the greatest, if the 2's
  are considered the same value and thus there are not three values)
What is meant by "sorting" the array? Can I simply not use Array.prototype.sort? Can
  I construct a new array by iterating over the array in some other way?
I assume if the array has fewer than three values, I should simply return the greatest?
Will the array ever contain NaN?

input: an array of integers
output: an integer found in that array

algorithm:
Return undefined if array is not an array, if no arguments were passed, or if array
  is empty
Initialize three variables (first, second, and third) to undefined
Filter the array
  - Remove non-integer values
  - Remove duplicate values
If the length of the filtered array is less than 3, return the max of the array
Iterate over the filtered array
  - If the number is greater than first or first is undefined
    - Set first to that number
    - Set second to first
    - Set third to second
  - Else, if that number is greater than second or second is undefined
    - Set second to that number
    - Set third to second
  - Else, if that number is greater than third or third is undefined
    - Set third to that number
Return third
*/

function thirdMax(array) {
  if (!Array.isArray(array)) return undefined;

  let [ first, second, third ] = [undefined];
  array = array.filter((elem, index) => {
    return ((Number.isInteger(elem) || Math.abs(elem) === Infinity) &&
            array.indexOf(elem) === index);
  });

  if      (array.length < 1) return undefined;
  else if (array.length < 3) return Math.max(...array);

  array.forEach(num => {
    if (first === undefined || num > first) {
      [ first, second, third ] = [ num, first, second ];
    } else if (second === undefined || num > second) {
      [ second, third ]= [ num, second ];
    } else if (third === undefined || num > third) {
      third = num;
    }
  });

  return third;
}

// console.log(thirdMax([3, 2, 1])); // 1
// console.log(thirdMax([3, 2])); // 3
// console.log(thirdMax([3, 3, 1])); // 3
// console.log(thirdMax([2, 1, 3])); // 1
// console.log(thirdMax([NaN, 3, 2])); // 3
// console.log(thirdMax([NaN, 3, 2, 1])); // 1
// console.log(thirdMax([Infinity, 1])); //Infinity
// console.log(thirdMax([Infinity, 2, 1])); //1
// console.log(thirdMax([0, -1000, -Infinity])); //-Infinity

// let test = [0, 3, 2, 1];
// delete test[0];
// console.log(thirdMax(test)); // 1
// test = [0, 2, 1];
// delete test[0];
// console.log(thirdMax(test)); // 2
// test = [0];
// delete test[0];
// console.log(thirdMax(test)); //undefined

// console.log(thirdMax([])); //undefined
// console.log(thirdMax()); //undefined
// console.log(thirdMax(undefined)); //undefined
// console.log(thirdMax(1)); //undefined

//00:42:35

// problem 3
/*
Write a function, console.log(primeNumberPrinter, that prints all prime numbers present as
substrings in a given string.
*/

/*
questions:
Can I assume I will get a single string as an argument or do I have to account
  for other data types and / or more or fewer parameters?
What should the output be if there are no prime numbers present?
What should the output be if passed an empty string?
By "prime numbers present as substrings", I assume I am only concerned with numeric
  characters, ie '1', and not word numbers like 'one'?
Does the order of output numbers in the array matter?
Should duplicates be included or filtered out?
Do I have to be concerned with performance in obscenely large numberstrings?

input: a string
output: an array of integers

algorithm:
Split the string into only numeric substrings
Map each substring into an array containing the full substring, followed by each
  of that substring's substrings
Convert each subarray element into integers
Iterate through the outer array
  Filter through each subarray
    - Iterate from 2 to the given number - 1
      - If ever the remainder of the number divided by that number is 0, return false
      - Else, return true

**Filter out inner primes**

Return the filtered array
*/

function primeNumberPrinter(string) {
  let numArray = string.split(/[^\d]+/g).filter(str => String(Number(str)) === str);
  numArray = numArray.map(str => getPrimeSubstrings(str).map(substr => parseInt(substr, 10)));

  return numArray.flat();
}

function getPrimeSubstrings(string) {
  let result = [];

  for (let startIndex = 0; startIndex < string.length; startIndex += 1) {
    for (let endIndex = string.length; endIndex > startIndex; endIndex -= 1) {
      if (isPrime(string.slice(startIndex, endIndex))) {
        result.push(string.slice(startIndex, endIndex));
        startIndex += (endIndex - startIndex);
        break;
      }
    }
  }

  return result;
}

function isPrime(num) {
  if (num < 2) return false;

  let divisor = 2;
  while (divisor < num - 1) {
    if (num % divisor === 0) return false;
    divisor += 1;
  }

  return true;
}

// console.log(primeNumberPrinter("a4bc2k13d")); // [2, 13]
// console.log(primeNumberPrinter("3k13")); // [3, 13]
// console.log(primeNumberPrinter("")); // []
// console.log(primeNumberPrinter("abcdef")); // []
// console.log(primeNumberPrinter("4")); // []
// console.log(primeNumberPrinter("134")); // [13]
// console.log(primeNumberPrinter("42")); // [2]
// console.log(primeNumberPrinter("424")); // [2]
// console.log(primeNumberPrinter("42424")); // [2, 2]
// console.log(primeNumberPrinter("1278282")); // [127, 2, 2]
// console.log(primeNumberPrinter("243")); // [2, 3]

//00:53:09
// Never would have gotten this one in time during the interview :/

// problem 4
/*
Write a function that takes a two-dimensional array as the argument and turns it
into a flat array with all duplicated elements removed. Treat numbers and number
strings (e.g., 1 and '1') as duplicates, and keep the one that comes first in the result.
*/

/*
questions:
Can I assume I will get one array as an argument or do I have to handle incorrect
  data types or numbers of arguments?
Can I assume the passed array will be two-dimensional or do I need to somehow handle
  three or more dimensions? If so, how should they be handled? Do non-array objects
  count as increasing the dimensionality of the array (ie, can the array include
  only primitives, primitives and objects of any type, primitives and only array objects,
  or primitives and non-array objects)?
Will the arrays ever have non-element properties? If yes, should they be included
  in the return value, and how should their duplicity be calculated (if at all)?
Can the array be sparse? If so, how should empty elements be handled?
Can the array include NaN?
*/

function flattenAndUnique(matrix) {
  let array = matrix.flat();

  return array.filter((elem, index) => {
    if (Array.isArray(elem)) {
      return !array.slice(0, index).some(subarr => arrayEquals(elem, subarr));
    } else if (typeof elem === 'object') {
      return !array.slice(0, index).some(obj => objectEquals(elem, obj));
    } else if (typeof elem === 'string') {
      return !array.slice(0, index).some(subelem => {
        if (typeof subelem === 'number') return elem === String(subelem);
        else                             return elem === subelem;
      });
    } else if (typeof elem === 'number') {
      return !array.slice(0, index).some(subelem => {
        if      (Number.isNaN(elem))          return Number.isNaN(parseInt(subelem, 10));
        else if (typeof subelem === 'string') return elem === parseInt(subelem, 10);
        else                                  return elem === subelem;
      });
    } else {
      return !array.slice(0, index).some(subelem => elem === subelem);
    }
  });
}

function arrayEquals(array1, array2) {
  if (!Array.isArray(array1) || !Array.isArray(array2)) return false;
  if (array1.length !== array2.length) return false;

  return Object.values(array1).every((value, index) => value === Object.values(array2)[index]);
}

function objectEquals(object1, object2) {
  if (typeof object1 !== 'object' || typeof object2 != 'object') return false;
  if (!arrayEquals(Object.keys(object1), Object.keys(object2))) return false;

  let keys = Object.keys(object1);
  for (let i = 0; i < keys.length; i += 1) {
    if (object1[keys[i]] !== object2[keys[i]]) return false;
  }

  return true;
}

// console.log(flattenAndUnique([])); // []
// console.log(flattenAndUnique([[1, 2, 3], ['3', 4, 5, 'a']])); // [1, 2, 3, 4, 5, 'a']
// console.log(flattenAndUnique([[[2, 3]], [[2, 3], [2], ['3']]])); // [[2, 3], [2], ['3']]
// console.log(flattenAndUnique([[{a: 'a'}], [{a: 'a'}, {a: 'b'}]])); // [{a: 'a'}, {a: 'b'}}]
// console.log(flattenAndUnique([NaN, 2], ['2', NaN])); // [NaN, 2]
// console.log(flattenAndUnique(['NaN', 2], ['2', NaN])); // ['NaN', 2]
// console.log(flattenAndUnique([[undefined], [undefined, null]])); // [undefined, null]
// console.log(flattenAndUnique(['1', 1], [])); // ['1']
// console.log(flattenAndUnique([[1, 2], [2, 3], [2, 3, 4]])); // [1, 2, 3, 4]

// let test = [1]
// test[-1] = -1;
// test[-2] = -2;
// let test2 = [2]
// test2[-1] = -1;
// test2[-2] = -3;
// console.log(flattenAndUnique([test, test2])); // [1, 2]

// test = []
// test.length = 1;
// console.log(flattenAndUnique([test, [1, 2, undefined]])); // [1, 2, undefined]

//00:47:21