// Higher-order functions use functions as arguments, return a function or both.


// filter is higher-order, as it accepts a function as the test by which to test
// the calling array


let numbers = [1, 2, 3, 4];
function makeCheckEven() {
  return (num) => num % 2 === 0;
}

let checkEven = makeCheckEven();

console.log(numbers.filter(checkEven)); // [2, 4]


function execute(func, operand) {
  return func(operand);
}

execute(function(number) {
  return number * 2;
}, 10); // 20

execute(function(string) {
  return string.toUpperCase();
}, 'hey there buddy'); // "HEY THERE BUDDY"


function makeListTransformer(func) {
  return (arr) => arr.map(func);
}

let timesTwo = makeListTransformer(function(number) {
  return number * 2;
});

timesTwo([1, 2, 3, 4]); // [2, 4, 6, 8]