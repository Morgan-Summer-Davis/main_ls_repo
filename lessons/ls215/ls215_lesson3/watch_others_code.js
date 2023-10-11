// problem 1
function cleanPhoneNumber(phoneNumber) {
  const INVALID_NUMBER = '0000000000';

  phoneNumber = (phoneNumber.match(/[0-9]/g) || []).join('')
  if (phoneNumber.length === 11 && phoneNumber[0] === '1') {
    phoneNumber = phoneNumber.slice(1);
  }

  return phoneNumber.length !== 10 ? INVALID_NUMBER : phoneNumber;
}

console.log(cleanPhoneNumber('1234567890'));
console.log(cleanPhoneNumber('12345678900'));
console.log(cleanPhoneNumber('123456789'));
console.log(cleanPhoneNumber('2234567890'));
console.log(cleanPhoneNumber('22345678900'));
console.log(cleanPhoneNumber('123drg4(56-78a90'));
console.log(cleanPhoneNumber('aaaaaaaaaa'));
console.log(cleanPhoneNumber(''));

// problem 2
function luhnFormula(numString) {
  return numString.replace(/\D/g, '')
                  .split('')
                  .reverse()
                  .map((char, index) => {
                    let num = parseInt(char, 10);
                    if (index % 2 === 1) num *= 2;
                    if (num >= 10)       num -= 9;
                    return num;
                  }).reduce((a, b) => a + b);
}

function checksum(numString) {
  return luhnFormula(numString) % 10 === 0;
}

console.log(checksum("2323 2005 7766 3554"));
console.log(checksum("8763"));
console.log(checksum("1111"));

function addCheckDigit(numString) {
  if (checksum(numString)) return numString;

  let checkDigit = 0;
  while (!checksum(numString + String(checkDigit))) {
    checkDigit += 1;
  }

  return numString + String(checkDigit);
}

console.log(addCheckDigit('2323 2005 7766 355'));
console.log(addCheckDigit('2323 2005 7766 3554'));

// problem 3
const BLOCKS = { 'B': 'O', 'X': 'K', 'D': 'Q', 'C': 'P', 'N': 'A', 'G': 'T',
                 'R': 'E', 'F': 'S', 'J': 'W', 'H': 'U', 'V': 'I', 'L': 'Y',
                 'Z': 'M' }

function isBlockWord(word) {
  let letters = word.toUpperCase();

  for (let i = 0; i < letters.length; i += 1) {
    if (letters.includes(BLOCKS[letters[i]]) ||
        letters.slice(i + 1).includes(letters[i])) {
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

// problem 4
// this is not a great solution
const DELIMITER_REGEX = /(-|:|\.\.)/g;

function shorthand(numString) {
  let result = [];
  let omittedNum = 0;
  let ranges = numString.replace(/ /g, '')
                        .split(',')
                        .map(strRange => {
                          return strRange.split(DELIMITER_REGEX)
                                         .filter(str => !DELIMITER_REGEX.test(str))
                        });

  ranges.forEach(range => {
    let firstRangeNum = parseInt(range[0], 10);

    while (firstRangeNum + omittedNum <= result[result.length - 1] &&
           String(firstRangeNum + omittedNum)) {
      omittedNum += 10;
    }

    result.push(firstRangeNum + omittedNum);

    range.forEach((startNum, index) => {
      if (index === range.length - 1) return;

      startNum = parseInt(range[index], 10);
      let lastDigitRegex = new RegExp(`${range[index + 1]}$`)

      let iterator = 0;
      while (!lastDigitRegex.test(String(startNum + iterator + omittedNum))) {
        iterator += 1;
        result.push(startNum + iterator + omittedNum);
      }
    })
  })

  return result;
}

console.log(shorthand("1"))
console.log(shorthand("1, 3, 7, 2, 4, 1")) // 1, 3, 7, 12, 14, 21
console.log(shorthand("1-3, 1-2"))         // 1, 2, 3, 11, 12
console.log(shorthand("1:5:2"))            // 1, 2, 3, 4, 5, 6, ... 12
console.log(shorthand("104-2"))            // 104, 105, ... 112
console.log(shorthand("104-02"))           // 104, 105, ... 202
console.log(shorthand("545, 64:11"))       // 545, 564, 565, .. 611

// problem 5
function encodeRail(decipheredText, numOfRails) {
  decipheredText = decipheredText.toUpperCase().replace(/ /, '');

  if (numOfRails === 1) return decipheredText.split('').join(' ');
  let rails = Array.from(new Array(numOfRails),
                         () =>Array(decipheredText.length).fill('.'));

  let railIndex = 0;
  let letterIndex = 0;
  let indexIncrementor = 1;

  decipheredText.split('').forEach(letter => {
    rails[railIndex][letterIndex] = letter;
    letterIndex += 1;
    railIndex += indexIncrementor;

    if (railIndex >= rails.length) {
      railIndex = rails.length - 2;
      indexIncrementor = -1;
    } else if (railIndex < 0) {
      railIndex = 1;
      indexIncrementor = 1;
    }
  });

  return rails.map(rail => rail.join(' ')).join('\n');
}

console.log(encodeRail('TESTING', 1));
console.log('');
console.log(encodeRail('te sting', 2));
console.log('');
console.log(encodeRail('TESTING', 3));
console.log('');
console.log(encodeRail('TESTING', 4));
console.log('');
console.log(encodeRail('TESTING', 5));
console.log('');
console.log(encodeRail('TESTING', 7));
console.log('');
console.log(encodeRail('TESTING', 10));

function decodeRail(cipheredText) {
  let result = '';
  let cleanedCipheredText = cipheredText.replace(/(\.|\n| )/g, '');
  let rails = cipheredText.replace(/(\.| )/g, '').split('\n').map(str => str.split(''));

  let railIndex = 0;
  let indexIncrementor = 1;

  while (result.length < cleanedCipheredText.length) {
    result = result + rails[railIndex].shift();
    railIndex += indexIncrementor;

    if (railIndex >= rails.length) {
      railIndex = rails.length - 2;
      indexIncrementor = -1;
    } else if (railIndex < 0) {
      railIndex = 1;
      indexIncrementor = 1;
    }
  }

  return result;
}

let text;

// text = 'W . . . E . . . C . . . R . . . L . . . T . . . E\n' +
//         '. E . R . D . S . O . E . E . F . E . A . O . C .\n' +
//         '. . A . . . I . . . V . . . D . . . E . . . N . .'
// console.log(decodeRail(text)); //WEAREDISCOVEREDFLEEATONCE

// text = 'T.S.I.G\n' +
//       '.E.T.N.'
// console.log(decodeRail(text)); //TESTING

text = 'T.....A....\n' +
       '.H...S.T...\n' +
       '..I.I...E.T\n' +
       '...S.....S.'
console.log(decodeRail(text)); //THISISATEST

text = 'T . . . . . .\n' +
       '. E . . . . .\n' +
       '. . S . . . .\n' +
       '. . . T . . .\n' +
       '. . . . I . .\n' +
       '. . . . . N .\n' +
       '. . . . . . G\n' +
       '. . . . . . .\n' +
       '. . . . . . .\n' +
       '. . . . . . .'
console.log(decodeRail(text)); //THISISATEST