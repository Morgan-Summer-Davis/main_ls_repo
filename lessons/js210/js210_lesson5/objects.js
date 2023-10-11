// Practice Problems: Working with Object Properties
function objectHasProperty(obj, prop) {
  return console.log(Object.keys(obj).includes(prop));
}

function incrementProperty(obj, prop) {
  return obj[prop] = obj[prop] + 1 || 1;
}

function copyProperties(source, target) {
  for (let key in source) {
    target[key] = source[key];
  }

  return Object.keys(source).length;
}

function wordCount(str) {
  let output = {};
  for (let word of str.split(' ')) {
    output[word] = output[word] + 1 || 1;
  }

  return output;
}

// Working with the Math Object
let radiansToDegrees = radians => radians * 180 / Math.PI;

console.log(Math.abs(-100));

console.log(Math.sqrt(16777216));

console.log(Math.pow(16, 6));

let a = 50.72;
let b = 49.2;
let c = 49.86;

console.log(Math.floor(a));
console.log(Math.ceil(b));
console.log(Math.round(c));

function rand(num1, num2) {
  let min = Math.min(num1, num2);
  let max = Math.max(num1, num2);

  return Math.round(Math.random() * (max - min) + min);
}

// Working with Dates
let today = new Date();

console.log(`Today's day is ${today.getDay()}.`);

let daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
console.log(`Today's day is ${daysOfWeek[today.getDay()]}.`);

console.log(`Today's day is ${daysOfWeek[today.getDay()]}, the ${today.getDate()}.`);

function dateSuffix(date) {
  let lastDigit = String(date)[String(date).length - 1]

  if (date > 10 && date < 20) return 'th';
  if (lastDigit === '1')      return 'st';
  if (lastDigit === '2')      return 'nd';
  if (lastDigit === '3')      return 'rd';
                              return 'th';
}

console.log("Today's date is " + daysOfWeek[today.getDay()] + ', ' +
                                 today.getMonth() + ' ' +
                                 today.getDate() +
                                 dateSuffix(today.getDate()));

let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

console.log("Today's date is " + daysOfWeek[today.getDay()] + ', ' +
                                 months[today.getMonth()] + ' ' +
                                 today.getDate() +
                                 dateSuffix(today.getDate()));

function formattedMonth(date) {
  return months[date.getMonth()];
}

function formattedDay(date) {
  return daysOfWeek[date.getDay()];
}

function formattedDate(date) {
  return formattedDay(date) + ', ' + formattedMonth(date) + ' ' +
         date.getDate() + dateSuffix(date.getDate());
}

console.log(today.getYear());
console.log(today.getFullYear());

console.log(today.getTime());

let tomorrow = new Date(today.getTime());
tomorrow.setDate(today.getDate() + 1);
console.log(formattedDate(tomorrow));
console.log(formattedDate(today));

let nextWeek = new Date(today.getTime());
console.log(today === nextWeek);

console.log(today.toDateString() === nextWeek.toDateString());
nextWeek.setDate(nextWeek.getDate() + 7);
console.log(today.toDateString() === nextWeek.toDateString());

function formatTime(date) {
  let minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes().toString();
  let hours   = date.getHours()   < 10 ? '0' + date.getHours()   : date.getHours().toString();

  return `${hours}:${minutes}`;
}

let testDate = new Date(1907);
console.log(formatTime(testDate));

// Practice Problem: Welcome Stranger
function greetings(arr, obj) {
  console.log(`Hello, ${arr.join(' ')}! Nice to have a ${obj.title} ${obj.occupation} around.`);
}


// Practice Problem: Repeated Characters
function repeatedCharacters(str) {
  let   output = {};
  const STR_CHARS = str.toLowerCase().split('').sort();

  for (let index in STR_CHARS) {
    index = Number(index);

    if (STR_CHARS[index] === STR_CHARS[index - 1] ||
        STR_CHARS[index] === STR_CHARS[index + 1]) {
          output[STR_CHARS[index]] = output[STR_CHARS[index]] + 1 || 1;
        }
  }

  return output;
}