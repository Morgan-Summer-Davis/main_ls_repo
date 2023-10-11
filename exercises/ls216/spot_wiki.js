// doubler
/*
Write a function called doubler that doubles every value in an array
*/

/*
questions:
Can I assume that the function will receive only one argument?
Can I assume that that argument will be an array?
What values can be present in the array? All primitives? Arrays? Undefined / null?
  NaN? Non-array objects?
How should arrays be doubled? Should element values be doubled (and if so, what about
  property values?), should elements be dupklicated (and if so, what about properties?),
  or some other option? What about objects?
How should undefined, null, and NaN be doubled?
Can arrays be sparse? If so, how should empty elements be treated?
Can the argument passed itself be sparse? If so, how should empty elements be treated?
What should the output be if the array argument is empty? []?
How should strings be doubled? Should they be concatenated to themselves?

input: an array
output: an array

algorithm:
Initialize a result array variable
Iterate through each element (not using map, as some elements need to expand)
  - If it is a number, check if it's a NaN
    - If it is, insert two NaNs into the result array
    - Otherwise, double it
  - If it's a string, concatenate to itself
  - If it's null or a boolean, duplicate it and insert the duplicate after itself into the array
  - If it's undefined, check to see if it's an empty array element
    - Take a one-element slice of the array at the current index
      - If the Object.values length of that slice is 0, it's an empty element
      - Insert two elements into the result array and delete them both
    - Otherwise, insert two undefined values into the result array
  - If it's an object, check to see if it's an array
    - If it is, insert an empty array into the result and then iterate over each element in the original subarray
      - For each element, insert two copies into the new result subarray
      - Then iterate over each non-zero, non-positive key in the array
        -Set the property of the results subarray to the associated value in the original subarray
    - Otherwise, insert the object and an empty object into the result and iterate over the original object's keys
      - For each key, set the empty object's keys and values to be equal to the first's

*/

function doubler(array) {
  let result = [];

  for (let i = 0; i < array.length; i += 1) {
    let elem = array[i];

    switch (typeof elem) {
      case 'string':
      case 'bigint':
      case 'number':
        if (Number.isNaN(elem)) result.push(NaN, NaN);
        else                    result.push(elem + elem);
        break;
      case 'object':
        if (Array.isArray(elem)) {
          let dupArr = [];

          for (let j = 0; j < elem.length; j += 1) {
            dupArr.push(elem[j], elem[j]);

            if (Object.values(elem.slice(j, j + 1)).length === 0) {
              delete dupArr[result.length - 2];
              delete dupArr[result.length - 1];
            }
          }

          let props = Object.keys(elem).filter(key => !(parseInt(key, 10) >= 0));
          props.forEach(prop => dupArr[prop] = elem[prop]);

          result.push(dupArr);
        } else if (elem !== null) {
          result.push(elem);
          result.push({});
          Object.keys(elem).forEach(key => result[result.length - 1][key] = elem[key]);
        }
        break;
      case 'undefined':
        if (Object.values(array.slice(i, i + 1)).length === 0) {
          result.push(undefined, undefined);
          delete result[result.length - 2];
          delete result[result.length - 1];
          break;
        }
      default:
        result.push(elem, elem);
    }
  }

  return result;
}

// console.log(doubler([]));// === []);
// console.log(doubler([2n, 3.4]));// === [4, 6.8]);
// console.log(doubler(['string']));// === ['stringstring']);
// console.log(doubler([undefined, null, [undefined]]));// === [undefined, undefined, null, null, [undefined, undefined]]);
// console.log(doubler([NaN]));// === [NaN, NaN]);
// console.log(doubler([true]));// === [true, true]);

// console.log(doubler([[2, 3]]));// === [[2, 2, 3, 3]]);
// let test = [];
// test.length = 1;
// console.log(doubler(test));// === [ <2 empty items> ]);
// console.log(doubler([2, test, 4]));// === [4, [ <2 empty items> ], 8]);
// test = {a: 1, b: 2};
// console.log(test = doubler([test]));// === [{a: 1, b: 2}, {a: 1, b: 2}]);
// test[0] = undefined;
// console.log(test);// === [undefined, {a: 1, b: 2}]);
// test = [1, 2];
// test[-1] = -1;
// test['a'] = 'a';
// console.log(doubler([test]));//[1, 1, 2, 2, '-1': -1, 'a': 'a']

