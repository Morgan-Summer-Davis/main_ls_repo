// Array Copy Part 1
[1, 2, 3]
[1, 2, 3]


// Array Copy Part 2
let myArray = [1, 2, 3, 4];
let myOtherArray1 = myArray.slice();
let myOtherArray2 = [];

for (let index = 0; index < myArray.length; index++) {
  myOtherArray2.push(myArray[index]);
}


// Array Concat Part 1
function concat(array1, ...args) {
  let output = array1.slice();

  for (let i = 0; i < args.length; i++) {
    if (Array.isArray(args[i])) {
      for (let j = 0; j < args[i].length; j++) {
        output.push(args[i][j]);
      }
    } else {
      output.push(args[i]);
    }
  }

  return output;
}


// Array Concat Part 2
// Implemented into the preceding answer.


// Array Pop and Push
function push(arr, ...args) {
  for (let index = 0; index < args.length; index++) {
    arr[arr.length] = args[index];
  }

  return arr.length;
}

function pop(arr) {
  let output = arr[arr.length - 1];
  arr.length = Math.max(arr.length - 1, 0);
  return output;
}


// Array and String Reverse
function reverse(inputForReversal) {
  let datatype = typeof inputForReversal;
  if (datatype === 'string') inputForReversal = inputForReversal.split('');

  let output = [];
  for (let index = inputForReversal.length - 1; index >= 0; index--) {
    output.push(inputForReversal[index]);
  }

  if (datatype === 'string') output = output.join('');

  return output;
}


// Array Shift and Unshift
function unshift(arr, ...args) {
  let combinedArray = args.concat(arr);
  for (let index = 0; index < combinedArray.length; index++) {
    arr[index] = combinedArray[index];
  }

  return arr.length;
}

function shift(arr) {
  let output = arr[0];

  for (let index = 0; index < arr.length; index++) {
    arr[index] = arr[index + 1];
  }

  arr.length = Math.max(arr.length - 1, 0);

  return output;
}


// Array Slice and Splice
function slice(array, begin, end) {
  let output = [];

  for (let index = begin; index < begin + end - 1 && index < array.length; index++) {
    output.push(array[index]);
  }

  return output;
}

function splice(array, start, deleteCount, ...args) {
  let arrayStart = [];
  let arrayEnd   = [];
  let output     = [];

  for (let index = 0; index < array.length; index++) {
    if (index < start)                                 arrayStart.push(array[index]);
    if (index >= start && index < start + deleteCount) output.push(array[index]);
    if (index >= start + deleteCount)                  arrayEnd.push(array[index]);
  }

  for (let index = 0; index < arrayStart.length + arrayEnd.length + args.length; index++) {
    if (index < arrayStart.length) {
      array[index] = arrayStart[index];
    } else if (index >= arrayStart.length + args.length) {
      array[index] = arrayEnd[index - arrayStart.length - args.length]
    } else {
      array[index] = args[index - arrayStart.length];
    }
  }

  console.log(output);
  return output;
}


// Oddities
// Array comparison using operators does not work based on their stored values in
// Javascript, so while both compared arrays in both cases contain the same values,
// they are judged as not equal since they are different objects.


// Array Comparison
function areArraysEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;

  let sortFunction = (elem1, elem2) => {
    if (elem1 == elem2 && elem1 !== elem2) {
      return (typeof elem1).charCodeAt(0) - (typeof elem2).charCodeAt(0)
    }

    if (elem1 === elem2) return 0;
    if (elem1 < elem2)   return -1;
    if (elem1 > elem2)   return 1;
  };

  arr1 = arr1.slice().sort(sortFunction);
  arr2 = arr2.slice().sort(sortFunction);

  for (let index = 0; index < arr1.length; index++) {
    if (arr1[index] !== arr2[index]) return false;
  }

  return true;
}

console.log(areArraysEqual([1, 2, 3], [1, 2, 3]));                  // true
console.log(areArraysEqual([1, 2, 3], [3, 2, 1]));                  // true
console.log(areArraysEqual(['a', 'b', 'c'], ['b', 'c', 'a']));      // true
console.log(areArraysEqual(['1', 2, 3], [1, 2, 3]));                // false
console.log(areArraysEqual([1, 1, 2, 3], [3, 1, 2, 1]));            // true
console.log(areArraysEqual([1, 2, 3, 4], [1, 1, 2, 3]));            // false
console.log(areArraysEqual([1, 1, 2, 2], [4, 2, 3, 1]));            // false
console.log(areArraysEqual([1, 1, 2], [1, 2, 2]));                  // false
console.log(areArraysEqual([1, 1, 1], [1, 1]));                     // false
console.log(areArraysEqual([1, 1], [1, 1]));                        // true
console.log(areArraysEqual([1, '1'], ['1', 1]));                    // true