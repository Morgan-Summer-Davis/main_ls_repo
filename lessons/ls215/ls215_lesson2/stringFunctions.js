// reverse
function reverse(string) {
  return string.split('').reverse().join('');
}

reverse('hello');                  // returns "olleh"
reverse('The quick brown fox');    // returns "xof nworb kciuq ehT"


// acronym
function acronym(string) {
  return string.split(/[- ]/g).reduce((result, word) => result + word[0], '').toUpperCase();
}

acronym('Portable Network Graphics');                  // "PNG"
acronym('First In, First Out');                        // "FIFO"
acronym('PHP: HyperText Preprocessor');                // "PHP"
acronym('Complementary metal-oxide semiconductor');    // "CMOS"
acronym('Hyper-text Markup Language');                 // "HTML"


// email validation


function isValidEmail(email) {
  return !!email.match(/^[a-zA-Z0-9]+@([a-zA-Z]+\.[a-zA-Z]+)+$/);
}

isValidEmail('Foo@baz.com.ph');          // returns true
isValidEmail('Foo@mx.baz.com.ph');       // returns true
isValidEmail('foo@baz.com');             // returns true
isValidEmail('foo@baz.ph');              // returns true
isValidEmail('HELLO123@baz');            // returns false
isValidEmail('foo.bar@baz.to');          // returns false
isValidEmail('foo@baz.');                // returns false
isValidEmail('foo_bat@baz');             // returns false
isValidEmail('foo@bar.a12');             // returns false
isValidEmail('foo_bar@baz.com');         // returns false
isValidEmail('foo@bar.....com');         // returns false


// matching parentheses
function isBalanced(string) {
  return (string.match(/\(/g) || []).length === (string.match(/\)/g) || []).length &&
         string.indexOf('(') <= string.indexOf(')') &&
         string.lastIndexOf(')') >= string.lastIndexOf('(');
}

isBalanced('What (is) this?');        // true
isBalanced('What is) this?');         // false
isBalanced('What (is this?');         // false
isBalanced('((What) (is this))?');    // true
isBalanced('((What)) (is this))?');   // false
isBalanced('Hey!');                   // true
isBalanced(')Hey!(');                 // false
isBalanced('What ((is))) up(');       // false


// sentiment analysis 1
let textExcerpt = 'To be or not to be-that is the question:\n' +
  'Whether \'tis nobler in the mind to suffer\n' +
  'The slings and arrows of outrageous fortune,\n' +
  'Or to take arms against a sea of troubles,\n' +
  'And, by opposing, end them. To die, to sleep-\n' +
  'No more-and by a sleep to say we end\n' +
  'The heartache and the thousand natural shocks\n' +
  'That flesh is heir to-\'tis a consummation\n' +
  'Devoutly to be wished. To die, to sleep-\n' +
  'To sleep, perchance to dream. Aye, there\'s the rub,\n' +
  'For in that sleep of death what dreams may come,\n' +
  'When we have shuffled off this mortal coil,\n' +
  'Must give us pause. There\'s the respect\n' +
  'That makes calamity of so long life.\n' +
  'For who would bear the whips and scorns of time,\n' +
  'Th\' oppressor\'s wrong, the proud man\'s contumely, [F: poor]\n' +
  'The pangs of despised love, the law’s delay, [F: disprized]\n' +
  'The insolence of office, and the spurns\n' +
  'That patient merit of the unworthy takes,\n' +
  'When he himself might his quietus make\n' +
  'With a bare bodkin? Who would fardels bear, [F: these Fardels]\n' +
  'To grunt and sweat under a weary life,\n' +
  'But that the dread of something after death,\n' +
  'The undiscovered country from whose bourn\n' +
  'No traveler returns, puzzles the will\n' +
  'And makes us rather bear those ills we have\n' +
  'Than fly to others that we know not of?\n' +
  'Thus conscience does make cowards of us all,\n' +
  'And thus the native hue of resolution\n' +
  'Is sicklied o\'er with the pale cast of thought,\n' +
  'And enterprises of great pitch and moment, [F: pith]\n' +
  'With this regard their currents turn awry, [F: away]\n' +
  'And lose the name of action.-Soft you now,\n' +
  'The fair Ophelia.-Nymph, in thy orisons\n' +
  'Be all my sins remembered';

let positiveWords = ['fortune', 'dream', 'love', 'respect', 'patience', 'devout', 'noble', 'resolution'];
let negativeWords = ['die', 'heartache', 'death', 'despise', 'scorn', 'weary', 'trouble', 'oppress'];

function sentiment(text) {
  let words    = text.split(/\b/);
  let posWords = words.filter(word => positiveWords.includes(word));
  let negWords = words.filter(word => negativeWords.includes(word));
  let tone     = 'Neutral';

  if      (posWords.length > negWords.length) tone = 'Positive';
  else if (posWords.length < negWords.length) tone = 'Negative';

  console.log(
    `There are ${posWords.length} positive words in the text.\n` +
    `Positive sentiments: ${posWords.join(', ')}\n\n` +
    `There are ${negWords.length} negative words in the text.\n` +
    `Negative sentiments: ${negWords.join(', ')}\n\n` +
    `The sentiment of the text is ${tone}.`
  )
}

sentiment(textExcerpt);

// console output

// There are 5 positive words in the text.
// Positive sentiments: fortune, dream, respect, love, resolution

// There are 6 negative words in the text.
// Negative sentiments: die, heartache, die, death, weary, death

// The sentiment of the text is Negative.


// sentiment analysis 2
let positiveRegex = /\bfortunes?\b|\bdream(s|t|ed)?\b|love(s|d)?\b|respect(s|ed)?\b|\bpatien(ce|t)?\b|\bdevout(ly)?\b|\bnobler?\b|\bresolut(e|ion)?\b/gi;
let negativeRegex = /\bdie(s|d)?\b|\bheartached?\b|death|despise(s|d)?\b|\bscorn(s|ed)?\b|\bweary\b|\btroubles?\b|\boppress(es|ed|or('s)?)?\b/gi;

function regexSentiment(text) {
  let words    = text.split(/\b/);
  let posWords = words.filter(word => positiveRegex.test(word));
  let negWords = words.filter(word => negativeRegex.test(word));
  let tone     = 'Neutral';

  if      (posWords.length > negWords.length) tone = 'Positive';
  else if (posWords.length < negWords.length) tone = 'Negative';

  console.log(
    `There are ${posWords.length} positive words in the text.\n` +
    `Positive sentiments: ${posWords.join(', ')}\n\n` +
    `There are ${negWords.length} negative words in the text.\n` +
    `Negative sentiments: ${negWords.join(', ')}\n\n` +
    `The sentiment of the text is ${tone}.`
  )
}

regexSentiment(textExcerpt);

// console output

// There are 9 positive type words in the text.
// Positive sentiments: nobler, fortune, devoutly, dream, dreams, respect, love, patient, resolution

// There are 10 negative type words in the text.
// Negative sentiments: troubles, die, heartache, die, death, scorns, oppressor's, despised, weary, death

// The sentiment of the text is Negative.