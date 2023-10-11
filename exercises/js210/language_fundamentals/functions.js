// Local vs Global Part 1
// 'This is global'
// myVar within the function shadows the global variable within the function, but
// since console.log is called from the global scope, this shadowing is irrelevant.

// Local vs Global Part 2
// 'This is local'
// Since the console.log invocation happens within the function, the shadowing now
// affects that function call.

// Local vs Global Part 3
// 'This is local'
// Since the assignment on line 4 lacks a var, let, or const to indicate that it is
// part of an initialization, it becomes a reassignment, thus reassigning the variable
// initialized on line 1 when the function is invoked.

// Variable Lookup
// 'This is global'
// In JavaScript, functions have access to gobal variables.

// Variable Scope
// 'This is global'
// Since the assignment on line 2 lacks a let, var, or const, but there is also no
// extant myVar variable, JavaScript creates a new global variable and assigns it
// the given value.

// Arguments Part 1
// 7
// myValue reassigns the value stored in b, but does not store that result in any
// way. Since primitive values are immutable, it points to a different address than
// the global a, even when they point to the same value. Thus, a remains unchanged.

// Arguments Part 2
// 7
// This is the same as part 1. The parameter a initialized on line 3 shadows the global a.

// Arguments Part 3
// [1, 2, 10]
// Because arrays are objects, not primitive values, and the square bracket operator mutates
// the array object, the value is shared between a and b and the change can be seen in either
// variable.

// Variable Declarations
// undefined
// During the creation phase, the parser sees that a variable a "will be" initialized, and so
// initializes it to undefined. Howeer, the assignment will not occur until the program actually
// reaches the relevant line. This can also be described as the initialization being
// hoisted above the function invocation.

// Function Declarations
// Hello, world!
// Function declarations are also hoisted.
// Further exploration: string
// The function declaration will be hoisted above variable assignment (and initialization,
// although that isn't relevant to the output in this case). The hoisted version of this
// code would look like so:

function logValue() {
  console.log('Hello, world!');
}

var logValue;

logValue = 'foo';

console.log(typeof logValue);