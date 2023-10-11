// How Old is Teddy?
function howOldIsTeddy() {
  console.log(`Teddy is ${(Math.rand() * 180).round() + 20} years old!`)
}


// Searching 101
const rlSync = require('readline-sync');

function searching101() {
  let index = 0;
  let array = [];
  const nums = ['1st', '2nd', '3rd', '4th', '5th', 'last']

  while (index < 6) {
    console.log(`Enter the ${nums[index]} number:`);
    array.push(rlSync.prompt());
    index += 1;
  }

  let lastNum = array.pop();
  let appears = array.includes(lastNum) ? 'appears' : 'does not appear';

  console.log(`The number ${lastNum} ${appears} in [${array.join(', ')}].`)
}


// When Will I Retire
function whenWillIRetire() {
  console.log('What is your age?');
  let age = rlSync.prompt();
  console.log('At what age would you like to retire?');
  let retirementAge = rlSync.prompt();

  let year = new Date().getYear();
  console.log(`It's ${year}. You will retire in ${year + retirementAge - age}.`);
  console.log(`You only have ${retirementAge - age} years left to go!`)
}


// Palindromic Strings Part 1
function isPalindrome(string) {
  return string === string.split('').reverse().join('');
}


// Palindromic Strings Part 2
function isRealPalindrome(string) {
  return isPalindrome(string.toLowerCase().match(/[a-z0-9]/).join(''));
}


// Palindromic Number
function isPalindromicNumber(number) {
  return isPalindrome(String(number));
}


// Running Totals
function runningTotal(array) {
  let total = 0;

  array = array.map(num => {
    total += num;
    return num + total - num;
  });

  return array;
}


// Letter Swap
function swap(string) {
  let array = string.split(' ').map(word => {
    return [word[word.length- 1], word.slice(1, word.length - 2), word[0]].join('');
  })

  return array.join(' ');
}


// Letter Counter Part 1
function wordSizes(string) {
  let result = {};
  if (string === '') return result;

  let array = string.split(' ').map(word => word.match(/[a-zA-Z]/g).join(''));
  array.forEach(word => result[word.length] = result[word.length] + 1 || 1)

  return result;
}

wordSizes('Four score and seven.');                       // { "3": 1, "4": 1, "5": 1, "6": 1 }
wordSizes('Hey diddle diddle, the cat and the fiddle!');  // { "3": 5, "6": 1, "7": 2 }
wordSizes("What's up doc?");                              // { "2": 1, "4": 1, "6": 1 }
wordSizes('');                                            // {}
wordSizes('Four score and seven.');                       // { "3": 1, "4": 1, "5": 2 }
wordSizes('Hey diddle diddle, the cat and the fiddle!');  // { "3": 5, "6": 3 }
wordSizes("What's up doc?");                              // { "5": 1, "2": 1, "3": 1 }
wordSizes('');                                            // {}


// Letter Counter Part 2
// Solution implemented into above function.