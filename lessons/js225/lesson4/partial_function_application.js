function greet(greeting, name) {
  console.log(greeting[0].toUpperCase() + greeting.slice(1) + ', ' + name + '!');
}

greet('howdy', 'Joe'); // Howdy, Joe!
greet('good morning', 'Sue'); // Good morning, Sue!

function partial(primary, arg1) {
  return function(arg2) {
    primary(arg1, arg2);
  }
}

let sayHi    = partial(greet, 'hi');
let sayHello = partial(greet, 'hello');

sayHi('Joel');
sayHello('Steve');