// console.log(doubler([6, 12, 'ab', 3, [], {a: 1}, undefined, true, ['a', 'b']]));
//   // === [12, 24, 'abab', 6, [], {a: 1}, {a: 1}, undefined, undefined, true, true, ['a', 'a', 'b', 'b']]);

//01:14:05


//duplicates
// You are given a table, in which every key is a stringified number, and each
// corresponding value is an array of characters, e.g.

// {
//   "1": ["A", "B", "C"],
//   "2": ["A", "B", "D", "A"],
// }
// Create a function that returns a table with the same keys, but each
// character should appear only once among the value-arrays, e.g.

// {
//   "1": ["C"],
//   "2": ["A", "B", "D"],
// }
// Rules
// Whenever two keys share the same character, they should be compared numerically,
// and the larger key will keep that character. That's why in the example above the
// array under the key "2" contains "A" and "B", as 2 > 1.
// If duplicate characters are found in the same array, the first occurance should be kept.

/*
questions:
Can I assume I will always receive a single object as a key?
Can I assume that the argument will always be formatted as indicated?
Will the strings contained in each row always be alphabetic characters? Will they
  always be uppercase? Are there aany differences in comparing non-capital or non-alphabetic
  characters--ie, is 'a' equal to 'A'?
If the row can contain non-string values, should values be considered equal to their stringified
  equivalent--ie, is 1 equal to '1'?
Can the argument be passed with no rows? If so, what should be output? Just an empty object?
Does the order of rows in the output matter?
Does the order of elements in rows in the output matter?
Do empty rows have any unexpected behavior? Will they always return empty with no influence on
  other rows?
Will the keys always be stringified integers? Do I have to account for stringified floats or other values?
Can the rows be sparse? If so, what should be done with the empty elements?

algorithm:
Inititialize a result variable to an empty object
Initialize an entries variable to the table's entries
Initialize a loggedValue variable to an empty array
Sort entries by its keys according to their parseInt value, largest to smallest, and iterate through them
  - Filter the entry's values by whether or not loggedVaues includes the given value
  - Then, store each element in the entry's values in loggedValues
Reverse the entries, convert them to an object, and return it
*/

function removeDuplicates(table) {
  let result = [];
  let entries = Object.entries(table);
  let loggedValues = [];

  entries.sort((entry1, entry2) => parseInt(entry2[0], 10) - parseInt(entry1[0]));

  entries.forEach(entry => {
    entry[1] = entry[1].filter(value => !loggedValues.includes(value));
    loggedValues.push(...entry[1]);
  });

  return entries.reverse().reduce((object, entry) => {
    object[entry[0]] = entry[1];
    return object;
  }, {});
}

// let input = {
//   "1": ["C", "F", "G"],
//   "2": ["A", "B", "C"],
//   "3": ["A", "B", "D"],
// }

// console.log(removeDuplicates(input));
// // output = {
// //   "1": ["F", "G"],
// //   "2": ["C"],
// //   "3": ["A", "B", "D"],
// // }

// input = {
//   "1": ["A"],
//   "2": ["A"],
//   "3": ["A"],
// }

// console.log(removeDuplicates(input));
// // output = {
// //   "1": [],
// //   "2": [],
// //   "3": ["A"],
// // }

// input = {
//   "432": ["A", "A", "B", "D"],
//   "53": ["L", "G", "B", "C"],
//   "236": ["L", "A", "X", "G", "H", "X"],
//   "11": ["P", "R", "S", "D"],
// }

// console.log(removeDuplicates(input));
// // output = {
// //   "11": ["P", "R", "S"],
// //   "53": ["C"],
// //   "236": ["L", "X", "G", "H"],
// //   "432": ["A", "B", "D"],
// // }

//00:24:04


//merge
// Write a function that takes two or more objects and returns
// a new object which combines all the input objects.

