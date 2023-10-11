//Source: https://ryandej.medium.com/ls216-practice-problems-e68c3df04be4

// Ungroup Data in an Object
/* You volunteered to help out teaching a preschool in your area! You were given
an array of all students and some important data about them, grouped by their
teacher. Create a function that will ungroup every student so you can look at
their details individually.

questions:
Can I assume I will receive only one parameter and that it will be an array?
Can I assume that array will only contain objects?
Can I assume that the objects will always have the keys "teacher" and "data"?
Could the objects contain any other keys? If so, what should be done with those values?
Will the data key always be associated with an array of only student objects?
What is the expected output if the provided array is empty?
Can the provided array be sparse? If so, what should be done with the empty values?
Can the provided array contain non-element properties? If so, what should be done with
  those values?
Can the value associated with the data key in an object be empty, sparse, or have
  non-element properties? If so, what should be done with those values?
Is it possible that any of the objects in the data array could contain a teacher
  key already? If so, what should be done with that value, especially if it differs
  from the outer teacher value?
Does the order of the output array matter?
Does the order of the keys in the objects within that array matter?

algorithm:
Initialize a result variable to an empty array
For each object in the student array
  - If that object has no data key, add the object currently being iterated over
    to the result array
  - Otherwise, begin iterating over the array associated with the data key
      - Add the value associated with the data key to the result array
      - Then, if the class object being iterated over has a teacher key,
        set the value associated to the teacher key of the last item in that
        array to the teacher value in the object being iterated over
Return the result array
*/


function ungroupStudents(studentArray) {
  let results = [];
  studentArray.forEach(schoolClass => {
    if (schoolClass.data === undefined) return results.push(schoolClass);

    schoolClass.data.forEach(student => {
      results.push(student);
      if (schoolClass.teacher) results[results.length - 1].teacher = schoolClass.teacher;
    });
  });

  return results;
}

// console.log(ungroupStudents([{
//   teacher: "Ms. Car",
//   data: [{
//     name: "James",
//     emergencyNumber: "617-771-1082",
//   }, {
//     name: "Alice",
//     allergies: ["nuts", "carrots"],
//   }],
// }, {
//   teacher: "Mr. Lamb",
//   data: [{
//     name: "Aaron",
//     age: 3
//   }]
// }]));

// /*
// [{
//   teacher: "Ms. Car",
//   name: "James",
//   emergencyNumber: "617-771-1082",
// }, {
//   teacher: "Ms. Car",
//   name: "Alice",
//   alergies: ["nuts", "carrots"],
// }, {
//   teacher: "Mr. Lamb",
//   name: "Aaron",
//   age: 3,
// }]
// */

// console.log(ungroupStudents([])); //[]
// console.log(ungroupStudents([{ teacher: 'Ms. Car', data: [] }])); //[]
// console.log(ungroupStudents([{ data: [{ name: "James" }] }])); //[{ name: "James" }]
// console.log(ungroupStudents([{ teacher: 'Ms. Car' }])); //[{ teacher: 'Ms. Car' }]
// console.log(ungroupStudents([{
//   teacher: "Ms. Car",
//   data: [{
//     name: "James",
//     emergencyNumber: "617-771-1082",
//     teacher: "test"
//   }]
// }]));

// /*
// [{
//   teacher: "Ms. Car",
//   name: "James",
//   emergencyNumber: "617-771-1082",
// }]
// */

//00:25:10


//Nearest Chapter
/*
Create a function that returns which chapter is nearest to the page you're on.
If two chapters are equidistant, return the chapter with the higher page number.
*/

/*
questions:
Can I assume that I will always receive exactly two arguments?
Can I assume that the first will be an object and the second will be a positive
  integer?
Can I assume that the object will only contain keys representing chapter names
  and values of positive integers representing page numbers?
Can the object be empty? If so, what is the expected output?
Can two chapters share a page number? If so, what is the expected output?

algorithm:
Initialize an array, distances, to the values of the chapters object
Map that array to be equal to the absolute of the current page number minus that value
Find the index of the last occurance of the minimum value in that array
Return the key from chapters with that index
*/

function nearestChapter(chapters, currentPage) {
  if (Object.keys(chapters).length === 0) return undefined;

  let filteredChapters = {};
  Object.keys(chapters).forEach(chapter => {
    if (!Object.values(filteredChapters).includes(chapters[chapter])) {
      filteredChapters[chapter] = chapters[chapter];
    }
  });

  let distances = Object.values(filteredChapters).map(page => Math.abs(currentPage - page));
  return Object.keys(filteredChapters)[distances.lastIndexOf(Math.min(...distances))];
}

// console.log(nearestChapter({
//   "Chapter 1" : 1,
//   "Chapter 2" : 15,
//   "Chapter 3" : 37
// }, 10)); //"Chapter 2"


// console.log(nearestChapter({
//   "New Beginnings" : 1,
//   "Strange Developments" : 62,
//   "The End?" : 194,
//   "The True Ending" : 460
// }, 200)); //"The End?"


// console.log(nearestChapter({
//   "Chapter 1a" : 1,
//   "Chapter 1b" : 5
// }, 3)); //"Chapter 1b"

// console.log(nearestChapter({}, 3)); //undefined
// console.log(nearestChapter({
//   "Chapter 1a" : 1,
//   "Chapter 1b" : 1
// }, 3)); //"Chapter 1a"

//00:16:19


//Validating a Set in the Set Game
/*
In the game Set, three cards form a set if each of the cards are identical or
completely different for each of the four properties. All three cards must:

Have the same color or different colors.
Have the same number or different numbers.
Have the same shades or different shades.
Have the same shape or different shapes.
The four properties are:

Colors: red, purple, green
Numbers: 1, 2, 3
Shades: empty, lined, full
Shapes: squiggle, oval, diamond
Here, a set is represented by an array containing three cards. Each card is
represented by an object of properties and values. Write a function that determines
whether three cards constitute a valid set.
*/

/*
Can I assume I will always receive exactly one argument and that it will be an array?
Can that array contain any non-object values? If so, what should be done with them?
Will the array always have three elements? If not, what would the expected output be
  if it has fewer? If it has more?
Can the array be sparse? If so, what should be done with the empty elements?
Can the array have non-element properties? If so, what should be done with them?
Will the objects in the array always have the keys color, number, shade, and shape?
  If not, how should elements that don't contain one or more of those be treated?
Can the objects contain other keys? If so, what should be done with their respective
  values?
Can the given keys have values not listed above (ie, a shape of "heart")? If so,
  how should those be handled?
Will the color, shade, and shape keys always be associated with a string value?
  Will the number key always be associated wiith an integer? If not, how should
  exceptions be handled?
Are the keys or values in the objects case-sensitive?

algorithm:
Initialize constants to the valid colors, numbers, shades, and shapes, and properties
Initialize variables colors, numbers, shades, and shapes to empty arrays
Begin iterating through the cards
  - Begin iterating through their keys
  - If the key isn't in the PROPERTIES constant, return undefined
  - Else, if the value isn't a valid value, return undefined
  - Else, add the associated value in the card to the appropriate array
If all of the arrays are unique or homogenous, return true, otherwise false
*/

const PROPERTIES = {
  color: ['red', 'purple', 'green'],
  number: ['1', '2', '3'],
  shade: ['empty', 'lined', 'full'],
  shape: ['squiggle', 'oval', 'diamond'],
};

function isSet(cards) {
  if (cards.length < 3) return false;

  let [ color, number, shade, shape ] = [ [], [], [], [] ];
  for (let i = 0; i < cards.length; i += 1) {
    let card = cards[i];
    for (let j = 0; j < Object.keys(card).length; j += 1) {
      let key = Object.keys(card)[j];
      if (!Object.keys(PROPERTIES).includes(String(key).toLowerCase()) ||
          !PROPERTIES[String(key).toLowerCase()].includes(String(card[key]))) {
        return undefined;
      }

      if (card[key] !== undefined) eval(key).push(String(card[key]));
    }
  }

  let properties = [ color, number, shade, shape ];
  for (let i = 0; i < properties.length; i += 1) {
    let tallies = {};
    for (let j = 0; j < properties[i].length; j += 1) {
      tallies[properties[i][j]] = tallies[properties[i][j]] + 1 || 1;
    }

    if ((Object.values(tallies).length < 3 &&
        Math.max(...Object.values(tallies)) < 3) &&
        Object.values(tallies).reduce((a, b) => a + b, 0) >= 3) {
      return false;
    }
  }

  return true;
}

// console.log(isSet([
//   { color: "green", number: 1, shade: "empty", shape: "squiggle" },
//   { color: "green", number: 2, shade: "empty", shape: "diamond" },
//   { color: "green", number: 3, shade: "empty", shape: "oval" }
// ])); //true

// console.log(isSet([
//   { color: "purple", number: 1, shade: "full", shape: "oval" },
//   { color: "green", number: 1, shade: "full", shape: "oval" },
//   { color: "red", number: 1, shade: "full", shape: "oval" }
// ])); //true

// console.log(isSet([
//   { color: "purple", number: 3, shade: "full", shape: "oval" },
//   { color: "green", number: 1, shade: "full", shape: "oval" },
//   { color: "red", number: 3, shade: "full", shape: "oval" }
// ])); //false

// console.log(isSet([])); //false

// console.log(isSet([
//   { color: "purple", number: 3, shade: "full", shape: "oval" },
//   { color: "green", number: 1, shade: "full", shape: "oval" },
// ])); //false

