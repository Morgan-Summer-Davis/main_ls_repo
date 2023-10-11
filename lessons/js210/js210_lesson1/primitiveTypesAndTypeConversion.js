let x = Number('13');
let y = 9;
console.log(x + y);

x = '13';
y = 9;
console.log(x * y);  // => 111 (Number)

let npa = String(212);
let nxx = (555).toString();
let num = 1212 + '';  // bad
console.log(npa + nxx + num);