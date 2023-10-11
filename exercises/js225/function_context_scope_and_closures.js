// What is This
NaN


// The Franchise
// The problem is that the function returned by AllMovies does not inherit the
// context from that method.
let franchise = {
  name: 'How to Train Your Dragon',
  allMovies() {
    return [1, 2, 3].map((number) => `${this.name} ${number}`);
  },
};


// The Franchise - Solution 2
franchise = {
  name: 'How to Train Your Dragon',
  allMovies() {
    return [1, 2, 3].map(function(number) {
      return `${this.name} ${number}`;
    }, this);
  },
};


// Our very own bind()
function myBind(func, context, ...partialArgs) {
  return (...args) => {
    args = partialArgs.concat(args);
    return func.call(context, ...args);
  }
}

let test  = { a: 1 };
let test2 = { a: 2 };

function subtractOneFromA(...args) {
  console.log(args);
  return this.a - 1;
}

console.log(subtractOneFromA.call(test, 1));
console.log(subtractOneFromA.call(test2, 1, 2));
let test3 = myBind(subtractOneFromA, test, 4);
console.log(test3.call(test2, 1, 2, 3));


// myBind() Improved
// Already implemented in the initial solution


// myFilter()
function myFilter(array, func, context) {
  const result = [];

  array.forEach(value => {
    if (func.call(context, value)) {
      result.push(value);
    }
  });

  return result;
}

const filter = {
  allowedValues: [5, 6, 9],
};

console.log(myFilter([2, 1, 3, 4, 5, 6, 12], function(val) {
  return this.allowedValues.includes(val);
}, filter)); // returns [5, 6]


// Garbage Collection
// No. The function returned by makeArrays() and assigned to pushIt maintains a
// reference to the array.


// Make a Stack
function newStack() {
  let stack = [];

  return {
    push(elem) {
      return stack.push(elem);
    },
    pop() {
      return stack.pop();
    },
    printStack() {
      stack.forEach(elem => console.log(elem));
    },
  }
}

let stack = newStack();
stack.push(3);
stack.push(4);
stack.printStack();


// Don't Pollute My Window
const greeter = {
  sayGreetings() { (function sayGreetings() {
    const name = 'Naveed';
    const greeting = 'Hello';
    const message = `${greeting} ${name}!`;

    console.log(message);
  })() },
};

greeter.sayGreetings();

// School Improved
function createStudent(name, year) {
  return {
    name,
    year,
    courses: [],
    info() {
      console.log(`${this.name} is a ${year} year student.`)
    },
    addCourse(course) {
      if (typeof course !== 'object' || !course.name || !course.code) {
        return console.log('Invalid course')
      }

      this.courses.push(course);
    },
    listCourses() {
      console.log(this.courses);
    },
    addNote(code, note) {
      let course = this.courses.find(course => course.code === code);
      if (!course) return console.log('Student not registered in course');

      if (course.note) course.note = course.note + '; ' + note;
      else             course.note = note;
    },
    updateNote(code, note) {
      let course = this.courses.find(course => course.code === code);
      if (!course || !course.note) return console.log('No note for specified class currently exists.');

      course.note = note;
    },
    viewNotes() {
      this.courses.forEach(course => {
        if (course.note) console.log(course.name + ': ' + course.note);
      })
    },
  }
}

let school = (function() {
  let students = [];
  let validYears = ['1st', '2nd', '3rd', '4th', '5th'];

  return {
    addStudent(name, year) {
      if (!validYears.includes(year)) return console.log('Invalid Year');

      this.students.push(createStudent(name, year));
      return this.students[this.students.length - 1];
    },
    enrollStudent(student, course) {
      student = this.students[this.students.indexOf(student)];
      if (!student) return console.log('Invalid Student');

      student.addCourse(course);
    },
    addGrade(student, course, grade) {
      student = this.students[this.students.indexOf(student)];
      if (!student) return console.log('Invalid Student');
      course = student.courses.find(studentCourse => studentCourse.code === course.code);
      if (!course)  return console.log('Student not enrolled in course');

      student.course.grade = grade;
    },
    getReportCard(student) {
      student.courses.forEach(course => {
        console.log(course.name + ': ' + (course.grade || 'In progress'));
      })
    },
    courseReport(courseName) {
      let students = this.students.map(student => {
        let course = student.courses.find(course => course.name === courseName);
        return [student.name, course ? course.grade : course];
      });
      students = students.filter(arr => arr[1]);
      if (students.length === 0) return undefined;

      console.log('=' + courseName + 'Grades=');
      students.forEach(arr => console.log(arr[0] + ': ' + arr[1]));
      console.log('---');
      console.log('Course Average: ' +
                  students.reduce((total, arr) => arr[1] + total, 0)/students.length);
    },
  }
})();