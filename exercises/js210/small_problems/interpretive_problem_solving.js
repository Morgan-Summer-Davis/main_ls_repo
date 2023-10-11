// 1000 Lights
/*
input: an integer
output: an array

data structure: an array of integers

agorithm:
  Begin a for loop
    - The initialized variable will be an incrementer for the round
      - It will increment by 1 every iteration and the for loop will continue until
        it is greater than n
    - Initialize a switch variable that is equal to the round incrementer
    - While that variable is less than n
      - Check to see if that number is in the result array
        - If it is, set that index to a non-integer value
        - If it is not, add it to the array
      - Increment the switch variable by the round incrementer

  Remove non-integer values from the array
  Return the array
*/

function lightsOn(switches) {
  let result = [];

  for (let round = 1; round <= switches; round += 1) {
    let currentSwitch = round;
    while (currentSwitch <= switches) {
      if (result.includes(currentSwitch)) {
        delete result[result.indexOf(currentSwitch)]
      } else {
        result.push(currentSwitch);
      }

      currentSwitch += round;
    }
  }

  return Object.values(result);
}

lightsOn(5);        // [1, 4]
// Detailed result of each round for `5` lights
// Round 1: all lights are on
// Round 2: lights 2 and 4 are now off;     1, 3, and 5 are on
// Round 3: lights 2, 3, and 4 are now off; 1 and 5 are on
// Round 4: lights 2 and 3 are now off;     1, 4, and 5 are on
// Round 5: lights 2, 3, and 5 are now off; 1 and 4 are on

lightsOn(100);      // [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]
lightsOn(0);        // []
lightsOn(1);        // [1]
lightsOn(2);        // [1]
lightsOn(3);        // [1]
lightsOn(8);        // [1, 4]


// Diamonds
/*
input: integer
output: undefined
side effect: log a string

data structure: an array, joined into a string

algorithm:
Construct an array of rows to represent a corner of the diamond
  - Loop x times, where x is the floor of half the size of the diamond (Math.floor(size / 2))
  - On each loop, add a string of x spaces and x - the number of the current iteration
    (starting at 0) stars to the array
For each line in the array, print the line, then a star, then the reverse of the line and a newline
Print a number of stars equal to the size of the diamond
Reverse the array
For each line in the array, print the line, then a star, then the reverse of the line and a newline
*/

function diamond(size) {
  let lines = [];
  const CORNER_SIZE = Math.floor(size / 2);

  for (let i = 0; i <= CORNER_SIZE; i += 1) {
    let line = ' '.repeat(CORNER_SIZE - i) + '*'.repeat(i);
    lines.push(line + '*' + line.split('').reverse().join(''));
  }

  lines = lines.concat(lines.slice().reverse());
  console.log(lines.filter((line, index) => lines[index + 1] !== line).join('\n'));
}

function printLines(lines) {
  lines.forEach(line => {
    console.log(line + '*' + line.split('').reverse().join(''))
  });
}

// diamond(1);
// diamond(3);
// diamond(9);

// diamond(5);
/*
  *
 ***
*****
 ***
  *

1: 0
3: 1
5: 2
7: 3
9: 4
*/

function hollowDiamond(size) {
  let lines = [];
  const CORNER_SIZE = Math.floor(size / 2);

  for (let i = 0; i <= CORNER_SIZE; i += 1) {
    let line = ' '.repeat(CORNER_SIZE - i) + '*' + ' '.repeat(Math.max(i - 1, 0));
    lines.push(line + ' ' + line.split('').reverse().join(''));

    if (i === 0) lines[0] = line;
  }

  lines = lines.concat(lines.slice().reverse());
  console.log(lines.filter((line, index) => lines[index + 1] !== line).join('\n'));
}

hollowDiamond(1);
hollowDiamond(3);
hollowDiamond(9);
hollowDiamond(5);


// Now I Know My ABCs
/*
input: a string
output: a boolean

data structure: an object

Create an object to represent the blocks, where the key and value are the two letters on the block
Loop through the letters of the string
  - If the letter is present in the slice of the string following the current index, OR
    its value in the constant is present anywhere in the word, return false
Return true if the loop processes without return false.
*/

const BLOCKS = { 'B': 'O', 'X': 'K', 'D': 'Q', 'C': 'P', 'N': 'A', 'G': 'T',
                 'R': 'E', 'F': 'S', 'J': 'W', 'H': 'U', 'V': 'I', 'L': 'Y',
                 'Z': 'M' }

