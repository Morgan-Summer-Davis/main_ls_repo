// // Ancestors
// Object.prototype.ancestors = function() {
//   let results = [];
//   let obj = this;

//   while (Object.getPrototypeOf(obj)) {
//     results.push(Object.getPrototypeOf(obj).name || 'Object.prototype');
//     obj = Object.getPrototypeOf(obj);
//   }

//   console.log(results);
//   return results
// }

// // name property added to make objects easier to identify
// let foo = {name: 'foo'};
// const bar = Object.create(foo);
// bar.name = 'bar';
// const baz = Object.create(bar);
// baz.name = 'baz';
// const qux = Object.create(baz);
// qux.name = 'qux';

// qux.ancestors();  // returns ['baz', 'bar', 'foo', 'Object.prototype']
// baz.ancestors();  // returns ['bar', 'foo', 'Object.prototype']
// bar.ancestors();  // returns ['foo', 'Object.prototype']
// foo.ancestors();  // returns ['Object.prototype']


// // Delegate
// function delegate(obj, meth, ...args) {
//   return function () {
//     obj[meth](...args);
//   }
// }

// const foo = {
//   name: 'test',
//   bar(greeting) {
//     console.log(`${greeting} ${this.name}`);
//   },
// };

// const baz = {
//   qux: delegate(foo, 'bar', 'hello'),
// };

// baz.qux();   // logs 'hello test';

// foo.bar = () => { console.log('changed'); };

// baz.qux();          // logs 'changed'


// // Classical Object Creation
// function Person(firstName, lastName, age, gender) {
//   this.firstName = firstName;
//   this.lastName  = lastName;
//   this.age       = age;
//   this.gender    = gender;
// }

// Person.prototype.fullName = function() {
//   return this.firstName + ' ' + this.lastName;
// }

// Person.prototype.eat         = () => console.log('Eating');
// Person.prototype.communicate = () => console.log('Communicating');
// Person.prototype.sleep       = () => console.log('Sleeping');

// const person = new Person('foo', 'bar', 21, 'gender');
// console.log(person instanceof Person);     // logs true
// person.eat();                              // logs 'Eating'
// person.communicate();                      // logs 'Communicating'
// person.sleep();                            // logs 'Sleeping'
// console.log(person.fullName());            // logs 'foo bar'

// function Doctor(firstName, lastName, age, gender, specialization) {
//   Person.call(this, firstName, lastName, age, gender);
//   this.specialization = specialization;
// }

// Doctor.prototype             = Object.create(Person.prototype);
// Doctor.prototype.constructor = Doctor;
// Doctor.prototype.diagnose    = () => console.log('Diagnosing');

// const doctor = new Doctor('foo', 'bar', 21, 'gender', 'Pediatrics');
// console.log(doctor instanceof Person);     // logs true
// console.log(doctor instanceof Doctor);     // logs true
// doctor.eat();                              // logs 'Eating'
// doctor.communicate();                      // logs 'Communicating'
// doctor.sleep();                            // logs 'Sleeping'
// console.log(doctor.fullName());            // logs 'foo bar'
// doctor.diagnose();                         // logs 'Diagnosing'

// function Student(firstName, lastName, age, gender, degree) {
//   Person.call(this, firstName, lastName, age, gender);
//   this.degree = degree;
// }

// Student.prototype             = Object.create(Person.prototype);
// Student.prototype.constructor = Student;
// Student.prototype.study       = () => console.log('Studying');

// function GraduateStudent(firstName, lastName, age, gender, degree, graduateDegree) {
//   Student.call(this, firstName, lastName, age, gender, degree);
//   this.graduateDegree = graduateDegree;
// }

// GraduateStudent.prototype             = Object.create(Student.prototype);
// GraduateStudent.prototype.constructor = GraduateStudent;
// GraduateStudent.prototype.research    = () => console.log('Researching');

// const graduateStudent = new GraduateStudent('foo', 'bar', 21, 'gender', 'BS Industrial Engineering', 'MS Industrial Engineering');
// // logs true for next three statements
// console.log(graduateStudent instanceof Person);
// console.log(graduateStudent instanceof Student);
// console.log(graduateStudent instanceof GraduateStudent);
// graduateStudent.eat();                     // logs 'Eating'
// graduateStudent.communicate();             // logs 'Communicating'
// graduateStudent.sleep();                   // logs 'Sleeping'
// console.log(graduateStudent.fullName());   // logs 'foo bar'
// graduateStudent.study();                   // logs 'Studying'
// graduateStudent.research();                // logs 'Researching'

// // Further Exploration
// class Person {
//   constructor(firstName, lastName, age, gender) {
//     this.firstName = firstName;
//     this.lastName  = lastName;
//     this.age       = age;
//     this.gender    = gender;
//   }

//   fullName() {
//     return this.firstName + ' ' + this.lastName;
//   }

//   communicate = () => console.log('Communicating');
//   eat         = () => console.log('eating');
//   sleep       = () => console.log('sleeping');
// }

// class Student extends Person {
//   constructor(firstName, lastName, age, gender, degree) {
//     super(firstName, lastName, age, gender);
//     this.degree = degree;
//   }

//   study = () => console.log('Studying');
// }

// class GraduateStudent extends Student {
//   constructor(firstName, lastName, age, gender, degree, graduateDegree) {
//     super(firstName, lastName, age, gender, degree);
//     this.graduateDegree = graduateDegree;
//   }

//   research = () => console.log('Researching');
// }

