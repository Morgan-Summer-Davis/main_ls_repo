// No--the function must be initialized in a non-arrow function expression that
// is longer than one line long


(function() {
  console.log("Sometimes, syntax isn't intuitive!")
})();

let test = function() {
  console.log("Sometimes, syntax isn't intuitive!")
}();


var sum = 0;
var numbers;

sum += 10;
sum += 31;

numbers = [1, 7, -3, 3];

sum += (function sum(arr) {
  return arr.reduce(function(sum, number) {
    sum += number;
    return sum;
  }, 0);
})(numbers);


function countdown(n) {
  return (function(num) {
    while (num >= 0) {
      console.log(num);
      num--;
    }

    console.log('Done!');
  })(n);
}

countdown(7);


// No


function countdown(n) {
  return (function recursion(num) {
    if (num >= 0) {
      console.log(num);
      return recursion(num - 1);
    }

    return console.log('Done!');
  })(n);
}

countdown(7);