function isBlockWord(word) {
  word = word.toUpperCase();

  for (let i = 0; i < word.length; i += 1) {
    let remainingLetters = word.slice(i + 1);
    if (remainingLetters.includes(word[i]) || word.includes(BLOCKS[word[i]])) {
      return false;
    }
  }

  return true;
}

console.log(isBlockWord('BATCH'));      // true
console.log(isBlockWord('BUTCH'));      // false
console.log(isBlockWord('jest'));       // true
console.log(isBlockWord('jj'));         // false
console.log(isBlockWord(''));           // true
console.log(isBlockWord('a'));          // true

// Caesar Cipher
/*
input: a string and an integer
output: a string

data structure: alphabet as an array

algorithmL
Create a constant of the alphabet
Split the plaintext into an array of chars
Iterate through the split array
  - If the char is not a letter, skip it
  - If the char is a letter, upcase it and find its index in the alphabet constant
  - Find the char at that index + the key (using the remainder operator to wrap)
  - Replace the index of the given array with that character, downcased if the initial
    letter was lowercase
Return the array joined into a string
*/

const ALPHABET = [ "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L",
                   "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X",
                   "Y", "Z" ]

function caesarEncrypt(plaintext, key) {
  let letters = plaintext.split('');

  letters = letters.map(char => {
    if (!/[a-zA-Z]/.test(char)) return char;

    let encryptedIndex = (ALPHABET.indexOf(char.toUpperCase()) + key) % 26;
    if (char === char.toLowerCase()) {
      return ALPHABET[encryptedIndex].toLowerCase();
    } else {
      return ALPHABET[encryptedIndex];
    }
  })


  return letters.join('');
}

// simple shift
caesarEncrypt('A', 0);       // "A"
caesarEncrypt('A', 3);       // "D"

// wrap around
caesarEncrypt('y', 5);       // "d"
caesarEncrypt('a', 47);      // "v"

// all letters
caesarEncrypt('ABCDEFGHIJKLMNOPQRSTUVWXYZ', 25);
// "ZABCDEFGHIJKLMNOPQRSTUVWXY"
caesarEncrypt('The quick brown fox jumps over the lazy dog!', 5);
// "Ymj vznhp gwtbs ktc ozrux tajw ymj qfed itl!"

// many non-letters
caesarEncrypt('There are, as you can see, many punctuations. Right?; Wrong?', 2);
// "Vjgtg ctg, cu aqw ecp ugg, ocpa rwpevwcvkqpu. Tkijv?; Ytqpi?"

// Vigenere Cipher
/*
input: a string
output: a string

Establish an alphabet constant and ceasar cipher function (previous problem)
Split the input string into chars and pass each to the caesar cipher function
  using its own index in the alphbet constant as the key
Replace that index in the split input text with the returned character
Return the char array joined into a string
*/

function vigenereEncrypt(plaintext, key) {
  let letters = plaintext.split('');
  let keyIndex = 0;

  letters = letters.map(char => {
    let caesarKey = ALPHABET.indexOf(key[keyIndex].toUpperCase());

    if (/[a-zA-Z]/.test(char)) keyIndex = (keyIndex + 1) % key.length;
    return caesarEncrypt(char, caesarKey);
  });

  return letters.join('');
}

console.log(vigenereEncrypt("Pineapples don't go on pizzas!", 'meat'));

// Seeing Stars
/*
input: an odd integer greater than 7
output: none
side effect: logs a multiline string

data structure: an array, later coerced into a string

First, establish an array which is the lines of the top half of the star
  - Initialize an array to store lines of text
  - Establish a constant for the number of spaces per line in a corner of the
    star equal to the size of the star divided in half, floored, minus one
    (Math.floor(size / 2) - 1)
  - Begin looping that number of times
    - During each loop, push into the array a string consisting of a number of
      spaces equal to the iterator, a star, then a number of spaces equal to the
      total minus the iterator
    - Concat into that string a star followed by the string reversed and a newline
Add to the array a line of stars equal to the size, then the array reversed
Join the array into a string and log it
*/



function star(size) {
  let lines = [];
  let numOfLines = Math.floor(size / 2) - 1;

  for (let i = 0; i <= numOfLines; i += 1) {
    let corner = ' '.repeat(i) + '*' + ' '.repeat(numOfLines - i);
    lines.push(corner + '*' + corner.split('').reverse().join('') + '\n');
  }

  lines.push(lines.slice().concat(['*'.repeat(size) + '\n']).reverse());
  console.log(lines.flat().join(''));
}

star(7);
star(9);