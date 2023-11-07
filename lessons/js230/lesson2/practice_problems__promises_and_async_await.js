new Promise((resolve, reject) => {
  setTimeout(() => resolve('Launch School'), 2000);
}).then(ls => console.log(ls));


new Promise((resolve, reject) => {
  setTimeout(() => reject('Error: Not Launch School'), 2000);
}).catch(ls => console.log(ls));


// I am NOT a Promise
// I am a Promise


// foo
// bar
// qux
// baz


// foo
// bar
// abc
// qux


// 1
// 3
// 6
// undefined


// Got it!


// 18 after two seconds


// 18 after two seconds


// 18 after two seconds, then 12 after another two seconds (four from initial runtime)


// 2
// 3
// 1


// A
// B


// E
// B