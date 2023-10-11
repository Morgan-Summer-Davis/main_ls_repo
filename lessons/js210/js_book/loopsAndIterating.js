function factorial(num) {
  return num === 1 ? 1 : num * factorial(num - 1);
}

console.log(factorial(1));     // => 1
console.log(factorial(2));     // => 2
console.log(factorial(3));     // => 6
console.log(factorial(4));     // => 24
console.log(factorial(5));     // => 120
console.log(factorial(6));     // => 720
console.log(factorial(7));     // => 5040
console.log(factorial(8));     // => 40320

console.log(['a', 'abcd', 'abcde', 'abc', 'ab'].reduce((acc, str) => {
  if (str.length % 2 !== 0) {
    acc.push(str.length);
  }
  return acc;
}, []));