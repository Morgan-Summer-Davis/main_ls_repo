// new Promise((resolve, reject) => {
//   setTimeout(() => resolve('Launch School'), 2000);
// }).then(ls => console.log(ls));


new Promise((resolve, reject) => {
  setTimeout(() => reject('Error: Not Launch School'), 2000);
}).catch(ls => console.log(ls));