// console.log(isSet([
//   { color: "purple", number: 3, shade: "full", shape: "oval" },
//   { color: "green", number: 1, shade: "full", shape: "oval" },
//   { color: "red", number: 3, shade: "full", shape: "oval" },
//   { color: "green", number: 3, shade: "full", shape: "oval" },
// ])); //true

// console.log(isSet([
//   { color: "purple", number: 3, shade: "full" },
//   { color: "green", number: 1, shade: "full", shape: "oval" },
//   { color: "red", number: 2, shade: "full", shape: "oval" }
// ])); //true

// console.log(isSet([
//   { color: "purple" },
//   { color: "green" },
//   { color: "red" }
// ])); //true

// console.log(isSet([
//   { },
//   { },
//   { }
// ])); //true

// console.log(isSet([
//   { color: "cyan", number: 1, shade: "full", shape: "oval" },
//   { color: "green", number: 1, shade: "full", shape: "oval" },
//   { color: "red", number: 1, shade: "full", shape: "oval" }
// ])); //undefined

// console.log(isSet([
//   { color: "purple", number: 1, shade: "full", shape: "oval", cardstock: "heavy" },
//   { color: "green", number: 1, shade: "full", shape: "oval", cardstock: "light" },
//   { color: "red", number: 1, shade: "full", shape: "oval", cardstock: "medium" }
// ])); //undefined

// console.log(isSet([
//   { color: "purple", number: 1, shade: "full", shape: "oval" },
//   { color: "green", number: 1, shade: "full", shape: "oval", cardstock: "light" },
//   { color: "red", number: 1, shade: "full", shape: "oval" }
// ])); //undefined

// console.log(isSet([
//   { color: "purple", number: '1', shade: "full", shape: "oval" },
//   { color: "green", number: '1', shade: "full", shape: "oval" },
//   { color: "red", number: 1, shade: "full", shape: "oval" }
// ])); //true

//01:07:44


//Combine Two Objects Into One, Summing Like Values
/*
Take two objects with similar key values and combine them into a new object
summing any values that belong to the same category.

There's a married couple, Hank and his spouse Sheila. Hank works at a power plant
making $70,000 a year, and Sheila is a teacher making $40,000 a year. They both
earn rental income from separate rental properties, Hank will get $12,000 and
Sheila $10,000. The new object will show their separate income but combine the
rental income because it fits the same category.
*/

/*
questions:
Can I assume I will receive exactly two arguments and that they will be objects?
Can I assume that the values of the object will all be numeric? If not, what should
  be done with non-numeric values?
Can any numbers in the objects be NaN? If so, how should they be handled?
Can either passed object be empty? If so, how should it be handled? In that case,
  should effectively just the other object be returned?
Should keys be case-sensitive? Does the output need to be in a specific case?
If keys are case-insensitive, might there be keys that are identical when ignoring
  case (ie, { example: 1, eXaMpLe: 2 }) and if so, how should those be handled?
Can the objects be mutated during the function's execution?

algorithm:
Initialize a results variable to an empty object
Initialize a variable for each object to its values, and empty object for both
  - Sort those value arrays by type
  - Sort the numbers in that array by value
  - Iterate through the sorted values array
    - Find the first entry in the original object with a value that matches the
      value being iterated over
        - Add that key-value pair to the empty object, then delete that key from
          the original object
Begin iterating through the keys of the first sorted object
  - If they're both numbers, set the results object value at the associated key to their sum
  - If one of them is a string, set two values in the result object: one as "key1" to the first
    value and "key2" to the second
  - If one is undefined, set the value at that key to the other
*/

function combineIncome(user1Income, user2Income) {
  let results = {};

  Object.keys(user1Income).forEach(key => {
    let types = [ typeof caseInsensitiveAccess(user1Income, key),
                  typeof caseInsensitiveAccess(user2Income, key) ];
    if (types.includes('string') && !types.includes('undefined')) {
      results[key + '1'] = user1Income[key];
    } else {
      results[key] = user1Income[key];
    }
  });

  Object.keys(user2Income).forEach(key => {
    let types = [ typeof caseInsensitiveAccess(user1Income, key),
                  typeof caseInsensitiveAccess(user2Income, key) ];
    if (types.includes('string') && !types.includes('undefined')) {
      results[key + '2'] = user2Income[key];
    } else {
      if (caseInsensitiveAccess(results, key) === undefined) {
        results[findAssociatedKey(results, key) || key] = user2Income[key];
      } else if (user2Income[key] !== undefined) {
        results[findAssociatedKey(user1Income, key)] += user2Income[key];
      }
    }
  });

  return createSortedIncomeObject(results);
}

function createSortedIncomeObject(unsortedIncome) {
  unsortedIncome = Object.keys(unsortedIncome).sort().reduce((object, key) => {
    object[key] = unsortedIncome[key];
    return object;
  }, {});

  let values = sortIncomeValues(Object.values(unsortedIncome));
  let results = {};

  values.forEach(value => {
    let index = Object.values(unsortedIncome).findIndex(i => i === value);
    results[Object.keys(unsortedIncome)[index]] = value;
    delete unsortedIncome[Object.keys(unsortedIncome)[index]];
  });

  return results;
}

function sortIncomeValues(income) {
  return income.sort((a, b) => (typeof a).charCodeAt(0) - (typeof b).charCodeAt(0))
               .sort((a, b) => {
                  let numTypes = ['number', 'bigint'];
                  if (numTypes.includes(typeof a) && numTypes.includes(typeof b)) {
                    return (Number(b) - Number(a));
                  } else {
                    return 0;
                  }
                });
}

function caseInsensitiveAccess(object, targetKey) {
  return object[Object.keys(object).find(key => key.toLowerCase() === targetKey.toLowerCase())];
}

function findAssociatedKey(object, targetKey) {
  return Object.keys(object).find(key => key.toLowerCase() === targetKey.toLowerCase());
}

const user1 = {
  inheritance: "a ton",
  powerPlant: 70000n,
  Rental: 12000,
  savings: undefined,
  collectibles: 70000,
  debt: 'so much',
  test: 'test',
}

const user2 = {
  teaching: 40000,
  rental: 10000,
  inherItance: "a little",
  debt: -1000,
  test: undefined
}

// console.log(combineIncome(user1, user2));

/*{
  powerPlant: 70000n,
  collectibles: 70000,
  teaching: 40000,
  Rental: 22000,
  debt2: -1000
  debt1: 'so much',
  inheritance2: 'a little',
  inheritance1: 'a ton',
  test: 'test',
  savings: undefined,
}*/

//Multiple sessions so who tf knows, but over an hour, maybe over two.


// Get Notes Distribution
/*
Create a function that takes an array of students and returns an object
representing their notes distribution. Keep in mind that all invalid notes should
not be counted in the distribution. Valid notes are: 1, 2, 3, 4, 5
*/

/*
questions:
Can I assume I will receive exactly one argument and that it will be an array?
Can that array be sparse, empty, or have non-element properties? If so, how should
  the data associated with those edge cases be handled?
Can I assume that array will only contain non-array objects?
Will any non-array objects in that array have both the name and notes keys? Might
  they have any additional keys?
Can I assume that if they do have a notes key that the associated value will be
  an array?
Can I assume that if it's an array, it will only contain numbers?
If it's an array, can it be sparse, empty, or have non-element properties?
  How should the data associated with those edge cases be handled if yes?
Are only numeric values valid notes? Ie, are string equivalents of those values
  valid?
Does the order of the keys in the returned object matter?

algorithm:
Initialize a results variable to an empty object.
Begin iterating through the student objects
  - If that object's data key returns a valid number, increment that key in the
    result object by 1
  - Else, if it returns an array, begin iterating through it
    - If the current element is a valid number, increment that key in the result
      object by 1
Return the object
*/

const VALID_NOTES = [1, 2, 3, 4, 5, '1', '2', '3', '4', '5'];

function getNotesDistribution(students) {
  let results = {};

  students.forEach(student => {
    if (VALID_NOTES.includes(student.notes)) {
      results[student.notes] = results[student.notes] + 1 || 1;
    } else if (Array.isArray(student.notes)) {
      student.notes.forEach(note => {
        if (VALID_NOTES.includes(note)) results[note] = results[note] + 1 || 1;
      });
    }
  });

  return Object.keys(results).sort().reverse().reduce((object, key) => {
    console.log(object);
    object[key] = results[key];
    return object;
  }, {}); // Theoretically, this would sort the object keys, but Node orders
          // numeric keys in ascending order when printing, regardless of their
          // actual order
}

// console.log(getNotesDistribution([
//   {
//     "name": "Steve",
//     "notes": [5, 5, 3, -1, 6]
//   },
//   {
//     "name": "John",
//     "notes": [3, 2, 5, 0, -3]
//   }
// ]));
// /*{
//   5: 3,
//   3: 2,
//   2: 1
// }*/

// console.log(getNotesDistribution([{ "notes": [] }])); //{}
// console.log(getNotesDistribution([{}])); //{}
// console.log(getNotesDistribution([])); //{}
// console.log(getNotesDistribution([{ "notes": 0 }])); //{}

// console.log(getNotesDistribution([{ "notes": 2 }])); //{ 2: 1 }
// console.log(getNotesDistribution([{ "notes": 2 }, { notes: [] }])); //{ 2: 1 }
// console.log(getNotesDistribution([{ "notes": 2 }, { notes: 2 }])); //{ 2: 2 }
// console.log(getNotesDistribution([{ "notes": 2 }, { notes: [2] }])); //{ 2: 2 }
// console.log(getNotesDistribution([{ "notes": [3] }])); //{ 3: 1 }
// console.log(getNotesDistribution([{ "notes": 3, test: 3 }])); //{ 3: 1 }
// console.log(getNotesDistribution([{ "notes": '2' }, { notes: 2 }])); //{ 2: 2 }

