function getDefiningObject(object, propKey) {

  if (object === null || object.hasOwnProperty(propKey)) return object
  else return getDefiningObject(Object.getPrototypeOf(object), propKey);
}

let foo = {
  a: 1,
  b: 2,
};

let bar = Object.create(foo);
let baz = Object.create(bar);
let qux = Object.create(baz);

bar.c = 3;

console.log(getDefiningObject(qux, 'c') === bar);     // => true
console.log(getDefiningObject(qux, 'e'));             // => null


function shallowCopy(object) {
  let result = Object.create(Object.getPrototypeOf(object));
  Object.getOwnPropertyNames(object).forEach(prop => result[prop] = object[prop]);

  return result;
}

foo = {
  a: 1,
  b: 2,
};

bar = Object.create(foo);
bar.c = 3;
bar.say = function() {
  console.log('c is ' + this.c);
};

baz = shallowCopy(bar);
console.log(baz.a);       // => 1
baz.say();                // => c is 3
console.log(baz.hasOwnProperty('a'));  // false
console.log(baz.hasOwnProperty('b'));  // false
console.log(baz.hasOwnProperty('c'));  // true


function extend(destination, ...objs) {
  return Object.assign(destination, ...objs);
}

foo = {
  a: 0,
  b: {
    x: 1,
    y: 2,
  },
};

let joe = {
  name: 'Joe'
};

let funcs = {
  sayHello() {
    console.log('Hello, ' + this.name);
  },

  sayGoodBye() {
    console.log('Goodbye, ' + this.name);
  },
};

let object = extend({}, foo, joe, funcs);

console.log(object.b.x);          // => 1
object.sayHello();                // => Hello, Joe