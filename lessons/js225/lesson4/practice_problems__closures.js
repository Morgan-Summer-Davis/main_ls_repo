function makeMultipleLister(num) {
  return () => {
    let i = num;
    while (i < 100) {
      console.log(i);
      i += num;
    }
  }
}

let lister = makeMultipleLister(13);
lister();


let count = 0;
let add =      (num) => count += num;
let subtract = (num) => count -= num;

console.log(add(1));
console.log(add(42));
console.log(subtract(39));
console.log(add(6));


//There is no way to do that