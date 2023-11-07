// The second will cause a type error. While neither will result in a runtime
// error, line 5 of the second option will result in a compile time error, as
// it cannot be known that y is a string at that time

// No. On line 5, userInput is still unknown and has not been narrowed. Thus
// userName cannot be assigned to it.

function processData(data: unknown): string {
  switch (typeof data) {
    case 'string':
      return 'Hello, ' + data;
    case 'number':
      return 'Age: ' + String(data);
    default:
      throw new Error('Invalid data');
  }
}

// Usage
console.log(processData("Alice")); // Should print: "Hello, Alice"
console.log(processData(25)); // Should print: "Age: 25"
console.log(processData(true)); // Should throw an error: "Invalid data"