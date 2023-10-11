// Buggy Code 1
function createGreeter(name) {
  return {
    name,
    morning: 'Good Morning',
    afternoon: 'Good Afternoon',
    evening: 'Good Evening',
    greet(timeOfDay) {
      let msg = '';
      switch (timeOfDay) {
        case 'morning':
          msg += `${this.morning} ${name}`;
          break;
        case 'afternoon':
          msg += `${this.afternoon} ${name}`;
          break;
        case 'evening':
          msg += `${this.evening} ${name}`;
          break;
      }

      console.log(msg);
    },
  };
}

const helloVictor = createGreeter('Victor');
helloVictor.greet('morning');


// Buggy Code 2
const item = {
  name: 'Foo',
  description: 'Fusce consequat dui est, semper.',
  price: 50,
  quantity: 100,
  discount(percent) {
    const discount = this.price * percent / 100;
    return this.price - discount;
  },
};

console.log(item.discount(20));   // should return 40
console.log(item.discount(50));   // should return 25
console.log(item.discount(25));   // should return 37.5


// Testing Object Equality
function objectsEqual(obj1, obj2) {
  for (let i = 0; i < Object.keys(obj1).length; i += 1) {
    let key = Object.keys(obj1)[i];
    if (typeof obj1[key] === 'object' && obj1[key] !== null) {
      if (!objectsEqual(obj1[key], obj2[key])) return false;
    } else {
      if (obj1[key] !== obj2[key]) return false;
    }
  }

  for (let i = 0; i < Object.keys(obj2).length; i += 1) {
    let key = Object.keys(obj2)[i];
    if (typeof obj1[key] === 'object' && obj1[key] !== null) {
      if (!objectsEqual(obj1[key], obj2[key])) return false;
    } else {
      if (obj1[key] !== obj2[key]) return false;
    }
  }

  return true;
}

console.log(objectsEqual({a: 'foo'}, {a: 'foo'}));                        // true
console.log(objectsEqual({a: 'foo', b: 'bar'}, {a: 'foo'}));              // false
console.log(objectsEqual({}, {}));                                        // true
console.log(objectsEqual({a: 'foo', b: undefined}, {a: 'foo', c: 1}));    // false

console.log(objectsEqual({ a: { a: 1 } }, { a: { a: 1 } }));              // true
console.log(objectsEqual({ a: { a: {a: 1} } }, { a: { a: { a: 1 } } }));  // true

// Student
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

let foo = createStudent('Foo', '1st');
foo.info();
// "Foo is a 1st year student"
foo.listCourses();
// [];
foo.addCourse({ name: 'Math', code: 101 });
foo.addCourse({ name: 'Advanced Math', code: 102 });
foo.addCourse({ name: 'Advanced Math'  }); //Invalid course
foo.addCourse('Advanced Math');            //Invalid course
foo.listCourses();
// [{ name: 'Math', code: 101 }, { name: 'Advanced Math', code: 102 }]
foo.addNote(101, 'Fun course');
foo.addNote(101, 'Remember to study for algebra');
foo.viewNotes();
// "Math: Fun course; Remember to study for algebra"
foo.addNote(102, 'Difficult subject');
foo.viewNotes();
// "Math: Fun course; Remember to study for algebra"
// "Advance Math: Difficult subject"
foo.updateNote(101, 'Fun course');
foo.viewNotes();
// "Math: Fun course"
// "Advanced Math: Difficult subject"

//School
let school = {
  students: [],
  addStudent(name, year) {
    if (!['1st', '2nd', '3rd', '4th', '5th'].includes(year)) return console.log('Invalid Year');

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

// Examples of created student objects with grades; methods on the objects are not shown here for brevity.
// The following are only showing the properties that aren't methods for the three objects
foo =
{
  name: 'foo',
  year: '3rd',
  courses: [
    { name: 'Math', code: 101, grade: 95, },
    { name: 'Advanced Math', code: 102, grade: 90, },
    { name: 'Physics', code: 202, }
  ],
}

let bar =
{
  name: 'bar',
  year: '1st',
  courses: [
    { name: 'Math', code: 101, grade: 91, },
  ],
}

let qux =
{
  name: 'qux',
  year: '2nd',
  courses: [
    { name: 'Math', code: 101, grade: 93, },
    { name: 'Advanced Math', code: 102, grade: 90, },
   ],
}

school.students = [foo, bar, qux];
school.getReportCard(foo);
// = Math: 95
// = Advanced Math: 90
// = Physics: In progress

school.courseReport('Math');
// = =Math Grades=
// = foo: 95
// = bar: 91
// = qux: 93
// = ---
// = Course Average: 93

school.courseReport('Advanced Math');
// = =Advanced Math Grades=
// = foo: 90
// = qux: 90
// = ---
// = Course Average: 90

school.courseReport('Physics');
// = undefined