// Objects are combined
// together so that the values of matching keys are added together.

// The combine function should not mutate the input objects.

// Try to merge the objects manually, rather than using built-in methods.
// For bonus practice, what if the values are a different data type, like
// strings? Can you add versatility to your solution?


/*
questions:
Can I assume I will always receive two or more arguments? Can I assume all arguments
  will be objects? Can object arguments be arrays?
How should empty object arguments be handled?
How should arrays be handled? Should elements be treated like object values, or
  differently somehow? For instance, would combine([1, 2], [2, 3]) return [3, 5]
  or some other value?
How should non-number values be combined? Especially null, NaN, undefined, booleans,
  and objects?
Does the order in which values are added together matter? For instance, would
  { a: 'a' } and { a: 'b' } return { a: 'ab' }, { a: 'ba' }, or either?
Can values be objects or just primitive values?
Can values be NaN, undefined, or null?

algorithm:
Set default values of parameters to empty objects
Verify that all parameters are non-null objects--if they aren't, set them to an empty object
Initialize a result variable to {}
Begin iterating through the keys of the first object
  - Set the result's values and keys to be equal to that object's
Begin iterating through the keys of the second object
  - Check if the result object has that key
    - If it does, add the value of the second object to the value in the result object
      - *** Complex combining logic ***
    - If it doesn't, store that key and value in the result object
Return the result object

*** Complex combining logic ***
If one value is a number:

*/
function combine(...args) {
  args = args.map(arg => typeof arg === 'object' && arg !== null ? arg : {});
  let result = {};

  args.forEach(arg => {
    Object.keys(arg).forEach(key => {
      if (result.hasOwnProperty(key)) result[key] = combineValues(result[key], arg[key]);
      else                            result[key] = arg[key];
    });
  });

  if (args.every(arg => Array.isArray(arg))) return Object.values(result);

  return result;
}

function combineValues(...values) {
  let types = values.map(value => typeof value);

  if (values.includes(undefined) || values.includes(null)) {
    let filteredValues = values.filter(value => value !== null && value !== undefined)
    return filteredValues.length === 0 ? values[1] : filteredValues[0];
  } else if (values.includes(NaN)) {
    return NaN;
  } else if (types.includes('number') || types.includes('bigint') ||
             types.includes('string') || types.includes('boolean')) {
    return values[0] + values[1];
  } else if (values.every(value => Array.isArray(value))) {
    let arrays = values.sort((a, b) => b.length - a.length);
    return arrays[0].map((elem, index) => combineValues(elem, arrays[1][index]));
  } else if (types.includes('object')) {
    return combine(...values);
  }
}

// const objA = { a: 10, b: 20, c: 30 };
// const objB = { a: 3, c: 6, d: 3 };
// console.log(combine(objA, objB)); // Returns { a: 13, b: 20, c: 36, d: 3 }
// console.log(objA); //{ a: 10, b: 20, c: 30 };
// console.log(objB); //{ a: 3, c: 6, d: 3 };

// console.log(combine({a: 'a'}, {a: 'b', b: 'b'}, {a: 'c', b: 'c', c: 'c'}));
//   // { a: 'abc', b: 'bc', c: 'c' }

// console.log(combine()); // {}
// console.log(combine({a: 'a'})); // { a: 'a' }
// console.log(combine('a', {a: 'a'})); // { a: 'a' }

// console.log(combine({a: 'a'}, {a: 'a', b: 'b'})); // { a: 'aa', b: 'b' }
// console.log(combine({a: 'a', b: 'b'}, {a: 'a'})); // { a: 'aa', b: 'b' }
// console.log(combine({a: 'a'}, {a: 1})); // { a: 'a1' }

// console.log(combine({}, {})); // {}
// console.log(combine({}, {a: 1})); // { a: 1 }

// console.log(combine({a: null }, { a: null })); // { a: null }
// console.log(combine({a: null }, { a: undefined })); // { a: undefined }
// console.log(combine({a: null }, { a: 1 })); // { a: 1 }
// console.log(combine({a: undefined }, { a: 1 })); // { a: 1 }
// console.log(combine({a: 1 }, { a: undefined })); // { a: 1 }

