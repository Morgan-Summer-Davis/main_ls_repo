// Sum of Digits
function sum(number) {
  return String(number).split('').reduce((total, num) => total + Number(num), 0);
}

sum(23);           // 5
sum(496);          // 19
sum(123456789);    // 45


// Alphabetical Numbers
function alphabeticNumberSort(numArray) {
  const NUMBER_WORDS = { 'zero': '0', 'one': '1', 'two': '2', 'three': '3',
                         'four': '4', 'five': '5', 'six': '6', 'seven': '7',
                         'eight': '8', 'nine': '9', 'ten': '10', 'eleven': '1',
                         'twelve': '12', 'thirteen': '13', 'fourteen': '14',
                         'fifteen': '15', 'sixteen': '16', 'seventeen': '17',
                         'eighteen': '18', 'nineteen': '19' }

  return numArray.map(num => Object.keys(NUMBER_WORDS)[num])
                 .sort()
                 .map(word => NUMBER_WORDS[word])
                 .map(string => Number(string));
}

alphabeticNumberSort(
   [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]);
// [8, 18, 11, 15, 5, 4, 14, 9, 19, 1, 7, 17, 6, 16, 10, 13, 3, 12, 2, 0]


// Multiply All Pairs
function multiplyAllPairs(array1, array2) {
  let result = [];

  array1.forEach(num1 => {
    array2.forEach(num2 => {
      result.push(num1 * num2)
    })
  })

  return result.sort((num1, num2) => {
    if      (num1 < num2) return -1;
    else if (num2 < num1) return 1;
    else                  return 0;
  })
}

multiplyAllPairs([2, 4], [4, 3, 1, 2]);    // [2, 4, 4, 6, 8, 8, 12, 16]


// Sum of Sums
function sumOfSums(array) {
  let arrayCopy = array.slice()

  return array.reduce(total => {
    return arrayCopy.pop() + arrayCopy.reduce((subtotal, num) => subtotal + num) + total;
  });
}

sumOfSums([3, 5, 2]);        // (3) + (3 + 5) + (3 + 5 + 2) --> 21
sumOfSums([1, 5, 7, 3]);     // (1) + (1 + 5) + (1 + 5 + 7) + (1 + 5 + 7 + 3) --> 36
sumOfSums([4]);              // 4
sumOfSums([1, 2, 3, 4, 5]);  // 35


// Leading Substrings
function leadingSubstrings(string) {
  return string.split('').map((_, index) => string.slice(0, index + 1));
}

leadingSubstrings('abc');      // ["a", "ab", "abc"]
leadingSubstrings('a');        // ["a"]
leadingSubstrings('xyzzy');    // ["x", "xy", "xyz", "xyzz", "xyzzy"]


// All Substrings
function substrings(string) {
  return string.split('').map((_, index) => leadingSubstrings(string.slice(index))).flat();
}

substrings('abcde');

// returns
[ "a", "ab", "abc", "abcd", "abcde",
  "b", "bc", "bcd", "bcde",
  "c", "cd", "cde",
  "d", "de",
  "e" ]


// Palindromic Substrings
function palindromes(string) {
  return substrings(string).filter(substr => {
    return substr === substr.split('').reverse().join('') && substr.length > 1;
  });
}

palindromes('abcd');       // []
palindromes('madam');      // [ "madam", "ada" ]

palindromes('hello-madam-did-madam-goodbye');
// returns
[ "ll", "-madam-", "-madam-did-madam-", "madam", "madam-did-madam", "ada",
  "adam-did-mada", "dam-did-mad", "am-did-ma", "m-did-m", "-did-", "did",
  "-madam-", "madam", "ada", "oo" ]

palindromes('knitting cassettes');
// returns
[ "nittin", "itti", "tt", "ss", "settes", "ette", "tt" ]


// Grocery List
function buyFruit(matrix) {
  return matrix.map(array => (array[0] + ' ').repeat(array[1]).trim().split(' ')).flat();
}

buyFruit([['apple', 3], ['orange', 1], ['banana', 2]]);
// returns ["apple", "apple", "apple", "orange", "banana", "banana"]


// Inventory Item Transactions
function transactionsFor(id, transactions) {
  return transactions.filter(transaction => transaction.id === id);
}

const transactions = [ { id: 101, movement: 'in',  quantity:  5 },
                       { id: 105, movement: 'in',  quantity: 10 },
                       { id: 102, movement: 'out', quantity: 17 },
                       { id: 101, movement: 'in',  quantity: 12 },
                       { id: 103, movement: 'out', quantity: 15 },
                       { id: 102, movement: 'out', quantity: 15 },
                       { id: 105, movement: 'in',  quantity: 25 },
                       { id: 101, movement: 'out', quantity: 18 },
                       { id: 102, movement: 'in',  quantity: 22 },
                       { id: 103, movement: 'out', quantity: 15 }, ];

console.log(transactionsFor(101, transactions));
// returns
// [ { id: 101, movement: "in",  quantity:  5 },
//   { id: 101, movement: "in",  quantity: 12 },
//   { id: 101, movement: "out", quantity: 18 }, ]


// Inventory Item Availability
function isItemAvailable(id, transactions) {
  const numAvailable = transactionsFor(id, transactions).reduce((total, trans) => {
    if (trans.movement === 'in') return total + trans.quantity
    else                         return total - trans.quantity;
  }, 0);

  return numAvailable > 0;
}

isItemAvailable(101, transactions);     // false
isItemAvailable(105, transactions);     // true