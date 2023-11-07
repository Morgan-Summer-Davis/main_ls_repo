// False. JavaScript will convert the keys to strings after TypeScript compiles
// them.


// Answer commented out to appease TypeScript, as its target is currently ES3,
// which does not support Maps.

// type User = Map<number, string>;

// const obj: User = new Map();
// obj.set(1, "Jane");
// obj.set(2, "30");
// obj.set(3, "female");

// console.log(Object.keys(obj).every((key) => typeof key === "number")); // Output: true