//00:17:39


// Area of Overlapping Rectangles
/*
Create a function that returns the area of the overlap between two rectangles.
The function will receive two rectangles, each with the coordinates of two of its
opposite angles.
*/

/*
Can I assume I will receive exactly two arguments and that they will both be arrays?
Can either of those arrays be sparse, empty, or have non-element properties? If
  so, what is the expected output in relation to those qualities?
Will both arrays be guaranteed to have two elements? Will those elements always be
  non-array objects?
If they are non-array objects, are they guaranteed to have an x key and a y key?
Are the given rectangles guaranteed to overlap? If not, what would the expected
  output for two non-intersecting rectangles?
In all given examples, the first array has a lesser x and a less y value than the
  second. Is that guaranteed?

algorithm:
Initialize a rect1XCoords to the x values of the first array and rect1XCoords to the second
  (or zero if they're missing)
Do the same for y values
Sort those arrays
Initialize an overlap variable to the lesser of the max X variables minus the greater
  of the min X variables times the lesser of the max Y variables minus the greater
  of the max Y variables
Return that number or 0 if that number is less than 0
*/

function overlappingRectangles(rect1, rect2) {
  rect1[0] = rect1[0] || [];
  rect1[1] = rect1[1] || [];
  rect2[0] = rect2[0] || [];
  rect2[1] = rect2[1] || [];

  let rect1XCoords = rect1.map(corner => (corner.x || corner[0]) || 0).sort((a, b) => a - b);
  let rect2XCoords = rect2.map(corner => (corner.x || corner[0]) || 0).sort((a, b) => a - b);
  let rect1YCoords = rect1.map(corner => (corner.y || corner[1]) || 0).sort((a, b) => a - b);
  let rect2YCoords = rect2.map(corner => (corner.y || corner[1]) || 0).sort((a, b) => a - b);

  if (Math.min(rect1XCoords[1], rect2XCoords[1]) -
      Math.max(rect1XCoords[0], rect2XCoords[0]) < 0 &&
      Math.min(rect1YCoords[1], rect2YCoords[1]) -
      Math.max(rect1YCoords[0], rect2YCoords[0]) < 0) {
    return 0;
  }

  let overlap = (Math.min(rect1XCoords[1], rect2XCoords[1]) -
                 Math.max(rect1XCoords[0], rect2XCoords[0])) *
                (Math.min(rect1YCoords[1], rect2YCoords[1]) -
                 Math.max(rect1YCoords[0], rect2YCoords[0]))

  return overlap <= 0 ? 0 : overlap;
}

// console.log(overlappingRectangles(
//   [{ x: 0, y: 0 }, { x: 1, y: 1 }],
//   [{ x: 2, y: 2 }, { x: 3, y: 3 }]
// )); //0

// console.log(overlappingRectangles(
//   [{ x: 2, y: 1 }, { x: 5, y: 5 }],
//   [{ x: 3, y: 2 }, { x: 5, y: 7 }]
// )); //6

// console.log(overlappingRectangles(
//   [{ x: 2, y: -9 }, { x: 13, y: -4 }],
//   [{ x: 5, y: -11 }, { x: 7, y: -2 }]
// )); //10

// console.log(overlappingRectangles(
//   [{ x: -8, y: -7 }, { x: -4, y: 0 }],
//   [{ x: -5, y: -9 }, { x: -1, y: -2 }]
// )); //5

// console.log(overlappingRectangles(
//   [{ x: -4, y: 0 }, { x: -8, y: -7 }],
//   [{ x: -5, y: -9 }, { x: -1, y: -2 }]
// )); //5

// console.log(overlappingRectangles(
//   [[-4, 0 ], [-8, -7]],
//   [{ x: -5, y: -9 }, { x: -1, y: -2 }]
// )); //5

// console.log(overlappingRectangles(
//   [{ x: -8, y: -7 }, { x: -4 }],
//   [{ x: -5, y: -9 }, { x: -1, y: -2 }]
// )); //5

// console.log(overlappingRectangles(
//   [{ x: -8, y: -7 }, [-4]],
//   [{ x: -5, y: -9 }, { x: -1, y: -2 }]
// )); //5

// console.log(overlappingRectangles(
//   [{ x: -8, y: -7 }],
//   [{ x: -5, y: -9 }, { x: -1, y: -2 }]
// )); //20

// console.log(overlappingRectangles([], [])); //0
// console.log(overlappingRectangles([{ x: -8, y: -7 }, { x: -4, y: 0 }], [])); //0

//00:42:48


// Premier League Champions
/*
Create a function that takes an array of football clubs with properties: name,
wins, loss, draws, scored, conceded, and returns the team name with the highest
number of points. If two teams have the same number of points, return the team
with the largest goal difference.
*/

/*
questions:
Can I assume that I will receive exactly one argument and that it will be an array?
Can that array be empty, sparse, or have non-element properties? If so, what
  should be done with that respective quality?
Will the array only contain non-array objects?
Will those objects always contain the keys name, wins, loss, draws, scored, and conceded?
  If not, how should that be handled?
Will they ever contain additional keys? If so, what (if anything) should be done
  with those values?
Will the name key always point to a string value? Will the other named keys always
  point to integers?
What should be done if two teams have the same number of points and goal differential?
How are points calculated? 3 per win, 1 per tie?
Can teams share a name value? If so, how should that be handled? Are names considered
  shared if they're equal case-insensitively, or only when they are exactly the same?

algorithm:
Filter the passed teams variable to only teams who have the highest score
If that array has a length of one, return the name of that element
Else, further filter that array by their respective scored - conceded values (to
  only teams that have the highest differential)
If that array has a length of one, return the name of that element
Else, return "The winner is contested"
*/

function champions(teams) {
  let nameTallies = {};

  teams = teams.map(team => {
    nameTallies[team.name] = nameTallies[team.name] + 1 || 1;
    if (teams.map(i => i.name).filter(name => name === team.name).length > 1) {
      return Object.keys(team).reduce((object, key) => {
        if (key === 'name') object[key] = team[key] + ` (${nameTallies[team[key]]})`;
        else                object[key] = team[key];

        return object;
      }, {});
    }

    return team;
  });

  let maxScore  = Math.max(...teams.map(team => team.wins * 3 + team.draws));
  let bestTeams = teams.filter(team => team.wins * 3 + team.draws === maxScore)
  if (bestTeams.length === 1) return bestTeams[0].name;

  let maxDiff = Math.max(...bestTeams.map(team => team.scored - team.conceded));
  bestTeams   = bestTeams.filter(team => team.scored - team.conceded === maxDiff);
  if (bestTeams.length === 1) return bestTeams[0].name;

  return "The winner is contested";
}

// console.log(champions([
//   {
//     name: "Manchester United",
//     wins: 30,
//     loss: 3,
//     draws: 5,
//     scored: 88,
//     conceded: 20,
//   },
//   {
//     name: "Arsenal",
//     wins: 24,
//     loss: 6,
//     draws: 8,
//     scored: 98,
//     conceded: 29,
//   },
//   {
//     name: "Chelsea",
//     wins: 22,
//     loss: 8,
//     draws: 8,
//     scored: 98,
//     conceded: 29,
//   },
// ])); //"Manchester United"

// console.log(champions([
//   {
//     name: "Manchester United",
//     wins: 30,
//     loss: 3,
//     draws: 5,
//     scored: 88,
//     conceded: 20,
//   },
//   {
//     name: "Chelsea",
//     wins: 30,
//     loss: 3,
//     draws: 5,
//     scored: 88,
//     conceded: 20,
//   },
// ])); //"The winner is contested"

// console.log(champions([])); //"The winner is contested"

// console.log(champions([
//   {
//     name: "Manchester United",
//     wins: 30,
//     loss: 3,
//     draws: 5,
//     scored: 88,
//     conceded: 20,
//   },
//   {
//     name: "Manchester United",
//     wins: 0,
//     loss: 3,
//     draws: 5,
//     scored: 88,
//     conceded: 20,
//   },
// ])); //"Manchester United (1)"

// console.log(champions([
//   {
//     name: "Manchester United",
//     wins: 30,
//     loss: 3,
//     draws: 5,
//     scored: 88,
//     conceded: 20,
//   },
//   {
//     name: "Manchester United",
//     wins: 60,
//     loss: 3,
//     draws: 5,
//     scored: 88,
//     conceded: 20,
//   },
// ])); //"Manchester United (2)"

//00:39:44


// Splitting Objects Inside an Array
/*
You bought a few bunches of fruit over the weekend. Create a function that splits
a bunch into singular objects inside an array.
*/