// console.log(combine({a: true }, { a: 1 })); // { a: 2 }
// console.log(combine({a: 1 }, { a: false })); // { a: 1 }
// console.log(combine({a: true }, { a: false })); // { a: 1 }
// console.log(combine({a: true }, { a: 'a' })); // { a: 'truea' }
// console.log(combine({a: true }, { a: {} })); // { a: 'true[object Object]' }

// console.log(combine({a: NaN }, { a: 1 })); // { a: NaN }
// console.log(combine({a: 1 }, { a: NaN })); // { a: NaN }
// console.log(combine({a: NaN }, { a: 'a' })); // { a: NaN }

// console.log(combine({a: { b: 'a' } }, { a: { b: 'b', c: 'c' } })); // { a: { b: 'ab', c: 'c' } }
// console.log(combine({a: { b: 'a' } }, { a: 'a' })); // { a: '[object Object]a' }
// console.log(combine({a: [1, 2, 3] }, { a: [4, 5] })); // {a: [5, 7, 3] }
// console.log(combine([1, 2, 3], [4, 5])); // [5, 7, 3]
// console.log(combine([1, 2, 3], [])); // [1, 2, 3]
// console.log(combine([1, 2, 3], {})); // { '0': 1, '1': 2, '2': 3 }
// console.log(combine({a: { b: 'a', '1': 1 } }, { a: [1, 2] })); // { a: { b: 'a', '0': 1, '1': 3 } }

// console.log(combine({}, null)); // {}
// console.log(combine({}, null)); // {}

//01:11:41


//recycle
// You will be given a list of objects. Each object has type, material, and
// possibly secondMaterial. The existing materials are: paper, glass, organic,
// and plastic.

// Your job is to sort these objects across the 4 recycling bins according to
// their material (and secondMaterial if it's present), by listing the type's
// of objects that should go into those bins.

// Notes
// The bins should come in the same order as the materials listed above
// All bins should be listed in the output, even if some of them are empty
// If an object is made of two materials, its type should be listed in
// both of the respective bins
// The order of the type's in each bin should be the same as the order of
// their respective objects was in the input list

// Consider edge cases, write more test cases, focus on dissecting problem and
// organizing code.

/*
Can I assume I will receive a single array as an argument?
Can I assume that the array will only contain objects?
Can I assume those objects will be formatted correctly (ie, having a 'type'
  property, a 'material' property, and an optional 'secondMaterial' property?)
Will all objects have a material of one of the listed types, or might there be
  other materials present?
What should be returned when passed an empty array?
What should be done with an object that has a relevant material, but no type?
What should be done if an object has the same material and secondMaterial? Should
  it appear in that bin once or twice (or some other option)?

algorithm:
Filter the passed argument to only items which contain either a material or
  secondMaterial relevant for each given bin
Map that filtered argument to their type property or 'a mystery item'
Return those mapped, filtered arrays as an object
*/

const RECYCLABLE_MATERIALS = ['paper', 'glass', 'organic', 'plastic'];

function recycle(items) {
  return [
    items.filter(item => isMaterial(item, RECYCLABLE_MATERIALS[0])).map(item => item.type).filter(type => type),
    items.filter(item => isMaterial(item, RECYCLABLE_MATERIALS[1])).map(item => item.type).filter(type => type),
    items.filter(item => isMaterial(item, RECYCLABLE_MATERIALS[2])).map(item => item.type).filter(type => type),
    items.filter(item => isMaterial(item, RECYCLABLE_MATERIALS[3])).map(item => item.type).filter(type => type),
  ]
}

function isMaterial(item, material) {
  return item.material === material || item.secondMaterial === material;
}

// let input = [
//   {"type": "rotten apples", "material": "organic"},
//   {"type": "out of date yogurt", "material": "organic", "secondMaterial": "plastic"},
//   {"type": "wine bottle", "material": "glass", "secondMaterial": "paper"},
//   {"type": "amazon box", "material": "paper"},
//   {"type": "beer bottle", "material": "glass", "secondMaterial": "paper"}
// ]
// console.log(recycle(input));
// // output = [
// //   ["wine bottle", "amazon box", "beer bottle"],
// //   ["wine bottle", "beer bottle"],
// //   ["rotten apples", "out of date yogurt"],
// //   ["out of date yogurt"]
// // ]

