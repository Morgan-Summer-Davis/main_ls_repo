let words = [
  'laboratory',
  'experiment',
  'flab',
  'Pans Labyrinth',
  'elaborate',
  'polar bear',
];

function allMatches(arr, regex) {
  return arr.filter(str => regex.test(str));
}

console.log(allMatches(words, /lab/)); // => ['laboratory', 'flab', 'elaborate']


function isNotANumber(param) {
  return (typeof param === 'number' && param / 1 !== param );
}

console.log(isNotANumber(NaN));
console.log(isNotANumber(3));
console.log(isNotANumber('a'));


function isNegativeZero(num) {
  return 1 / num === -Infinity;
}

console.log(isNegativeZero(0));
console.log(isNegativeZero(-0))
console.log(isNegativeZero(10))