let apples = 3;
let bananas = 5;
if (apples === bananas) console.log('a message');


bananas = '3';
if (apples === bananas) console.log('a message');


if (apples === bananas) {
  console.log('a message');
} else if (apples == bananas) {
  console.log('same but different')
} else {
  console.log('another message');
}


if (apples === bananas) {
  console.log('a message');
} else {
  if (apples == bananas) {
    console.log('same but different')
  } else {
    console.log('another message');
  }
}


apples = 3;
bananas = 3;
let areEqual = (apples === bananas);
console.log(areEqual);


bananas = undefined;
let eitherOr = (apples || bananas);
console.log(eitherOr);


bananas = 1;
eitherOr = (apples || bananas);
console.log(eitherOr);
eitherOr = (bananas || apples);
console.log(eitherOr);


let lastName = 'Davis';
let familyMessage = lastName === 'Davis' ? "You're part of the family!" : "You're not family."