// input = [];
// console.log(recycle(input));
// // output = [
// //   [],
// //   [],
// //   [],
// //   []
// // ]

// input = [
//   {"type": "rotten apples", "material": "organic"},
//   {"type": "example"},
// ];
// console.log(recycle(input));
// // output = [
// //   [],
// //   [],
// //   ['rotten apples'],
// //   []
// // ]

// input = [
//   {"type": "rotten apples", "secondMaterial": "organic"},
// ];
// console.log(recycle(input));
// // output = [
// //   [],
// //   [],
// //   ['rotten apples'],
// //   []
// // ]

// input = [
//   {"material": "organic"},
// ];
// console.log(recycle(input));
// // output = [
// //   [],
// //   [],
// //   [],
// //   []
// // ]

// input = [
//   {"type": "rotten apples", 'material': 'organic', "secondMaterial": "organic"},
// ];
// console.log(recycle(input));
// // output = [
// //   [],
// //   [],
// //   ['rotten apples'],
// //   []
// // ]

//00:19:47


//supermarket
// There is a queue for the self-checkout tills at the supermarket. Your task is
// write a function to calculate the total time required for all the customers to check out!

// input
// customers: an array of positive integers representing the queue. Each integer
// represents a customer, and its value is the amount of time they require to check out.
// n: a positive integer, the number of checkout tills.

// output
// The function should return an integer, the total time required.

// Clarifications
// There is only ONE queue serving many tills, and
// The order of the queue NEVER changes, and
// The front person in the queue (i.e. the first element in the array/list) proceeds
// to a till as soon as it becomes free.
// N.B. You should assume that all the test input will be valid, as specified above.

/*
Can I assume I will always receive an array and an integer as arguments?
Will the array always contain numbers? Will they always be integers? Can they ever be NaN?
  Can they ever be zero or negative?
Can the number of tills ever be less than 1? If so, how should this be handled?
What should be output if the customer array is empty?
Can the passed array be mutated?

algorithm:
Initialize a variable, customersAtTills, to a subarray of the first x values
  of the customers array, where x is numOfTills
Initialize a return variable to 0
Reassign customers to a slice copy of itself

While customers has a length of 1 or more
  While customersAtTills includes any zero or negative values
    - Set any values in customersAtTills that are 0 or less to the return of
      customers.shift
  - Break if customers has a length of 0
  - Increment result by 1
  - Decrement all values in customersAtTills by 1
Return result + the max value still in customersAtTills, if any
*/

function queueTime(customers, numOfTills) {
  customers = customers.filter(cust => cust > 0)
  if (customers.length === 0) return 0;
  if (numOfTills === 0)       return Infinity;

  let customersAtTills = customers.slice(0, numOfTills);
  customers            = customers.slice(numOfTills);
  let result           = 0;

  while (customers.length > 0) {
    customersAtTills = customersAtTills.filter(cust => cust > 0);

    while (customersAtTills.length < numOfTills) {
      customersAtTills.push(customers.shift());
    }

    if (customers.length <= 0) break;

    result += 1;
    customersAtTills = customersAtTills.map(cust => cust - 1);
  }

  return result + (Math.max(...customersAtTills) || 0);
}

// console.log(queueTime([5, 3, 4], 1)); //12
// console.log(queueTime([5], 1)); //5
// console.log(queueTime([10, 2, 3, 3], 2)); //10
// console.log(queueTime([2, 3, 10], 2)); //12
// console.log(queueTime([2, 3, 10], 3)); //10
// console.log(queueTime([2, 3, 10], 4)); //10
// console.log(queueTime([2, 3, 10, 5], 3)); //10
// console.log(queueTime([2, 3, 10, 5, 100, 10], 2)); //108
// console.log(queueTime([2, 3, 10, 5, 100, 10], 3)); //103
// console.log(queueTime([2, 0, 0, 0], 1)); //2
// console.log(queueTime([0, 0, 0, 2], 1)); //2