/*
questions:
Can I assume that I will receive exactly one argument and that it will be an array?
Can that array be empty, sparse, or have non-element properties? If so, what
  should be done with the data respective to each situation?
Can I assume that the array will contain only non-array objects?
Will non-array objects that do appear in the array always have a name key that
  points to a string and a quantity key that points to a positive integer?
If the quantity of an entry is 0, what should the expected output be?
Can the objects have other keys? If so, what should be done with the data stored
  in those keys?
Can arrays in the argument array have more than two elements? If so, what should
  be done with those entries? What about less?
Can arrays that appear in the argument array be empty, sparse, or have non-element
  properties?
Can quantity have a value of Infinity? If so, what is the expected output?
If the results of the function has only one element, should the return be an object
  or a single-element array?
Can the array or any of the objects be mutated in the execution of the function?

algorithm:
Initialize a results variable to an empty array.
Begin iterating through the elements of the passed argument
  - If it's a non-array object:
    - If the quantity is 0 or undefined, skip it
    - Else, copy that element into the results array, then set the quantity of
      the last element in that array to 1. Repeat this x times, where x is the
      original quantity
  - If it's an array:
    - If the second element is 0 or undefined, skip it
    - Else, create an object with name equal to the first element and quantity of
      1 as the last element of the results array. Do this x times, where x is the
      second element in the array
  - If it's a string:
    - Create an object with name equal to that string and quantity of 1 as the last
      element of the results array
Return the resulsts array.
*/

function splitBunches(ingredients) {
  let results = [];
  ingredients.forEach(ingredient => {
    if (typeof ingredient === 'object' && ingredient !== null) {
      if (Array.isArray(ingredient)) {
        for (let i = 0; i < ingredient[1]; i += 1) {
          results[results.length] = { name: ingredient[0], quantity: 1 };
        }
      } else {
        for (let i = 0; i < ingredient.quantity; i += 1) {
          results[results.length] = {};
          Object.keys(ingredient).forEach(key => {
            if (key === 'quantity') results[results.length - 1][key] = 1;
            else                    results[results.length - 1][key] = ingredient[key];
          });
        }
      }
    } else if (typeof ingredient === 'string') {
      results[results.length] = { name: ingredient, quantity: 1 };
    }
  });

  return results;
}

// console.log(splitBunches([
//   { name: "grapes", quantity: 2 }
// ])); /*[
//   { name: "grapes", quantity: 1 },
//   { name: "grapes", quantity: 1 }
// ]*/


// console.log(splitBunches([
//   { name: "currants", quantity: 1 },
//   { name: "grapes", quantity: 2 },
//   { name: "bananas", quantity: 2 }
// ])); /*[
//   { name: "currants", quantity: 1},
//   { name: "grapes", quantity: 1 },
//   { name: "grapes", quantity: 1 },
//   { name: "bananas", quantity: 1 },
//   { name: "bananas", quantity: 1 }
// ]*/

// console.log(splitBunches([])); //[]
// console.log(splitBunches(['grapes'])); //[ { name: "grapes", quantity: 1 } ]
// console.log(splitBunches([['grapes', 2]]));/*[ { name: "grapes", quantity: 1 },
//                                 { name: "grapes", quantity: 1 } ] */
// console.log(splitBunches([{ name: "grapes", quantity: 0 }]));//[]
// console.log(splitBunches([{ name: "grapes", quantity: 1, test: 'test' }]));//[ { name: "grapes", quantity: 1, test: 'test' } ]

// let test = { name: "grapes", quantity: 6 }
// splitBunches([test])
// console.log(test);//{ name: "grapes", quantity: 6 }

//00:25:00


// Standard Competition Ranking
/*
Standard competition ranking (also known as "1224" ranking) assigns the same rank
to matching values. Rank numbers are increased each time, so ranks are sometimes
skipped. If we have 5 scores (the highest score having a rank of 1):
No matching values:

Scores = [99, 98, 97, 96, 95]
Rank = 1,  2,  3,  4,  5
With matching values:

Scores = [99, 98, 98, 96, 95]
Rank = 1,  2,  2,  4,  5

// Second and third scores are equal, so rank "3" is skipped.

Given an object containing the names and scores of 5 competitors, and a competitor
name, return the rank of that competitor after applying competition ranking.
*/

/*
questions:
Can I assume that I will receive exactly two arguments and that they will be a
  non-array object and a string?
Can I assume that that string will be a key in the object? If no, what would the
  expected output be?
Can I assume that the object will have at least five entries? Can I assume that
  each entry will be a name pointing to a number?
Can any of the values in the object be NaN? If so, how should that be handled?
Can any of them be Infinity or -Infinity? If so, how should infinities be compared?
Should searching for the second argumnent in the first be case-sensitive?
Can the object be mutated over the course of the function's execution?

algorithm:
Create a helper function to search an object case-insensitively
  - Create a variable equal to {}
  - Begin iterating through the passed object's keys
  - Set the downcased version of that key in the new variable equal to the relevant value
  - Search for the downcased version of the string argument and return the associated value

Initialize a rankings variable to a copy of the competitors object
Sort the rankings object by its values, highest to lowest
Initialize a lastEntry variable to '' and a ranking variable to 1
Begin iterating over rankings's keys
  - Set the value at that entry to the ranking variable
  - If the value the competitors object associated with the current key is not equal
    to the one associated with the lastEntry key, increment ranking by 1
  - Store the key in lastEntry
Search the rankings object using the helper function and return the result
*/

function competition_rank(competitors, targetCompetitor) {
  let rankings  = Object.fromEntries(Object.entries(competitors).sort((a, b) => b[1] - a[1]));
  let lastEntry = '';
  let ranking   = 1;

  Object.keys(rankings).forEach(key => {
    rankings[key] = ranking;
    if (competitors[key] !== competitors[lastEntry]) ranking++;
    lastEntry = key;
  });

  return caseInsensitiveObjectSearch(rankings, targetCompetitor) || -1;
}

function caseInsensitiveObjectSearch(object, key) {
  let processed = {};
  Object.keys(object).forEach(key => processed[key.toLowerCase()] = object[key]);
  return processed[key.toLowerCase()];
}

// console.log(competition_rank({
//   George: 96,
//   Emily: 95,
//   Susan: 93,
//   Brett: 82,
//   Jane: 89,
// }, "Jane") === 4);

// console.log(competition_rank({
//   Kate: 92,
//   Carol: 92,
//   Jess: 87,
//   Bruce: 87,
//   Scott: 84
// }, "Bruce") === 3);

// console.log(competition_rank({
//   George: 96,
//   Emily: 95,
//   Susan: 93,
//   Jane: 89,
//   Brett: 82
// }, "test") === -1);

// console.log(competition_rank({
//   George: 96,
//   Emily: 95,
//   Susan: 93,
//   Jane: 89,
//   Brett: 82
// }, "jane") === 4);

// let test = {
//   George: 96,
//   Emily: 95,
//   Susan: 93,
//   Jane: 89,
//   Brett: 82
// };

// competition_rank({
//   George: 96,
//   Emily: 95,
//   Susan: 93,
//   Jane: 89,
//   Brett: 82
// }, "Jane");

// console.log(test);/*{
//   George: 96,
//   Emily: 95,
//   Susan: 93,
//   Jane: 89,
//   Brett: 82
// };*/

//00:27:01


// Simplify an Object by Two Properties
/*
You were tasked with making a list of every makeup item your local pharmacy had
in stock. You created a very long array of each item, with each element having
both a name and brand property. Now you're looking to simplify the list by
combining duplicate items, and adding a count property to everything.
*/

/*
questions:
Can I assume I will receive exactly one argument and that it will be an array?
Can that array be empty, sparse, or contain non-element properties? If so,
  what should be done with the data respective to that edge case?
Can the array contain anything other than non-array objects? If so, what should
  be done with those entries?
Will the objects always have the brand and name keys? Can they contain other keys?
  If so, what should be done with those other values?
Are the values of the objects compared case-sensitively?
If the output has only one object, should it be returned as a single object or as
  a one-element array?
Does the order of the output object?
Can the array or objects be mutated in the execution of the function?
Can the objects in the passed array already have a count key? If so, how should
  that be handled?
Does the order of the keys in the output objects matter?

algorithm:
Create a helper function to compare objects based on their values
  - Create a new variable for each object, set to {}
  - Begin iterating through the empty object's respective parameter's keys, setting
    the downcase of the key to the downcase of its sibling key's value
  - Do this for both objects
Return if the brand value and name value are the same between the objects

Initialize a results variable to an empty array
Begin iterating through the array argument
  - If the results array has a makeup object equal to the current object, increment
    its count by the current objects count or 1
    - Begin iterating through the current object's keys
      - If the object in the results array does not contain the key, set that key
        in the output object to the current object's associated value
  - Else, push a copy of the current object into the results array and if the
    current object has no count key, set it to 1
Return the results array
*/

function simplifyList(makeupArray) {
  let results = [];

  makeupArray.forEach(obj => {
    let downcaseObj = {};
    Object.keys(obj).forEach(key => {
      downcaseObj[key.toLowerCase()] = obj[key];
    });

    if (!downcaseObj.name || !downcaseObj.brand) return;

    let result = results.find(result => compareMakeupObjects(result, obj));
    if (result) {
      Object.keys(obj).forEach(key => {
        if (!caseInsensitiveObjectLookup(result, key)) result[key] = obj[key]
      });
    } else {
      results.push( { brand: downcaseObj.brand, name: downcaseObj.name } );
      result = results[results.length - 1];
    }

    if (!result.count) result.count = 0;
    result.count += downcaseObj.count || 1;

    Object.keys(obj).forEach(key => {
      if (!caseInsensitiveObjectLookup(result, key) && key.toLowerCase() !== 'count') {
        result[key] = obj[key];
      }
    });
  });

  return results;
}

