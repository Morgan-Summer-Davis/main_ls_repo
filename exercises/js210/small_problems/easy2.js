// Ddaaiillyy ddoouubbllee
function crunch(str) {
  return str.replaceAll(/(.)\1+/g, '$1');
}


// Bannerizer
function logInBox(str, maxLength) {
  let strArray = [];

  if (maxLength) {
    let iterator = 0
    while (iterator < str.length) {
      console.log(iterator);
      strArray.push(str.slice(iterator, iterator + maxLength));
      iterator += maxLength;
    }
  } else {
    strArray.push(str);
  }

  while (strArray[strArray.length - 1].length < strArray[0].length) {
    strArray[strArray.length - 1] += ' ';
  }

  console.log('+-' + '-'.repeat(strArray[0].length) + '-+');
  console.log('| ' + ' '.repeat(strArray[0].length) + ' |');
  for (let index = 0; index < strArray.length; index++) {
    console.log('| ' + strArray[index]              + ' |');
  }
  console.log('| ' + ' '.repeat(strArray[0].length) + ' |');
  console.log('+-' + '-'.repeat(strArray[0].length) + '-+');
}


// Stringy Strings
function stringy(num) {
  let output = '10'.repeat(Math.floor(num / 2));
  if (num % 2 !== 0) output += '1';

  return output;
}


// Right Triangles
function triangle(num) {
  for (let index = 1; index <= num; index++) {
    console.log(' '.repeat(num - index) + '*'.repeat(index));
  }
}


// Madlibs
const rlSync = require('readline-sync');

function madlib() {
  console.log('Enter a noun:');
  let noun      = rlSync.prompt();
  console.log('Enter a verb:');
  let verb      = rlSync.prompt();
  console.log('Enter an adjective:');
  let adjective = rlSync.prompt();
  console.log('Enter an adverb:')
  let adverb    = rlSync.prompt();

  console.log(`Do you ${verb} your ${adjective} ${noun} ${adverb}? That's hilarious!`)
}


// Double Doubles
function twice(num) {
  if (String(num).slice(0, String(num).length / 2) === String(num).slice(String(num).length / 2)) {
    return num;
  }

  return num * 2;
}


// Grade Book
function getGrade(...grades) {
  let numGrade = grades.reduce((acc, grade) => acc + grade, 0) / grades.length;

  if (numGrade >= 90) {
    return 'A';
  } else if (numGrade >= 80) {
    return 'B';
  } else if (numGrade >= 70) {
    return 'C';
  } else if (numGrade >= 60) {
    return 'D';
  } else {
    return 'F';
  }
}


// Clean Up the Words
function cleanUp(str) {
  return str.replaceAll(/[^a-zA-Z]/g, ' ').replaceAll(/( )\1+/g, ' ');
}


// What Century is That
function century(year) {
  let output = String(Math.ceil(year / 100));

  if (output[output.length - 1] === '1' && output[output.length - 2] !== '1') {
    output += 'st';
  } else if (output[output.length - 1] === '2' && output[output.length - 2] !== '1') {
    output += 'nd';
  } else if (output[output.length - 1] === '3' && output[output.length - 2] !== '1') {
    output += 'rd';
  } else {
    output += 'th';
  }

  console.log(output);
}