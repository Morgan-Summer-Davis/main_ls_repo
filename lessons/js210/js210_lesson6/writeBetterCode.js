'use strict';

// JavaScript Style Guide
let title = 'The Three-Body Problem';

let title = 'The Three-Body Problem';
let author = 'Cixin Liu';
let pageCount = 400;

let completed = lastPageRead === 400;

if (finishedBook()) {
  console.log('You have finished reading this book');
}

let read = function read(pages) {
  console.log('You started reading.');

  for (let page = 0; page < pages; page += 1) {
    let message = 'You read page ' + String(page);
    console.log(message);
  }
}

read(400);

// Modern Javascript: Strict Mode
const SUITS = ["Clubs", "Diamonds", "Hearts", "Spades"];
const RANKS = ["2", "3", "4", "5", "6", "7", "8", "9",
         "10", "Jack", "Queen", "King", "Ace"];

function createDeck() {
  let allCards = () => {
    return SUITS.reduce((deck, suit) => {
      RANKS.forEach(rank => deck.push(`${rank} of ${suit}`));
      return deck;
    }, []);
  };

  let deck = allCards();
  shuffle(deck);

  return deck;
}

function shuffle(deck) {
  let randomIndex1, randomIndex2, tempCard;

  for (let counter = 0; counter < 400; counter += 1) {
    randomIndex1 = randomCardIndex();
    randomIndex2 = randomCardIndex();
    tempCard = deck[randomIndex1];
    deck[randomIndex1] = deck[randomIndex2];
    deck[randomIndex2] = tempCard;
  }

  function randomCardIndex() {
    return Math.floor(Math.random() * deck.length);
  }
}

console.log(createDeck());

// Practice Problems: Syntactic Sugar
function foo(bar, qux, baz) {
  return {
    bar: bar,
    baz: baz,
    qux: qux,
  };
}

//
function foo() {
  return {
    bar: function() {
      console.log("bar");
    },
    qux: function(arg1) {
      console.log("qux");
      console.log(arg1);
    },
    baz: function(arg1, arg2) {
      console.log("baz");
      console.log(arg1);
      console.log(arg2);
    },
  };
}

//
function foo(one, two, three) {
  return {
    bar: one,
    baz: two,
    qux: three,
  };
}

let baz = foo(1, 2, 3).baz;
let qux = foo(1, 2, 3).qux
let bar = foo(1, 2, 3).bar

//
function foo(array) {
  return [
    array[2],
    5,
    array[0],
  ];
}

let array = [1, 2, 3];
let result = foo(array);
let bar = result[0];
let qux = result[1];
let baz = result[2];

//
function product(num1, num2, num3) {
  return num1 * num2 * num3;
}

let array = [2, 3, 5];
let result = product(array[0], array[1], array[2]);

//
function product() {
  return Array.from(arguments).reduce((total, number) => total * number);
}

let result = product(2, 3, 4, 5);

//
const { foo, ...rest } = { foo: 42, bar: 3.1415, qux: "abc" };
console.log(foo);         // 42
console.log(rest);        // { bar: 3.1415, qux: 'abc' }

//
const obj = {
  first: "I am the first",
  second: "I am the second",
  third: [1, 2, 3],
  rest: { a: 'a', b: 'b' },
};

const first  = obj.first;
const second = obj.second;
const rest   = { third: obj.third, rest: obj.rest };

//
function qux() {
  let animalType = "cat";
  let age = 9;
  let colors = ["black", "white"];
  return { type: animalType, age, colors };
}

let { type, age, colors } = qux();
console.log(type);    // cat
console.log(age);     // 9
console.log(colors);  // [ 'black', 'white' ]

//
let optional = function optional(first, middle1, middle2, middle3, last) {
  return { first, middle: [middle1, middle2, middle3].sort(), last };
}

obj = optional(...['first', 'second', 'third', 'fourth', 'fifth'])
({ first, middle, last }) = obj;

//