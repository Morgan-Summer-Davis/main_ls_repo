// interface GenericObject {
//   [key: string]: unknown;
// }

// function getProperty(obj: GenericObject, key: string) {
//   return obj[key];
// }


function getProperty<T>(obj: T, key: keyof T): T[keyof T] {
  return obj[key];
}

const obj = {
  name: "John",
  age: 30,
};

const x = getProperty(obj, "name");
const y = getProperty(obj, "age");