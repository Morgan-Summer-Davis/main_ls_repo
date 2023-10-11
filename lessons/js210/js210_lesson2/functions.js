function average(a, b, c) {
  return sum(a, b, c) / 3;
}
console.log(average(1, 2, 3));


function sum(a, b, c) {
  return a + b + c;
}


function averageOfArray(arr) {
  return sumOfArray(arr) / arr.length;
}
console.log(averageOfArray([1, 2, 3, 4, 5]));


function sumOfArray(arr) {
  let total = 0;
  for (let index = 0; index < arr.length; index++) {
    total += arr[index];
  }
  return total;
}