let myArray = {
  0:        0,
  1:        1,
  2:        2,
  'length': 3,
};

console.log(myArray);

for (let i = 0; i < myArray.length; i += 1) {
  console.log(myArray[i]);
}


let obj = {
  b: 2,
  a: 1,
  c: 3,
};

console.log(obj);

console.log(Object.entries(obj).reduce((result, arr) => {
  result[arr[0].toUpperCase()] = arr[1];
  return result;
}, {}));

console.log(obj);


let myProtoObj = {
  foo: 1,
  bar: 2,
};

let myObj = Object.create(myProtoObj);


let objToCopy = {
  foo: 1,
  bar: 2,
  qux: 3,
};

function copyObj(obj, keys = Object.keys(obj)) {
  return keys.reduce((result, key) => {
    result[key] = obj[key];
    return result;
  }, {});
}

let newObj = copyObj(objToCopy);
console.log(newObj);        // => { foo: 1, bar: 2, qux: 3 }

let newObj2 = copyObj(objToCopy, [ 'foo', 'qux' ]);
console.log(newObj2);       // => { foo: 1, qux: 3 }

let newObj3 = copyObj(objToCopy, [ 'bar' ]);
console.log(newObj3);       // => { bar: 2 }