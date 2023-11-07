// Yes, at runtime. input will never result in compile-time errors since its
// checks are removed, but because TypeScript will still export the JavaScript
// it will run and fail at runtime

function processInput(input: string | number | any[]) {
  switch (typeof input) {
    case 'string':
      console.log(input.toUpperCase());
      break;
    case 'number':
      console.log(input.toFixed(2));
      break;
    case 'object':
      console.log(input.length);
  }
}

processInput("hello");
processInput(42);
processInput([1, 2, 3]);