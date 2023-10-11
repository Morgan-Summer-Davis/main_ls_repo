// Practice Problems: Arrays
function lastInArray(arr) {
  return arr[arr.length - 1];
}

function rollCall(arr) {
  for (let index = 0; index < arr.length; index++) {
    console.log(arr[index]);
  }
}

function reverseArray(arr) {
  let output = [];

  for (let index = arr.length - 1; index >= 0; index--) {
    output.push(arr[index]);
  }

  return output;
}

function arrayToString(arr) {
  let output = '';

  for (let index = 0; index < arr.length; index++) {
    output += String(arr[index]);
  }

  return output;
}

// Array Operations: push, pop, shift, and unshift
function push(arr, elem) {
  arr[arr.length] = elem;
  return arr.length;
}

function pop(arr) {
  let output = arr[arr.length - 1];
  arr.length = Math.max(arr.length - 1, 0);
  return output;
}

function unshift(arr, elem) {
  for (let index = arr.length; index > 0; index--) {
    arr[index] = arr[index - 1];
  }

  arr[0] = elem;
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


// Array Operations: indexOf and lastIndexOf
function indexOf(arr, elem) {
  for (let index = 0; index < arr.length; index++) {
    if (arr[index] === elem) return index;
  }

  return -1;
}

function lastIndexOf(arr, elem) {
  for (let index = arr.length - 1; index >= 0; index--) {
    if (arr[index] === elem) return index;
  }

  return -1;
}


// Array Operations: slice, splice, concat, and join
function slice(arr, start, end) {
  let output = [];
  for (let index = start; index <= end; index++) {
    push(arr, arr[index]);
  }

  return output;
}

function splice(arr, start, num) {
  let newArr       = [];
  let oldArrLength = 0;

  for (let index = 0; index < arr.length; index++) {
    if (index > start + num - 1 || index < start) {
      arr[oldArrLength] = arr[index];
      oldArrLength++;
    } else {
      push(newArr, arr[index]);
    }
  }

  arr.length = oldArrLength;
  return newArr;
}

function concat(arr1, arr2) {
  let output = [];

  for (let index = 0; index < arr1.length; index++) {
    push(output, arr1[index]);
  }

  for (let index = 0; index < arr2.length; index++) {
    push(output, arr2[index]);
  }

  return output;
}

function join(arr, seperator) {
  let output = '';
  for (let index = 0; index < arr.length; index++) {
    output += String(arr[index])
    if (index < arr.length - 1) output += seperator;
  }

  return output;
}


// Practice Problem: Comparing Arrays
function arraysEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;

  for (let index = 0; index < arr1.length; index++) {
    if (arr1[index] !== arr2[index]) return false;
  }

  return true;
}


// Practice Problems: Basic Array Uses
function firstElementOf(arr) {
  return arr[0];
}

function lastElementOf(arr) {
  return arr[arr.length - 1];
}

function nthElementOf(arr, index) {
  return arr[index];
}

  // We can insert data into an array with a negative index, but it becomes a property of
  // of the array object instead of an array element.

function firstNOf(arr, count) {
  return arr.slice(0, count);
}

function lastNOf(arr, count) {
  return arr.slice(-count);
}

function endsOf(beginningArr, endingArr) {
  return [beginningArr[0], endingArr[endingArr.length - 1]];
}


// Practice Problems: Intermediate Array Uses
function oddElementsOf(arr) {
  let output = [];
  for (let index = 1; index < arr.length; index += 2) {
    output.push(arr[index]);
  }

  return output;
}

function mirroredArray(arr) {
  return arr.concat(arr.slice().reverse());
}

function sortDescending(arr) {
  return arr.slice().sort((a, b) => b - a);
}

function matrixSums(arr) {
  return arr.map(subArr => subArr.reduce((acc, elem) => acc + elem, 0));
}

function uniqueElements(arr) {
  let output = [];

  for (let index = 0; index < arr.length; index++) {
    if (!output.includes(arr[index])) output.push(arr[index]);
  }

  return output;
}

function missing(arr) {
  let output = [];
  for (let index = Math.min(...arr); index < Math.max(...arr); index++) {
    if (!arr.includes(index)) output.push(index);
  }

  return output;
}