// console.log(queueTime([], 1)); //0
// console.log(queueTime([], 0)); //0
// console.log(queueTime([0, 0, 0], 0)); //0
// console.log(queueTime([0], 1)); //0
// console.log(queueTime([1], 0)); //Infinity

//00:38:33


//pyramid arrays
/*
Given a number n, return an array containing several arrays. Each array increments
in size, from range 1 to n inclusive, contaning its length as the elements.

n will be a positive integer.
*/

/*
questions:
I see I can assume that n will be a positive integer, but can I assume it is the
  only argument passed to pyramidArrays? If no, what should be done with excess
  parameters, if anything?
Can the function be passed no arguments at all?

algorithm:

*/

function pyramidArrays(n) {
  return Array(n).fill([]).map((_, index) => Array(index + 1).fill(index + 1));
}

// console.log(pyramidArrays(1));// ➞ [[1]]
// console.log(pyramidArrays(3));// ➞ [[1], [2, 2], [3, 3, 3]]
// console.log(pyramidArrays(5));// ➞ [[1], [2, 2], [3, 3, 3], [4, 4, 4, 4], [5, 5, 5, 5, 5]]

// 00:04:57

//combine arrays
/*
Create a function that takes three arrays and returns one array where all passed
arrays are combined into nested arrays.

These arrays should be combined based on indexes: the first nested array should
contain only the items on index 0, the second array on index 1, and so on.

If any array contains fewer items than necessary, supplement the missing item
with "*".
*/

/*
questions:
Can I assume that I will always receive three arrays as arguments?
Can the arrays be sparse? If so, how should empty elements be handled?
Can the arrays be mutated?
How should empty arrays be handled? Will they effectively be treated as all asterisks?
How should single char asterisk strings in the three arrays be treated?
What should be done with aarrays that have more than three elements?
Migght the arrays have non-element properties? If so, what should be done with them, if anything?
*/

function combineArrays(arr1 = [], arr2 = [], arr3 = []) {
  return [
    [valueAtIndex(arr1, 0), valueAtIndex(arr2, 0), valueAtIndex(arr3, 0)],
    [valueAtIndex(arr1, 1), valueAtIndex(arr2, 1), valueAtIndex(arr3, 1)],
    [valueAtIndex(arr1, 2), valueAtIndex(arr2, 2), valueAtIndex(arr3, 2)],
  ]
}

function valueAtIndex(array, index) {
  return array.hasOwnProperty(String(index)) ? array[index] : '*';
}

console.log(combineArrays([false, "false"], ["true", true, "bool"], ["null", "undefined"]));
  //➞ [[false, "true", "null"], ["false", true, "undefined"], ["*", "bool", "*"]]
console.log(combineArrays([1, 2, 3], [4, 5, 6], [7, 8, 9])); //➞ [[1, 4, 7], [2, 5, 8], [3, 6, 9]]
console.log(combineArrays(["Jack", "Joe", "Jill"], ["Stuart", "Sammy", "Silvia"], ["Rick", "Raymond", "Riri"]));
  //➞ [["Jack", "Stuart", "Rick"], ["Joe", "Sammy",  "Raymond"], ["Jill", "Silvia", "Riri"]]

let a = [1, 2, 3];
delete a[1];
console.log(combineArrays(a, [4, 5, 6], [7, 8, 9])); // [[1, 4, 7], [*, 5, 8], [3, 6, 9]]
a = [1, undefined, 3]
console.log(combineArrays(a, [4, 5, 6], [7, 8, 9])); // [[1, 4, 7], [undefined, 5, 8], [3, 6, 9]]
console.log(a); // [1, undefined, 3]

console.log(combineArrays([1, 1, 1, 1], [2, 2, 2], [3, 3])); // [1, 2, 3], [1, 2, 3], [1, 2, '*']
console.log(combineArrays([1, '*'])); // [1, '*', '*'], ['*', '*', '*'], ['*', '*', '*']

//00:14:04