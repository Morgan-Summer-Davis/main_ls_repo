// total square area
function totalArea(rectangles) {
  return rectangles.map(rect => rect[0] * rect[1])
                   .reduce((total, area) => total + area);
}

let rectangles = [[3, 4], [6, 6], [1, 8], [9, 9], [2, 2]];

console.log(totalArea(rectangles));    // 141

function totalSquareArea(rectangles) {
  return rectangles.filter(rect => rect[0] === rect[1])
                   .map(square => square[0] * square[1])
                   .reduce((total, area) => total + area);
}

console.log(totalSquareArea(rectangles));


// processing releases
function processReleaseData(releases) {
  return releases.filter(release => Number.isFinite(release.id) && release.title)
                 .map(release => ({ 'id': release.id, 'title': release.title }));
}

let newReleases = [
  {
    'id': 70111470,
    'title': 'Die Hard',
    'boxart': 'http://cdn-0.nflximg.com/images/2891/DieHard.jpg',
    'uri': 'http://api.netflix.com/catalog/titles/movies/70111470',
    'rating': [4.0],
    'bookmark': [],
  },
  {
    'id': 654356453,
    'boxart': 'http://cdn-0.nflximg.com/images/2891/BadBoys.jpg',
    'uri': 'http://api.netflix.com/catalog/titles/movies/70111470',
    'rating': [5.0],
    'bookmark': [{ id:432534, time:65876586 }],
  },
  {
    'title': 'The Chamber',
    'boxart': 'http://cdn-0.nflximg.com/images/2891/TheChamber.jpg',
    'uri': 'http://api.netflix.com/catalog/titles/movies/70111470',
    'rating': [4.0],
    'bookmark': [],
  },
  {
    'id': 675465,
    'title': 'Fracture',
    'boxart': 'http://cdn-0.nflximg.com/images/2891/Fracture.jpg',
    'uri': 'http://api.netflix.com/catalog/titles/movies/70111470',
    'rating': [5.0],
    'bookmark': [{ id:432534, time:65876586 }],
  },
];

console.log(processReleaseData(newReleases));


// octal
function octalToDecimal(numberString) {
  return numberString.split('')
                     .map(string => Number(string))
                     .reverse()
                     .map((number, index) => number * Math.pow(8, index))
                     .reduce((total, number) => total + number);
}

console.log(octalToDecimal('1'));           // 1
console.log(octalToDecimal('10'));          // 8
console.log(octalToDecimal('130'));         // 88
console.log(octalToDecimal('17'));          // 15
console.log(octalToDecimal('2047'));        // 1063
console.log(octalToDecimal('011'));         // 9


// anagrams
function anagram(word, list) {
  return list.filter(listWord => listWord.split('').sort().join('') ===
                                 word.split('').sort().join(''));
}

console.log(anagram('listen', ['enlists', 'google', 'inlets', 'banana']));  // [ "inlets" ]
console.log(anagram('listen', ['enlist', 'google', 'inlets', 'banana']));   // [ "enlist", "inlets" ]


// formatting bands
let bands = [
  { name: 'sunset rubdown', country: 'UK', active: false },
  { name: 'women', country: 'Germany', active: false },
  { name: 'a silver mt. zion', country: 'Spain', active: true },
];

function processBands(data) {
  data = JSON.parse(JSON.stringify(data));

  return data.map(band => {
    return {
      name: band.name.replace('.', '')
                     .split(' ')
                     .map(word => word[0].toUpperCase() + word.slice(1))
                     .join(' '),
      country: 'Canada',
      active: band.active,
    }
  });
}

console.log(processBands(bands));
console.log(bands);


// class records summary
let studentScores = {
  student1: {
    id: 123456789,
    scores: {
      exams: [90, 95, 100, 80],
      exercises: [20, 15, 10, 19, 15],
    },
  },
  student2: {
    id: 123456799,
    scores: {
      exams: [50, 70, 90, 100],
      exercises: [0, 15, 20, 15, 15],
    },
  },
  student3: {
    id: 123457789,
    scores: {
      exams: [88, 87, 88, 89],
      exercises: [10, 20, 10, 19, 18],
    },
  },
  student4: {
    id: 112233445,
    scores: {
      exams: [100, 100, 100, 100],
      exercises: [10, 15, 10, 10, 15],
    },
  },
  student5: {
    id: 112233446,
    scores: {
      exams: [50, 80, 60, 90],
      exercises: [10, 0, 10, 10, 0],
    },
  },
};

function generateClassRecordSummary(scores) {
  let examScores = Object.keys(scores).map(student => scores[student].scores.exams);
  examScores     = transposeMatrix(examScores);

  return {
    studentGrades: Object.keys(scores).map(student => studentGrade(scores[student])),
    exams: examScores.map(exam => ({
      average: average(exam).toFixed(1),
      minimum: Math.min(...exam),
      maximum: Math.max(...exam),
    })),
  }
}

function studentGrade(studentHash) {
  let EXAM_WEIGHT     = 0.65;
  let EXERCISE_WEIGHT = 0.35;
  let examAverage   = studentHash.scores.exams.reduce((total, score) => total + score)
                      / studentHash.scores.exams.length;
  let exerciseTotal = studentHash.scores.exercises.reduce((total, score) => total + score);

  return formatGrade(examAverage * EXAM_WEIGHT + exerciseTotal * EXERCISE_WEIGHT);
}

function formatGrade(grade) {
  return `${Math.round(grade)} (${letterGrade(grade)})`;
}

function letterGrade(grade) {
  if      (grade >= 93) return 'A';
  else if (grade >= 85) return 'B';
  else if (grade >= 77) return 'C';
  else if (grade >= 69) return 'D';
  else if (grade >= 60) return 'E';
  else                  return 'F';
}

function transposeMatrix(matrix) {
  return matrix[0].map((_, column) => matrix.map(row => row[column]));
}

function average(array) {
  return array.reduce((total, num) => total + num) / array.length;
}

console.log(generateClassRecordSummary(studentScores));

// returns:
({
  studentGrades: [ '87 (B)', '73 (D)', '84 (C)', '86 (B)', '56 (F)' ],
  exams: [
    { average: 75.6, minimum: 50, maximum: 100 },
    { average: 86.4, minimum: 70, maximum: 100 },
    { average: 87.6, minimum: 60, maximum: 100 },
    { average: 91.8, minimum: 80, maximum: 100 },
  ],
})