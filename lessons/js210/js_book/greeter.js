function getName(prompt) {
  let rlSync = require('readline-sync');
  return rlSync.question(prompt);
}

let firstName = getName("What's your first name? ");
let lastName = getName("What's your last name? ");

console.log(`Hello, ${firstName} ${lastName}!`);