function compareMakeupObjects(obj1, obj2) {
  let [ downcaseObj1, downcaseObj2 ] = [ {}, {} ];

  Object.keys(obj1).forEach(key => {
    downcaseObj1[key.toLowerCase()] = String(obj1[key]).toLowerCase();
  });

  Object.keys(obj2).forEach(key => {
    downcaseObj2[key.toLowerCase()] = String(obj2[key]).toLowerCase();
  });

  return (downcaseObj1.brand === downcaseObj2.brand &&
          downcaseObj1.name === downcaseObj2.name);
}

function caseInsensitiveObjectLookup(object, key) {
  let processedObject = {};

  Object.keys(object).forEach(key => {
    processedObject[key.toLowerCase()] = String(object[key]).toLowerCase();
  });

  return processedObject[key.toLowerCase()];
}

// console.log(simplifyList([
//   { brand: "NARS", name: "Cosmetics Voyageur Pallete" },
//   { brand: "NARS", name: "Cosmetics Voyageur Pallete" },
//   { brand: "Urban Decay", name: "Naked Honey Pallete" },
//   { brand: "Stila", name: "Stay All Day Liquid Lipstick" },
//   { brand: "Stila", name: "Stay All Day Liquid Lipstick" },
//   { brand: "Stila", name: "Stay All Day Liquid Lipstick" }
// ])); /*[
//   { brand: "NARS", name: "Cosmetics Voyageur Pallete", count: 2 },
//   { brand: "Urban Decay", name: "Naked Honey Pallete", count: 1 },
//   { brand: "Stila", name: "Stay All Day Liquid Lipstick", count: 3 }
// ]*/

// console.log(simplifyList([])); //[]
// console.log(simplifyList([{ brand: "NARS" } ])); //[]

// console.log(simplifyList([
//   { brand: "NARS", name: "Cosmetics Voyageur Pallete" },
//   { brand: "nars", name: "Cosmetics Voyageur Pallete" },
// ])); //[ { brand: "NARS", name: "Cosmetics Voyageur Pallete", count: 2 } ]

// console.log(simplifyList([
//   { brand: "NARS", name: "Cosmetics Voyageur Pallete" },
//   { brand: "NARS", name: "Cosmetics Voyageur Pallete", count: 3 },
// ])); //[ { brand: "NARS", name: "Cosmetics Voyageur Pallete", count: 4 } ]

// console.log(simplifyList([
//   { brand: "NARS", name: "Cosmetics Voyageur Pallete" },
//   { BRAND: "NARS", name: "Cosmetics Voyageur Pallete" },
// ])); //[ { brand: "NARS", name: "Cosmetics Voyageur Pallete", count: 2 } ]

// console.log(simplifyList([
//   { brand: "NARS", name: "Cosmetics Voyageur Pallete", test: 'test' },
//   { brand: "NARS", name: "Cosmetics Voyageur Pallete", test2: 'test2' },
// ])); //[ { brand: "NARS", name: "Cosmetics Voyageur Pallete", count: 2, test: 'test', test2: 'test2' } ]


//00:43:02


// First Recurrence Index
/*
Create a function that identifies the very first item that has recurred in the
string argument passed. It returns the identified item with the index where it
first appeared and the very next index where it resurfaced -- entirely as an
object; or as an empty object if the passed argument is either null, undefined,
empty string, or no recurring item exists.
*/

/*
questions:
Can I assume I will receive exactly one argument and that it will be a either string,
  null, or undefined?
Should the function consider case?
If passed an array, can it be mutated in the execution of the function?

algorithm:
If the passed argument is not an array, convert it to an array of characters
Assign a character variable to the first item in the array filtered to only objects
  with a duplicate in the array
Initiailize a results array to {}
If character, results[character] = [the first occurence of the target, the second occurence]
Retturn results
*/

function recurIndex(string) {
  if (!string) return {};

  let chars = (!Array.isArray(string)) ? string.split('') : string.slice();
  let character = chars.filter((char, index) => {
    return chars.slice(0, index).includes(char.toLowerCase()) ||
           chars.slice(0, index).includes(char.toUpperCase())
  })[0];

  let results = {};

  if (character) {
    if (chars.includes(character.toLowerCase()) &&
        chars.includes(character.toUpperCase())) {
      character = chars.find(char => {
        return (char === character.toLowerCase() || char === character.toUpperCase());
      });
    }

    let firstIndex = chars.findIndex(char => {
      return (char === character.toLowerCase() || char === character.toUpperCase());
    });
    let secondIndex = chars.slice(firstIndex + 1).findIndex(char => {
      return (char === character.toLowerCase() || char === character.toUpperCase());
    }) + firstIndex + 1;
    results[character] = [ firstIndex, secondIndex ];
  }

  return results;
}

// console.log(recurIndex("DXTDXTXDTXD")); //{"D": [0, 3]}
// // D first appeared at index 0, resurfaced at index 3
// // T appeared and resurfaced at indices 3 and 6 but D completed the cycle first

// console.log(recurIndex(['D', 'X', 'T', 'D', 'X', 'T', 'X', 'D', 'T', 'X', 'D'])); //{"D": [0, 3]}
// console.log(recurIndex('aA')) //['a': [0, 1]]
// console.log(recurIndex('Aa')) //['A': [0, 1]]

// console.log(recurIndex("YXZXYTUVXWV")); //{"X": [1, 3]}
// console.log(recurIndex("YZTTZMNERXE")); //{"T": [2, 3]}
// console.log(recurIndex("AREDCBSDERD")); //{"D": [3, 7]}

// console.log(recurIndex("")); //{}
// console.log(recurIndex(null)); //{}
// console.log(recurIndex(undefined)); //{}
// console.log(recurIndex("ABC")); //{}

//00:29:59


// Deep Arithmetic
/*
Write a function that takes an array of strings of arbitrary dimensionality
([], [][], [][][], etc.) and returns the sum of every separate number in each
string in the array.
*/

/*
questions:
Can I assume I will receive exactly one argument and that it will be an array?
The prompt indicates that the array may be empty or sparse. What is the expected
  output in these cases?
Can any of the arrays have non-element properties and if so, how should those be
  handled?
How should double negatives be handled? Ie, should '--2' be handled as '2' or '-2'?
Will the array given and its subarrays only contain arrays and strings?

algorithm:
While the array contains arrays, flatten it
Map the array
  - For each element, split it on non-digit, non-hyphen-that-precede-a-digit characters
Flatten the array
Map the array to integers
Reduce it to their sum
*/

function sum(array) {
  while (array.some(elem => Array.isArray(elem))) array = array.flat();
  array = array.map(str => str.split(/[^\d-]/g))
               .flat()
               .filter(str => str !== '' && str !== '-')
               .map(str => str.split(/(?=-)/g))
               .flat()
               .map(str => parseInt(str, 10));

  return array.reduce((num, total) => total + num, 0);
}

// console.log(sum(["1", "five", "2wenty", "thr33"])); //36
// console.log(sum([["1X2", "t3n"],["1024", "5", "64"]])); //1099
// console.log(sum([[["1"], "10v3"], ["738h"], [["s0"], ["1mu4ch3"],"-1s0"]])); //759
// console.log(sum(["1", "-a1"])); //2
// console.log(sum(["1", "-1-1"])); //-1
// console.log(sum(["1", "-1-1-1"])); //-2
// console.log(sum(["1", "-1-420-1"])); //-421
// console.log(sum([])); //0

//00:23:04


// Super Strict Grading
/*
Given an object literal of student names and an array of their test scores over
the semester, return a list of all the students who passed the course (in
alphabetical order). However, there is one more thing to mention: the pass mark
is 100% in everything!
*/

/*
Can I assume I will receive exactly one argument and that it will be a non-array
  object?
Can I assume that eaach value in the object will be an array? Will that array always
  contain strings in the format of number/number?
Can the keys be in any case and if so, how should different cases be treated for
  sorting purposes?
Can the array values be empty, sparse, or contain non-element properties? If so,
  how should the associated data be handled?
Can the object be mutated over the course of the function's execution?

algorithm:
Initialize a results array to []
Begin iterating through the students object's keys
  - If the associated value is 100 or '100', add that key to results and return;
  - Else, if it's an array, begin iterating through the values
    - If any value is not 100, '100', or when split on '/', has a lenght of 2 and
      [0] and [1] are equal, return
  - Add the key to the results array
Sort results by the charcodeAt(0).toLowerCase and return it
*/

function whoPassed(students) {
  students = Object.fromEntries(Object.entries(students));
  let results = [];

  Object.keys(students).forEach(student => {
    if (!Array.isArray(students[student])) students[student] = [ students[student] ];
    if (students[student].every(grade => {
      return grade === 100   ||
             grade === '100' ||
             grade.split('/')[0] === grade.split('/')[1];
    })) {
      results.push(student);
    }
  });

  return results.sort((a, b) => a.toLowerCase().charCodeAt(0) - b.toLowerCase().charCodeAt(0));
}

// console.log(whoPassed({
//   "John" : ["5/5", "50/50", "10/10", "10/10"],
//   "Sarah" : ["4/8", "50/57", "7/10", "10/18"],
//   "Adam" : ["8/10", "22/25", "3/5", "5/5"],
//   "Barry" : ["3/3", "20/20"]
// })); //["Barry", "John"]

// console.log(whoPassed({
//   "Zara" : ["10/10"],
//   "Kris" : ["30/30"],
//   "Charlie" : ["100/100"],
//   "Alex" : ["1/1"]
// })); //["Alex", "Charlie", "Kris", "Zara"]

// console.log(whoPassed({
//   "Zach" : ["10/10", "2/4"],
//   "Fred" : ["7/9", "2/3"]
// })); //[]

