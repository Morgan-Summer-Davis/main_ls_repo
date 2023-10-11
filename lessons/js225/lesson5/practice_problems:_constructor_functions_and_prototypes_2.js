let shape = {
  getType() { return this.type },
  getPerimeter() { return this.a + this.b + this.c },
}

function Triangle(a, b, c) {
  this.a = a;
  this.b = b;
  this.c = c;
  this.type = 'triangle';
}

Triangle.prototype = shape;
Triangle.prototype.constructor = Triangle;

let t = new Triangle(3, 4, 5);
console.log(t.constructor);                 // Triangle(a, b, c)
console.log(shape.isPrototypeOf(t));        // true
console.log(t.getPerimeter());              // 12
console.log(t.getType());                   // "triangle"


function User(first, last) {
  if (this.constructor !== User) return new User(first, last);

  this.name = first + ' ' + last;
}

let name = 'Jane Doe';
let user1 = new User('John', 'Doe');
let user2 = User('John', 'Doe');

console.log(name);         // => Jane Doe
console.log(user1.name);   // => John Doe
console.log(user2.name);   // => John Doe


function createObject(obj) {
  let Con = function() {};
  Con.prototype = obj;

  return new Con();
}

let foo = {
  a: 1
};

let bar = createObject(foo);
console.log(foo.isPrototypeOf(bar));         // true


Object.prototype.begetObject = function() {
  return Object.setPrototypeOf({}, this);
}

foo = {
  a: 1,
};

bar = foo.begetObject();
console.log(foo.isPrototypeOf(bar));         // true


function neww(constructor, args) {
  let results = Object.create(constructor.prototype);
  let call = constructor.call(results, ...args);

  return call || results;
}

function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}

Person.prototype.greeting = function() {
  console.log('Hello, ' + this.firstName + ' ' + this.lastName);
};

let john = neww(Person, ['John', 'Doe']);
john.greeting();          // => Hello, John Doe
console.log(john.constructor);         // Person(firstName, lastName) {...}