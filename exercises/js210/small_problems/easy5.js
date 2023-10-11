// Double Char Part 1
function repeater(string) {
  return string.split('').map(char => [char, char]).flat(2).join('');
}

repeater('Hello');        // "HHeelllloo"
repeater('Good job!');    // "GGoooodd  jjoobb!!"
repeater('');             // ""


// Double Char Part 2
function doubleConsonants(string) {
  let chars = string.split('').map(char => {
    if (/[bcdfghjklmnpqrstvwx]/.test(char.toLowerCase())) return [char, char];
    return [char];
  })

  return chars.flat(2).join('');
}

doubleConsonants('String');          // "SSttrrinngg"
doubleConsonants('Hello-World!');    // "HHellllo-WWorrlldd!"
doubleConsonants('July 4th');        // "JJullyy 4tthh"
doubleConsonants('');                // ""


// Reverse Number
function reverseNumber(number) {
  return parseInt(String(number).split('').reverse().join(''), 10);
}

reverseNumber(12345);    // 54321
reverseNumber(12213);    // 31221
reverseNumber(456);      // 654
reverseNumber(12000);    // 21 -- Note that zeros get dropped!
reverseNumber(1);        // 1


// Get the Middle Character
function centerOf(string) {
  return string.slice(Math.ceil(string.length / 2 - 1), Math.floor(string.length / 2 + 1));
}

centerOf('I Love JavaScript'); // "a"
centerOf('Launch School');     // " "
centerOf('Launch');            // "un"
centerOf('Launchschool');      // "hs"
centerOf('x');                 // "x"


// Always Return Negative
function negative(number) {
  return -Math.abs(number);
}

negative(5);     // -5
negative(-3);    // -3
negative(0);     // -0


// Counting Up
function sequence(max) {
  let iterator = 0;
  let result   = [];

  while (iterator < max) {
    iterator += 1;
    result.push(iterator);
  }

  return result;
}

sequence(5);    // [1, 2, 3, 4, 5]
sequence(3);    // [1, 2, 3]
sequence(1);    // [1]


// Name Swapping
function swapName(fullName) {
  return String(fullName.slice(fullName.lastIndexOf(' ') + 1)) + ', ' +
         String(fullName.slice(0, fullName.lastIndexOf(' ')));
}

swapName('Joe Bob Roberts');    // "Roberts, Joe"


// Sequence Count
function sequenceCount(count, multiplier) {
  let result = [];

  for (let index = 1; index <= count; index += 1) {
    result.push(index * multiplier);
  }

  return result;
}

sequenceCount(5, 1);          // [1, 2, 3, 4, 5]
sequenceCount(4, -7);         // [-7, -14, -21, -28]
sequenceCount(3, 0);          // [0, 0, 0]
sequenceCount(0, 1000000);    // []


// Reverse It Part 1
function reverseSentence(string) {
  return string.split(' ').reverse().join(' ');
}

reverseSentence('');                       // ""
reverseSentence('Hello World');            // "World Hello"
reverseSentence('Reverse these words');    // "words these Reverse"


// Reverse It Part 2
function reverseWords(string) {
  return string.split(' ').map(word => {
    word.length >= 5 ? word.split('').reverse().join('') : word
  }).join(' ');
}

reverseWords('Professional');             // "lanoisseforP"
reverseWords('Walk around the block');    // "Walk dnuora the kcolb"
reverseWords('Launch School');            // "hcnuaL loohcS"