// console.log(whoPassed({})); //[]
// console.log(whoPassed({Zach: ['100'], Fred: ['90']})); //['Zach']
// console.log(whoPassed({Zach: ['100'], Fred: ['90']})); //['Zach']
// console.log(whoPassed({Zach: '100'})); //['Zach']
// console.log(whoPassed({Zach: ['100', '7/7']})); //['Zach']
// console.log(whoPassed({Zach: 100})); //['Zach']
// console.log(whoPassed({Zach: [100, '7/7']})); //['Zach']
// console.log(whoPassed({Zach: []})); //['Zach']
// console.log(whoPassed({Zach: ['100'], fred: ['100']})); //['fred', Zach']

// let test = {Zach: ['7/7'], Fred: ['90']};
// whoPassed(test);
// console.log(test); //{Zach: ['7/7'], Fred: ['90']}

//00:26:13


// 25% Discount on the Most Expensive Item
/*
You want to introduce a discount for your online store. Every customer gets a 25%
discount on the most expensive item in the shopping cart. The discount will be
calculated on just one item, even if the customer buys more than one of the most
expensive item.

Create a function that takes an object and returns the total price after discount.
*/

/*
questions:
Can I assume I will receive exactly one argument and that it will be an array?
Can that array be empty, sparse, or have non-element properties? If yes, what
  should be done with the respective data in that edge case?
Can that array contain anything other than non-array objects?
Will those objects always contain name, quantity, and price keys? Will they always
  be all lowercase? If quantity or price might be missing, what should be done?
Can the objects contain any additional keys? If yes, should anything be done with
  their values?
Can objects be duplicated? If so, how should that be handled?
How should decimals beyond the second be rounded?

algorithm:
Create a helper function to search an object case in-sensitively
Initialize a costs array to []
Begin iterating through the products array
  - Push the object's price (using the helper method) into the costs array x times,
    where x is its quantity value (using the helper method)
Sort the products array, highest to lowest
Set costs[0] to 75% of itself
Return costs reduced to its sum to two decimal points or 0.00
*/

function twentyFiveOnOne(products) {
  let costs = [];

  products.forEach(product => {
    let quantity = caseInsensitiveObjectLookup(product, 'quantity');
    if (quantity === undefined) quantity = 1;

    for (let i = 0; i < quantity; i += 1) {
      costs.push(caseInsensitiveObjectLookup(product, 'price') || 0);
    }
  });

  costs.sort((a, b) => b - a);
  if (costs[0]) costs[0] = costs[0] * 0.75;

  return costs.reduce((cost, total) => cost + total, 0.00).toFixed(2);
}

function caseInsensitiveObjectLookup(object, targetKey) {
  targetKey = targetKey.toLowerCase();
  let downcasedObject = {};

  Object.keys(object).forEach(key => {
    downcasedObject[key.toLowerCase()] = object[key];
  });

  return downcasedObject[targetKey];
}

// console.log(twentyFiveOnOne([
//   { name: "Iphone 20x", quantity: 1, price: 1350 },
//   { name: "Samsung x30", quantity: 1, price: 1225 },
//   { name: "Nokia 9250", quantity: 1, price: 800 },
//   { name: "Tesla Model Y", quantity: 1, price: 72999 }
// ])); //58124.25

// console.log(twentyFiveOnOne([
//   { name: "jogging pants", quantity: 1, price: 29.99 },
//   { name: "tennis socks", quantity: 2, price: 5.99 },
//   { name: "sweat shirt", quantity: 1, price: 59.99 }
// ])); //86.96

// console.log(twentyFiveOnOne([{ name: 'test', quantity: 2, price: 10 }])); //17.50
// console.log(twentyFiveOnOne([{ quantity: 2, price: 10 }])); //17.50
// console.log(twentyFiveOnOne([{ name: 'test', quantity: 0, price: 10 }])); //0.00
// console.log(twentyFiveOnOne([{ name: 'test', quantity: 1, price: 0 }])); //0.00
// console.log(twentyFiveOnOne([{ Name: 'test', quanTity: 1, pricE: 10 }])); //7.50
// console.log(twentyFiveOnOne([{ name: 'test', price: 10 }])); //7.50
// console.log(twentyFiveOnOne([{ name: 'test', quantity: 20 }])); //0.00
// console.log(twentyFiveOnOne([{ name: 'test', quantity: 1, price: 10 },
//                             { name: 'test', quantity: 2, price: 10 }])); //27.50

// console.log(twentyFiveOnOne([])); //0.00

// let test = [ { name: "Iphone 20x", quantity: 1, price: 1350 },
//             { name: "Samsung x30", quantity: 1, price: 1225 },
//             { name: "Nokia 9250", quantity: 1, price: 800 },
//             { name: "Tesla Model Y", quantity: 1, price: 72999 } ]
// twentyFiveOnOne(test);
// console.log(test);
/*
[ { name: "Iphone 20x", quantity: 1, price: 1350 },
  { name: "Samsung x30", quantity: 1, price: 1225 },
  { name: "Nokia 9250", quantity: 1, price: 800 },
  { name: "Tesla Model Y", quantity: 1, price: 72999 } ]
*/
//00:20:38


// Count How Many Times an Element is Repeated
/*
Given an array, create a function that returns an object detailing how many
times each element was repeated. Sort the object by value in descending order.
*/

/*
questions:
Can I assume I will receive exactly one argument and that it will be an array?
Can that array be empty, sparse, or have non-element properties? If so, what should
  be done with the respective data in that case?
The examples indicate that the array can contain strings and numeric values. What
  other values could the array contain, if any?
I take it that, given that object keys are always strings, elemnts must be coerced
  to strings before consideration? That is, [ null, 'null' ] will return { null: 2 }?
Can string elements be empty? If so, what is the associated expected key?
When two elements share the same number of repetitions, how should they be ordered?
Should string elements be compared case-sensitively?

algorithm:
Convert the passed array into an array of string elements
  - If the given element is an object, use JSON.stringify
    - Convert any single quotations in the output to double quotes
  - Else, use String()
Initialize an object variable to {}
  - Get the keys from the original array and iterate through them
    - If String(parseInt(entry, 10)) === entry, return
    - Set the key of object to the associated value in the initial array
Initialize a new variable, entries, to the original array filtered to its unique values
Map entries into array elements
  - Each entry[0] will be the string element of the first array
  - Each entry[1] will be the count of it in the original array, found by getting
    the length of the original array filtered into only that element
Sort entries by their 1-indexes, descending, then sort it into alphabetic order
  between elements that share 1 indeces
Insert the JSON.stringified object variable into entries, if not empty
  - If any of the object's keys are equal to that string, increment their 1-index
    by 1
  - Else, insert [that string, 1] into the end of the array
Return entries converted into an object
*/

function countRepetitions(arr) {
  let stringArr = arr.map(elem => stringify(elem));

  let propertyObject = {};
  Object.keys(arr).forEach(key => {
    if (String(parseInt(key, 10)) === key) return;

    propertyObject[key] = arr[key];
  })
  if (Object.keys(propertyObject).length > 0) stringArr.push(stringify(propertyObject));

  let entries = stringArr.filter((str, i) => !stringArr.slice(i + 1).includes(str))
                         .map(str => [ str, stringArr.filter(original => str === original).length ])
                         .sort((a, b) => b[1] - a[1])
                         .sort((a, b) => {
                           if (a[1] === b[1]) {
                             if (a[0] > b[0])      return 1;
                             else if (a[0] < b[0]) return -1;
                           }

                           return 0;
                          });

  return Object.fromEntries(entries);
}

