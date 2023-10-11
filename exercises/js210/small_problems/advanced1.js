// // Madlibs Revisited
// const WORDS = {
//   ADJECTIVE: [ 'quick', 'lazy', 'sleepy', 'noisy', 'hungry' ],
//   NOUN:      [ 'fox', 'dog', 'head', 'leg', 'tail', 'cat' ],
//   ADVERB:    [ 'easily', 'lazily', 'noisily', 'excitedly' ],
//   VERB:      [ 'jumps', 'lifts', 'bites', 'licks', 'pats' ],
// }

// const template = 'The ADJECTIVE brown NOUN ADVERB VERB the ADJECTIVE yellow ' +
//                 'NOUN, who ADVERB VERB his NOUN and looks around.'

// function madlibs(template) {
//   Object.keys(WORDS).forEach(type => {
//     (template.match(new RegExp(type, 'g')) || []).forEach(() => {
//       template = template.replace(new RegExp(type),
//                       WORDS[type][Math.floor(Math.random() * (WORDS[type]).length)]);
//     })
//   })

//   return template;
// }

// console.log(madlibs(template));

// // Transpose 3x3
// function transpose(matrix) {
//   let result = JSON.parse(JSON.stringify(matrix));

//   return result.map((_, column) => {
//     return matrix.map((row) => row[column]).flat();
//   });
// }

// const matrix = [
//   [1, 5, 8],
//   [4, 7, 2],
//   [3, 9, 6]
// ];

// const newMatrix = transpose(matrix);

// console.log(newMatrix);      // [[1, 4, 3], [5, 7, 9], [8, 2, 6]]
// console.log(matrix);         // [[1, 5, 8], [4, 7, 2], [3, 9, 6]]


// // Transpose MxN
// function transpose(matrix) {
//   let result = [];
//   let maxColumnLength = Math.max(...matrix.map(a => a.length));

//   for (let columnIndex = 0; columnIndex < matrix.length; columnIndex += 1) {
//     for (let rowIndex = 0; rowIndex < maxColumnLength; rowIndex += 1) {
//       result[rowIndex] = matrix.map(row => row[rowIndex]);
//     }
//   }

//   return result;
// }

// console.log(transpose([[1, 2, 3, 4]]));            // [[1], [2], [3], [4]]
// console.log(transpose([[1], [2], [3], [4]]));      // [[1, 2, 3, 4]]
// console.log(transpose([[1]]));                     // [[1]]

// console.log(transpose([[1, 2, 3, 4, 5], [4, 3, 2, 1, 0], [3, 7, 8, 6, 2]]));
// // [[1, 4, 3], [2, 3, 7], [3, 2, 8], [4, 1, 6], [5, 0, 2]]


// // Rotating Matrices
// function rotate90(matrix) {
//   return transpose(matrix).map(line => line.reverse());
// }

// const matrix1 = [
//   [1, 5, 8],
//   [4, 7, 2],
//   [3, 9, 6],
// ];

// const matrix2 = [
//   [3, 7, 4, 2],
//   [5, 1, 0, 8],
// ];

// const newMatrix1 = rotate90(matrix1);
// const newMatrix2 = rotate90(matrix2);
// const newMatrix3 = rotate90(rotate90(rotate90(rotate90(matrix2))));

// console.log(newMatrix1);      // [[3, 4, 1], [9, 7, 5], [6, 2, 8]]
// console.log(newMatrix2);      // [[5, 3], [1, 7], [0, 4], [8, 2]]
// console.log(newMatrix3);      // `matrix2` --> [[3, 7, 4, 2], [5, 1, 0, 8]]


// Merge Sorted Lists
function merge(...arrays) {
  let result = [];
  let arraysCopy = arrays.map(array => JSON.parse(JSON.stringify(array)));

  while (!arraysCopy.some(array => array.length <= 0)) {
    let minArray = arraysCopy.reduce((array, min) => array[0] < min[0] ? array : min);
    result.push(minArray.shift());
  }

  return result.concat(arraysCopy).flat();
}

// merge([1, 5, 9], [2, 6, 8]);      // [1, 2, 5, 6, 8, 9]
// merge([1, 1, 3], [2, 2]);         // [1, 1, 2, 2, 3]
// merge([], [1, 4, 5]);             // [1, 4, 5]
// merge([1, 4, 5], []);             // [1, 4, 5]


// Merge Sort
function mergeSort(array) {
  array = nestArray(JSON.parse(JSON.stringify(array.map(elem => [elem]))));
  array = recursiveMerge(array);

  return array;
}

function nestArray(array) {
  while (array.length > 2) {
    array.push([array.shift(), array.shift()]);
  }

  return array;
}

function recursiveMerge(...arrays) {
  if (arrays.some(sub => Array.isArray(sub) &&
                 sub.some(subsub => Array.isArray(subsub)))) {
    return recursiveMerge(...arrays.map(subarr => recursiveMerge(...subarr)));
  } else {
    return arrays.length > 1 ? merge(...arrays) : arrays.flat();
  }
}

mergeSort([9, 5, 7, 1]);           // [1, 5, 7, 9]
mergeSort([5, 3]);                 // [3, 5]
mergeSort([6, 2, 7, 1, 4]);        // [1, 2, 4, 6, 7]

mergeSort(['Sue', 'Pete', 'Alice', 'Tyler', 'Rachel', 'Kim', 'Bonnie']);
// ["Alice", "Bonnie", "Kim", "Pete", "Rachel", "Sue", "Tyler"]

mergeSort([7, 3, 9, 15, 23, 1, 6, 51, 22, 37, 54, 43, 5, 25, 35, 18, 46]);
// [1, 3, 5, 6, 7, 9, 15, 18, 22, 23, 25, 35, 37, 43, 46, 51, 54]


// Binary Search
const yellowPages = ['Apple Store', 'Bags Galore', 'Bike Store', 'Donuts R Us', 'Eat a Lot', 'Good Food', 'Pasta Place', 'Pizzeria', 'Tiki Lounge', 'Zooper'];

function binarySearch(array, target, index = 0) {
  if (array.length <= 1 && array[0] !== target) return -1;

  let middleIndex = Math.floor(array.length / 2);

  if (array[middleIndex] === target) {
    return index + middleIndex;
  } else if (array[middleIndex] < target) {
    return binarySearch(array.slice(middleIndex), target, index + middleIndex);
  } else {
    return binarySearch(array.slice(0, middleIndex), target, index);
  }
}

binarySearch(yellowPages, 'Pizzeria');                   // 7
binarySearch(yellowPages, 'Apple Store');                // 0

binarySearch([1, 5, 7, 11, 23, 45, 65, 89, 102], 77);    // -1
binarySearch([1, 5, 7, 11, 23, 45, 65, 89, 102], 89);    // 7
binarySearch([1, 5, 7, 11, 23, 45, 65, 89, 102], 5);     // 1

binarySearch(['Alice', 'Bonnie', 'Kim', 'Pete', 'Rachel', 'Sue', 'Tyler'], 'Peter');  // -1
binarySearch(['Alice', 'Bonnie', 'Kim', 'Pete', 'Rachel', 'Sue', 'Tyler'], 'Tyler');  // 6