// // Anonymizer
// let Account = (function() {
//   const CHARS = 'abcdefghijklmnopqrstuvwxyz0123456789'.split('');
//   function anonymize()  {
//     let results = [];

//     for(let i = 0; i < 16 - 1; i += 1) {
//       let char = CHARS[Math.floor(Math.random() * CHARS.length)];
//       if (Math.round(Math.random()) === 1) char = char.toUpperCase();

//       results.push(char);
//     }

//     return results.join('');
//   };

//   return {
//     init(email, password, firstName, lastName) {
//       this.email       = (password) => this.password(password) ? email     : 'Invalid Password';
//       this.firstName   = (password) => this.password(password) ? firstName : 'Invalid Password';
//       this.lastName    = (password) => this.password(password) ? lastName  : 'Invalid Password';
//       this.password    = (attempt)  => attempt === password;
//       this.displayName = anonymize();
//       return this;
//     },

//     resetPassword(oldPass, newPass) {
//       if (this.password(oldPass)) {
//         this.password = ((attempt)  => attempt === newPass);
//         return true;
//       } else {
//         return 'Invalid Password';
//       }
//     },

//     reanonymize() {
//       this.displayName = anonymize();
//     },
//   }
// })();

// let fooBar = Object.create(Account).init('foo@bar.com', '123456', 'foo', 'bar');
// console.log(fooBar.firstName);                     // returns the firstName function
// console.log(fooBar.email);                         // returns the email function
// console.log(fooBar.firstName('123456'));           // logs 'foo'
// console.log(fooBar.firstName('abc'));              // logs 'Invalid Password'
// console.log(fooBar.displayName);                   // logs 16 character sequence
// console.log(fooBar.resetPassword('123', 'abc'))    // logs 'Invalid Password'
// console.log(fooBar.resetPassword('123456', 'abc')) // logs true

// let displayName = fooBar.displayName;
// fooBar.reanonymize('abc');                         // returns true
// console.log(displayName === fooBar.displayName);   // logs false

// let bazQux = Object.create(Account).init('baz@qux.com', '123456', 'baz', 'qux');
// console.log(fooBar.firstName('abc'));              // logs 'foo'
// console.log(bazQux.email('abc'));                  // logs 'Invalid Password'
// console.log(bazQux.lastName('123456'));            // logs 'qux'

// Mini Inventory Management System
let ItemManager = {
  items: [],

  create(name, category, quantity) {
    let item = Object.create(ItemCreator).init(name, category, quantity);
    return item.notValid ? false : this.items[this.items.push(item) - 1];
  },

  update(sku, update) {
    let item = this.items.find(item => item.skuCode === sku);
    Object.keys(update).forEach(key => item[key] = update[key]);
    return item;
  },

  delete(sku) {
    return this.items.splice(this.items.findIndex(item => item.skuCode === sku), 1);
  },

  inStock() {
    return this.items.filter(item => item.quantity > 0);
  },

  itemsInCategory(category) {
    return this.items.filter(item => item.category === category);
  }
}

let ItemCreator = (function() {
  function generateSku(name, category) {
    return name.replace(/\s/g, '').slice(0, 3).concat(category.slice(0, 2)).toUpperCase();
  }

  let validName = (name)         => name.replace(/\s/g, '').length >= 5;
  let validCategory = (category) => category.length >= 5 && !/\s/.test(category);

  return {
    init(name, category, quantity) {
      if (!validName(name) || !validCategory(category) || quantity === undefined) {
        return { notValid: true };
      }

      this.skuCode  = generateSku(name, category);
      this.itemName = name;
      this.category = category;
      this.quantity = quantity;
      return this;
    },
  }
})();

let ReportManager = {
  init(itemManager) {
    this.items = itemManager;
    return this;
  },

  createReporter(sku) {
    let item = this.items.items.find(item => item.skuCode === sku);

    return {
      itemInfo() {
        Object.keys(item).forEach((key) => console.log(key + ': ' + item[key]));
      }
    }
  },

  reportInStock() {
    console.log(this.items.items.filter(item => item.quantity > 0).map(item => item.itemName).join(','));
  }
}

ItemManager.create('basket ball', 'sports', 0);           // valid item
ItemManager.create('asd', 'sports', 0);
ItemManager.create('soccer ball', 'sports', 5);           // valid item
ItemManager.create('football', 'sports');
ItemManager.create('football', 'sports', 3);              // valid item
ItemManager.create('kitchen pot', 'cooking items', 0);
ItemManager.create('kitchen pot', 'cooking', 3);          // valid item

ItemManager.items;
// returns list with the 4 valid items

ReportManager.init(ItemManager);
ReportManager.reportInStock();
// logs soccer ball,football,kitchen pot

ItemManager.update('SOCSP', { quantity: 0 });
ItemManager.inStock();
// returns list with the item objects for football and kitchen pot
ReportManager.reportInStock();
// logs football,kitchen pot
ItemManager.itemsInCategory('sports');
// returns list with the item objects for basket ball, soccer ball, and football
ItemManager.delete('SOCSP');
ItemManager.items;
// returns list with the remaining 3 valid items (soccer ball is removed from the list)

const kitchenPotReporter = ReportManager.createReporter('KITCO');
kitchenPotReporter.itemInfo();
// logs
// skuCode: KITCO
// itemName: kitchen pot
// category: cooking
// quantity: 3

ItemManager.update('KITCO', { quantity: 10 });
kitchenPotReporter.itemInfo();
// logs
// skuCode: KITCO
// itemName: kitchen pot
// category: cooking
// quantity: 10