function stringify(arg) {
  if (typeof arg === 'object') return JSON.stringify(arg).replace(/'/g, '"');
  else                         return String(arg);
}

// console.log(countRepetitions(["cat", "dog", "cat", "cow", "cow", "cow"])); //{ cow: 3, cat: 2, dog: 1 }
// console.log(countRepetitions([1, 5, 5, 5, 12, 12, 0, 0, 0, 0, 0, 0])); //{ 0: 6, 5: 3, 12: 2, 1: 1 }
// console.log(countRepetitions(["Infinity", "null", "Infinity", "null", "null"])); //{ null: 3, Infinity: 2 }
// console.log(countRepetitions([])); //{}
// console.log(countRepetitions([null, 'null'])); // { null: 2 }
// console.log(countRepetitions([[], [], ['a'], ["a"]])); //{ '["a"]': 2, '[]': 2 };
// console.log(countRepetitions([{}, {}, { a: 'a' }, { a: "a" }])); //{ '{ a: 'a' }': 2, '{}': 2 };
// console.log(countRepetitions(["'a'", '"a"'])); //{ "a": 1, 'a': 1 }

// let test = [1];
// test.test = 2;
// test.test2 = 3;
// console.log(countRepetitions(test)); //{ 1: 1, { test: 2, test2: 3 }: 1 }

// test = [{ test: '2' }];
// test.test = "2";
// console.log(countRepetitions(test)); //{ { test: 2 }: 2 }

//00:57:53


// Vowel Families
/*
Write a function that selects all words that have all the same vowels (in any
order and/or number) as the first word, including the first word.
*/
/*
questions:
Can I assume I will receive exactly one argument and that it will be an array?
Can the array be empty, sparse, or have non-element arrays? If so, what should
  be done with that relevant data?
Can I assume that all elements of the array will be strings? If not, what should
  be done with non-string values?
Does the order of the output array matter?
Should strings be compared case-insensitively?
By 'all the same vowels' in 'any number', does that include zero? For instance,
  does ['do', 'd'] return ['do', 'd'] or ['do']?

algorithm:
Create a copy of the passed array, mapped so that each word is reduced to just
  their vowels
Uniquify each string to just its chars
Sort each substring's chars
Return the original array filtered by whether or not its associated index in that
  vowels array is equal to the first element of the vowels array
*/

function sameVowelGroup(words) {
  words = words.filter(word => word === null || typeof word !== 'object');

  let vowels = words.map(word => {
    let chars = String(word).replace(/[^aeiou]/gi, '').split('')
    return chars.filter((char, i) => !chars.slice(i + 1).includes(char)).sort().join('').toLowerCase();
  });

  return words.filter((word, i) => vowels[i] === vowels[0]);
}

// console.log(sameVowelGroup(["toe", "ocelot", "maniac"])); //["toe", "ocelot"]
// console.log(sameVowelGroup(["many", "carriage", "emit", "apricot", "animal"])); //["many"]
// console.log(sameVowelGroup(["hoops", "chuff", "bot", "bottom"])); //["hoops", "bot", "bottom"]
// console.log(sameVowelGroup([])); //[]
// console.log(sameVowelGroup(["toe", 1, "ocelot", ['toe'], "maniac"])); //["toe", "ocelot"]
// console.log(sameVowelGroup([undefined, "undefined"])); //[undefined, 'undefined']
// console.log(sameVowelGroup(["TOE", "ocelot"])); //["TOE", "ocelot"]
// console.log(sameVowelGroup(["do", "d"])); //["do"]
// console.log(sameVowelGroup([[], 'toe', 'ocelot', 'maniac'])); //['toe', 'ocelot']

//00:18:42


// Hall Monitor 2
/*
A floor plan is arranged as follows:

You may freely move between rooms 1 and 2.
You may freely move between rooms 3 and 4.
However, you can enter the hallway to move between rooms 2 and 4.
Create a function that validates whether the route taken between rooms is possible.
The hallway will be given as the letter "H".
*/

/*
questions:
Can I assume I will receive exactly one argument and that it will be an array?
Can that array be empty, sparse, or have non-element properties? If so, what
  should be done with that respective data?
Can I assume that the array will contain only integers 1 - 5 or the string "H"?
Should lowercase 'h' strings be considered valid representation of the hallway space?

algorithm:
Initialize a constaint, VALID_MOVES, to store, as an array, valid moves associated
  with keys representing each room.
Densify the array
Begin iterating through the elements in the path array, using a for loop
  - if the stringified, downcased given element is not contained in VALID_MOVES's
    keys, return false
  - if the next index in the path is not contained in the associated array within
    VALID_MOVES (or if there is no associated array), return false
return true
*/

const VALID_MOVES = { 1: ['2'], 2: ['1', 'h'], h: ['2', '4'], 3: ['4'], 4: ['h', '3'] };

function possiblePath(path) {
  let densePath = [];
  Object.keys(path).forEach(key => {
    if (String(parseInt(key, 10)) === key) densePath.push(String(path[key]).toLowerCase())
  });

  for (let i = 0; i < densePath.length; i += 1) {
    if (!VALID_MOVES[densePath[i]]) return false;

    if (i !== densePath.length - 1) {
      if (!VALID_MOVES[densePath[i + 1]])                             return false;
      else if (!VALID_MOVES[densePath[i]].includes(densePath[i + 1])) return false;
    }
  }

  return true;
}

// console.log(possiblePath([1, 2, "H", 4, 3]) === true);
// console.log(possiblePath(["H", 1, 2]) === false);
// console.log(possiblePath([4, 3, 4, "H", 4, "H"]) === true);
// console.log(possiblePath([]) === true);
// console.log(possiblePath([1, 2, "h", 4, 3]) === true);
// console.log(possiblePath(['1', 2, "H", 4, 3]) === true);
// console.log(possiblePath([5]) === false);

// let test = [1, 2, "H", 'delete this', 4, 3];
// delete test[3];
// console.log(possiblePath(test) === true);

// test = [1, 2, "H", 4, 3];
// test.test = 'test';
// console.log(possiblePath(test) === true);

//00:22:27


// Check If the Brick Fits through the Hole
/*
Write the function that takes three dimensions of a brick: height(a), width(b)
and depth(c) and returns true if this brick can fit into a hole with the width(w)
and height(h).
*/

/*
questions:
Can I assume I will receive exactly five arguments? Can I assume that they will
  all be numbers?
In the provided examples, all arguments are integers. Can I assume all arguments
  will be integers, or could they be other number types?
Will the arguments always be provided in the order of brick height, width, depth,
  then hole width and height?
Can any of the provided numbers be 0, negative, NaN, or Infinity?
Does the brick have to be inserted along ninety-degree angle insertions? That is,
  can a brick be rotated 45 degrees in order to fit into the hole?
If passed one or more arrays, can they be mutated at all?

algorithm:
Initialize brickDimensions and holeDimensions both to []
Filter the arguments by whether or not they are arrays
  - Sort the arrays by number of elements
  - If there is one or more elements with exactly three dimensions, set
    brickDimensions to the first of those arrays
    - Otherwise, set it to the first element in the sorted array and remove it
      from the sorted array
  - If there is one or more elements with exactly two dimensions, set
    holeDimensions to the first of those arrays
      - Otherwise, set it to the first element in the sorted array

If the length of brickDimensions is less than 3 but greater than 0, fill it with
1's until its length is 3. Do the same for holeDimensions, but up to a length of 2.

If either brickDimensions or holeDimensions are empty
  - Starting with brickDimensions, set the three dimensions of that object to
    the first three numeric arguments. If there are less than three, set any missing
    dimensions to 1.
  - Set the two dimensions of holeDimensions to the next two numeric elements, if any.
    If there aren't two remaining arguments, set any missing dimensions to 1.

Sort brickDimensions by smallest element to largest
Sort holeDimensions by largest to smallest

If brickDimensions[0] <= holeDimensions[0] && brickDimensions[1] <= holeDimensions[1],
return true, else false
*/

function doesBrickFit(...args) {
  let brickDimensions = [];
  let holeDimensions  = [];
  let arrayArgs       = args.filter(elem => Array.isArray(elem))
                            .sort((a, b) => b.length - a.length);
  let numArgs         = args.filter(elem => typeof elem === 'number');

  if (arrayArgs.some(arr => arr.length === 3)) {
    brickDimensions = arrayArgs.find(arr => arr.length === 3);
    delete arrayArgs[arrayArgs.findIndex(arr => arr.length === 3)];
    arrayArgs = Object.values(arrayArgs);
  }

  if (arrayArgs.some(arr => arr.length === 2)) {
    holeDimensions = arrayArgs.find(arr => arr.length === 2);
    delete arrayArgs[arrayArgs.findIndex(arr => arr.length === 2)];
    arrayArgs = Object.values(arrayArgs);
  }

  if (arrayArgs.length > 0 && brickDimensions.length === 0) {
    brickDimensions = arrayArgs.shift();
  }

  if (arrayArgs.length > 0 && holeDimensions.length === 0) {
    holeDimensions = arrayArgs.shift();
  }

  while (brickDimensions.length > 0 && brickDimensions.length < 3) brickDimensions.push(1);
  while (holeDimensions.length > 0 && holeDimensions.length < 2) holeDimensions.push(1);

  while (brickDimensions.length < 3) {
    brickDimensions.push(numArgs.length > 0 ? numArgs.shift() : 1);
  }
  while (holeDimensions.length < 2) {
    holeDimensions.push(numArgs.length > 0 ? numArgs.shift() : 1);
  }

  brickDimensions.sort((a, b) => a - b);
  brickDimensions.length = 2;
  brickDimensions.sort((a, b) => b - a);

  holeDimensions.sort((a, b) => b - a);
  holeDimensions.length = 2;

  return ((brickDimensions[0] <= holeDimensions[0]) && (brickDimensions[1] <= holeDimensions[1]));
}

// console.log(doesBrickFit(1, 1, 1, 1, 1) === true);
// console.log(doesBrickFit(1, 2, 1, 1, 1) === true);
// console.log(doesBrickFit(1, 2, 2, 1, 1) === false);
// console.log(doesBrickFit(1, 2, 2, 4, 1) === true);

// console.log(doesBrickFit(0.9, 1, 1, 1.1, 1) === true);

// console.log(doesBrickFit(1, 1, 1) === true);
// console.log(doesBrickFit()) === true;
// console.log(doesBrickFit(2) === true);
// console.log(doesBrickFit(2, 2) === false);

// console.log(doesBrickFit(1, 1, 1, 1, 1, 2, 2) === true);
// console.log(doesBrickFit(1, 2, 2, 1, 1, 2, 2) === false);

// console.log(doesBrickFit([1, 1, 1], [1, 1]) === true);
// console.log(doesBrickFit([1, 1, 1]) === true);
// console.log(doesBrickFit([2], [2, 2]) === true);
// console.log(doesBrickFit([], [0.9, 0.9]) === false);
// console.log(doesBrickFit([1, 2, 2], [1, 1, 2]) === true);
// console.log(doesBrickFit([1, 1, 1, 2, 2], [1, 1]) === true);

// console.log(doesBrickFit(1, Infinity, Infinity, 1, 1) === false);
// console.log(doesBrickFit(1, 1, Infinity, 1, 1) === true);
// console.log(doesBrickFit(1, 1, 1, Infinity, 1) === true);

// console.log(doesBrickFit([], [0, 0]) === false);
// console.log(doesBrickFit([0, 0, 0], []) === true);

// console.log(doesBrickFit([1, 1, 1], 2, 2) === true);
// console.log(doesBrickFit([1, 1], 2, 2) === false);
// console.log(doesBrickFit(1, 1, 1, [2, 2]) === true);
// console.log(doesBrickFit(1, 1, 1, [2, 2, 2]) === false);

// console.log(doesBrickFit([2, 2, 1], [2, 2, 2], [1, 1]) === false);
// console.log(doesBrickFit([2, 2, 1], [1, 1], [2, 2, 2]) === false);
// console.log(doesBrickFit([2, 2, 1], [1], [2, 2, 2]) === true);
// console.log(doesBrickFit([2, 2, 1], [1], [2, 2, 2]) === true);
// console.log(doesBrickFit([2, 2, 1], [1], [2]) === false);
// console.log(doesBrickFit([2], [0.5, 0.5], [0.5, 0.5]) === true);
// console.log(doesBrickFit([2], [1, 1], [2, 2, 2, 2], [1, 1, 1]) === true);

//01:02:22


// Playing with Nested Objects
/*
Create a function that takes an object and returns an object of all entries
having unique marks. If the marks are the same, take who is eldest.
*/

/*
questions:
Can I assume I will receive exactly one argument and that that argument will be
  a non-array object?
Can the argument be empty? If so, what is the expected output?
If the argument is an array, can it be sparse or have non-element properties?
If the argument is an array, is the expected output still a non-array object?
Can I assume that that the provided argument will only contain non-array objects?
Will the inner objects always have the age and marks keys? Will they always be an
  integer and string, respectively?
Are keys case-sensitive? If no, should output keys be downcased, or remain the same?
If both age and marks are the same between two objects, which of them should be
  included in the output?
Can any of the objects be mutated during the function's execution?
Can objects contain keys other than age, name, and marks? If so, should they be
  included in the output?
Should the output objects always have their keys in the order of age, name, then
  marks?
Should the objects in the output be in the same order that they appear in the
  provided argument, minus removed elements?

algorithm:
Create a helper function to search objects case-insensitively
  - The function will create a copy object with its keys downcased, then search that
    object for a downcased version of the passed string and return that value
Create a helper function to search objects for keys case-insensitively and return
the key name in its original form
  - The function will use Object.keys(obj).first with a regex

Convert the provided object to its values
Initialize a results variable to an empty array
Iterate over the argument array
  - If the array other than the current element contains any elements with the same
    marks when both are converted to an integer and an age greater than the current
    element's when converted, return
  - Push [ index, a copy of the element ] into the results array
Map the array, changing marks to strings and ages to integers and removing excess keys
Return the results array (using Object.fromEntries if the provided argument is not
  an array)

*/

function getObject(arg) {
  let arr     = Object.values(arg);
  let results = [];

  arr.forEach((obj, i) => {
    if (arr.slice(0, i).some(elem =>  parseInt(caseInsensitiveObjectValue(elem, 'marks'), 10) ===
                                      parseInt(caseInsensitiveObjectValue(obj, 'marks'), 10) &&
                                      parseInt(caseInsensitiveObjectValue(elem, 'age'), 10) >
                                      parseInt(caseInsensitiveObjectValue(obj, 'age'), 10)) ||
        arr.slice(i + 1).some(elem => parseInt(caseInsensitiveObjectValue(elem, 'marks'), 10) ===
                                      parseInt(caseInsensitiveObjectValue(obj, 'marks'), 10) &&
                                      parseInt(caseInsensitiveObjectValue(elem, 'age'), 10) >
                                      parseInt(caseInsensitiveObjectValue(obj, 'age'), 10))) {
                                        return;
                                      }

    results.push(JSON.parse(JSON.stringify(obj)));
  });

  results = results.map((obj, i) => {
    let marksKey    = caseInsensitiveObjectKey(obj, 'marks');
    let ageKey      = caseInsensitiveObjectKey(obj, 'age');
    let nameKey     = caseInsensitiveObjectKey(obj, 'name');
    let validKeys   = [ marksKey, ageKey, nameKey ];
    let keys        = Object.keys(obj).filter(key => validKeys.includes(key));
    let filteredObj = {};

    keys.forEach(key => filteredObj[key] = obj[key]);
    filteredObj[ageKey]   = parseInt(filteredObj[ageKey], 10);
    filteredObj[marksKey] = String(filteredObj[marksKey]);

    return [ i, filteredObj ];
  })

  return Array.isArray(arg) ? results.map(entry => entry[1]) : Object.fromEntries(results);
}

function caseInsensitiveObjectValue(object, targetKey) {
  let downcasedObject = {};
  Object.keys(object).forEach(key => downcasedObject[key.toLowerCase()] = object[key]);
  return downcasedObject[targetKey.toLowerCase()];
}

function caseInsensitiveObjectKey(object, targetKey) {
  return Object.keys(object).find(key => key.toLowerCase() === targetKey.toLowerCase());
}

// console.log(getObject({
//   "0": { age: 18, name: "john", marks: "400" },
//   "1": { age: 17, name: "julie", marks: "400" },
//   "2": { age: 16, name: "Robin", marks: "200" },
//   "3": { age: 16, name: "Bella", marks: "300" }
// })); /*{
//   "0": { age: 18, name: "john", marks: "400" },
//   "1": { age: 16, name: "Robin", marks: "200" },
//   "2": { age: 16, name: "Bella", marks: "300" }
// }*/

// console.log(getObject({
//   0: {age: 18, name: 'john', marks: '400'},
//   1: {age: 17, name: 'julie', marks: '400'},
//   2: {age: 16, name: 'Robin', marks: '200'},
//   3: {age: 16, name: 'Bella', marks: '300'},
//   4: {age: 16, name: 'john', marks: '250'},
//   5: {age: 15, name: 'julie', marks: '250'}
// })); /*{
//   0: {age: 18, name: 'john', marks: '400'},
//   1: {age: 16, name: 'Robin', marks: '200'},
//   2: {age: 16, name: 'Bella', marks: '300'},
//   3: {age: 16, name: 'john', marks: '250'}
// }*/

// console.log(getObject([
//   { age: 18, name: "john", marks: "400" },
//   { age: 17, name: "julie", marks: "400" },
//   { age: 16, name: "Robin", marks: "200" },
//   { age: 16, name: "Bella", marks: "300" }
// ])); /*{
//   "0": { age: 18, name: "john", marks: "400" },
//   "1": { age: 16, name: "Robin", marks: "200" },
//   "2": { age: 16, name: "Bella", marks: "300" }
// }*/

// let test = [
//   { age: 17, name: "julie", marks: "400" },
//   { age: 16, name: "Robin", marks: "200" },
//   { age: 16, name: "Bella", marks: "300" }
// ];
// test.john = { age: 18, name: "john", marks: "400" };
// console.log(getObject(test)); /*[
//   { age: 16, name: "Robin", marks: "200" },
//   { age: 16, name: "Bella", marks: "300" },
//   { age: 18, name: "john", marks: "400" },
// ]*/

// console.log(getObject({})); //{}
// console.log(getObject([])); //[]

// console.log(getObject({ "0": { age: "18", name: "john", marks: "400" } }));
// //{ "0": { age: 18, name: "john", marks: "400" } }
// console.log(getObject({ "0": { age: 18, name: "john", marks: 400 } }));
// //{ "0": { age: 18, name: "john", marks: "400" } }
// console.log(getObject({
//   "0": { aGe: 18, naMe: "john", marKs: "400" },
//   "1": { age: 17, name: "julie", marks: "400" },
//   "2": { age: 16, name: "Robin", marks: "200" },
//   "3": { age: 16, name: "Bella", marks: "300" }
// })); /*{
//   "0": { aGe: 18, naMe: "john", marKs: "400" },
//   "1": { age: 16, name: "Robin", marks: "200" },
//   "2": { age: 16, name: "Bella", marks: "300" }
// }*/
// console.log(getObject({
//   "0": { age: 18, name: "john", marks: "400" },
//   "1": { age: 18, name: "julie", marks: "400" },
//   "2": { age: 16, name: "Robin", marks: "200" },
//   "3": { age: 16, name: "Bella", marks: "300" }
// })); /*{
//   "0": { age: 18, name: "john", marks: "400" },
//   "1": { age: 18, name: "julie", marks: "400" },
//   "2": { age: 16, name: "Robin", marks: "200" },
//   "3": { age: 16, name: "Bella", marks: "300" }
// }*/

// console.log(getObject({
//   "0": { age: 18, name: "john", marks: "400", test: 'example' },
//   "1": { age: 17, name: "julie", marks: "400" },
//   "2": { age: 16, name: "Robin", marks: "200" },
//   "3": { age: 16, name: "Bella", marks: "300" }
// })); /*{
//   "0": { age: 18, name: "john", marks: "400" },
//   "1": { age: 16, name: "Robin", marks: "200" },
//   "2": { age: 16, name: "Bella", marks: "300" }
// }*/

// console.log(getObject({
//   "0": { name: "john", age: 18, marks: "400" },
//   "1": { age: 17, name: "julie", marks: "400" },
//   "2": { age: 16, name: "Robin", marks: "200" },
//   "3": { age: 16, name: "Bella", marks: "300" }
// })); /*{
//   "0": { name: "john", age: 18, marks: "400" },
//   "1": { age: 16, name: "Robin", marks: "200" },
//   "2": { age: 16, name: "Bella", marks: "300" }
// }*/

//00:51:32

