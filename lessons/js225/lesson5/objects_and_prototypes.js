let prot = {};

let foo = Object.create(prot);


Object.getPrototypeOf(foo) === prot;


prot.isPrototypeOf(foo);


// true
// true