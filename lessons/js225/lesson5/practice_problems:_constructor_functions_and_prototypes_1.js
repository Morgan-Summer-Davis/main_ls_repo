// 2
// 2
// 2
// 2
// 2
// 2


// NaN
// NaN


let RECTANGLE = {
  area() {
    return this.width * this.height;
  },
  perimeter() {
    return 2 * (this.width + this.height);
  },
};

function Rectangle(width, height) {
  this.width = width;
  this.height = height;
  this.area = RECTANGLE.area.call(this);
  this.perimeter = RECTANGLE.perimeter.call(this);
}

let rect1 = new Rectangle(2, 3);
console.log(rect1.area);
console.log(rect1.perimeter);


function Circle(radius) {
  this.radius = radius;
  this.area = () => Math.PI * Math.pow(this.radius, 2);
}

let a = new Circle(3);
let b = new Circle(4);

console.log(a.area().toFixed(2)); // => 28.27
console.log(b.area().toFixed(2)); // => 50.27


// true
// Ninja assigns its function prototype (the object pointed to by Ninja.prototype)
// as the object prototype of ninja when it is invoked as a constructor. Then, when
// ninja invokes swingSword(), it searches up its prototypal chain for a method
// with that name. It does not find it locally, but finds it in the next step up--
// its object prototype. It then invokes that method (this being ninja, since the
// ninja object is the one invoking it), returning this.swing. Again, it looks at
// its prototypal chain to find a swing variable but this time finds it locally
// and returns it.


// This will throw a TypeError
// When Ninja is invoked as a constructor for ninja, its function prototype is an
// empty object--thus, ninja's object prototype is an empty object. Ninja's function
// prototype is then reassigned to an object with a swingSword method, but this
// doesn't change the object prototype that ninja has access to. Thus, ninja will
// look up its prototypal chain for a swingSword method, not find one, and throw
// a TypeError.


let ninjaA;
let ninjaB;
function Ninja() {
  this.swung = false;
}

ninjaA = new Ninja();
ninjaB = new Ninja();

Ninja.prototype.swing = function() {
  this.swung = true;
  return this;
}

console.log(ninjaA.swing().swung);      // must log true
console.log(ninjaB.swing().swung);      // must log true


ninjaA = (function() {
  function Ninja(){};
  return new Ninja();
})();

ninjaB = Object.create(Object.getPrototypeOf(ninjaA));

console.log(ninjaB.constructor === ninjaA.constructor);    // should log true