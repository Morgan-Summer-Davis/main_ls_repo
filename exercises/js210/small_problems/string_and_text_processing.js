// Uppercase Check
function isUppercase(string) {
  return string === string.toUpperCase();
}

isUppercase('t');               // false
isUppercase('T');               // true
isUppercase('Four Score');      // false
isUppercase('FOUR SCORE');      // true
isUppercase('4SCORE!');         // true
isUppercase('');                // true


// Delete Vowels
function removeVowels(array) {
  return array.map(string => string.replace(/[aeiouAEIOU]/g, ''));
}

removeVowels(['abcdefghijklmnopqrstuvwxyz']);         // ["bcdfghjklmnpqrstvwxyz"]
removeVowels(['green', 'YELLOW', 'black', 'white']);  // ["grn", "YLLW", "blck", "wht"]
removeVowels(['ABC', 'AEIOU', 'XYZ']);                // ["BC", "", "XYZ"]


// Lettercase Counter
function letterCaseCount(string) {
  return ({
    lowercase: (string.match(/[a-z]/g) || []).length,
    uppercase: (string.match(/[A-Z]/g) || []).length,
    neither:   (string.match(/[^a-zA-Z]/g) || []).length,
  });
}

letterCaseCount('abCdef 123');  // { lowercase: 5, uppercase: 1, neither: 4 }
letterCaseCount('AbCd +Ef');    // { lowercase: 3, uppercase: 3, neither: 2 }
letterCaseCount('123');         // { lowercase: 0, uppercase: 0, neither: 3 }
letterCaseCount('');            // { lowercase: 0, uppercase: 0, neither: 0 }


// Capitalize Words
function wordCap(string) {
  return string.split(/\s/)
               .map(word => word[0].toUpperCase() + word.slice(1).toLowerCase())
               .join(' ');
}

wordCap('four score and seven');       // "Four Score And Seven"
wordCap('the javaScript language');    // "The Javascript Language"
wordCap('this is a "quoted" word');    // 'This Is A "quoted" Word'


// Swap Case
function swapCase(string) {
  return string.split('').map(char => {
    if      (/[a-z]/.test(char)) return char.toUpperCase();
    else if (/[A-Z]/.test(char)) return char.toLowerCase();
    else                         return char;
  }).join('');
}

swapCase('CamelCase');              // "cAMELcASE"
swapCase('Tonight on XYZ-TV');      // "tONIGHT ON xyz-tv"


// Staggered Caps Part 1
function staggeredCase(string) {
  return string.split('').map((char, index) => {
    return index % 2 === 0 ? char.toUpperCase() : char.toLowerCase();
  }).join('');
}

staggeredCase('I Love Launch School!');        // "I LoVe lAuNcH ScHoOl!"
staggeredCase('ALL_CAPS');                     // "AlL_CaPs"
staggeredCase('ignore 77 the 4444 numbers');   // "IgNoRe 77 ThE 4444 nUmBeRs"


// Staggered Caps Part 2
function staggeredCase(string) {
  let upper = true;
  let result = [];

  for (let i = 0; i < string.length; i += 1) {
    if (/[a-z]/gi.test(string[i])) {
      upper ? result.push(string[i].toUpperCase()) : result.push(string[i].toLowerCase());
      upper = !upper;
    } else {
      result.push(string[i]);
    }
  }

  return result.join('');
}


// How Long Are You
function wordLengths(string = '') {
  return string.split(' ')
               .filter(word => word)
               .map(word => word + ' ' + word.length);
}

wordLengths('cow sheep chicken');
// ["cow 3", "sheep 5", "chicken 7"]

wordLengths('baseball hot dogs and apple pie');
// ["baseball 8", "hot 3", "dogs 4", "and 3", "apple 5", "pie 3"]

wordLengths("It ain't easy, is it?");
// ["It 2", "ain't 5", "easy, 5", "is 2", "it? 3"]

wordLengths('Supercalifragilisticexpialidocious');
// ["Supercalifragilisticexpialidocious 34"]

wordLengths('');      // []
wordLengths();        // []


// Search Word Part 1
function searchWord(target, text) {
  return text.toLowerCase().split(' ').filter(word => word === target).length;
}

const text = 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?';

searchWord('sed', text);      // 3
console.log(searchWord('qui', text));      // should return 4, NOT 13)

// Search Word Part 2
function searchWord(target, text) {
  return text.replace(new RegExp(`\\b${target}\\b`, 'gi'), `***${target.toUpperCase()}***`);
}

console.log(searchWord('sed', text));
// returns
// "**SED** ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, **SED** quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, **SED** quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"