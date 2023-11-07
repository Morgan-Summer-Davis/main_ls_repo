type CustomArray = {
  [index: number]: string | number;
};

const customArray: CustomArray = ["apple", 42, "banana"];

function processCustomArray(arr: CustomArray) {
  let results = [];
  
  Object.keys(arr).forEach(key => {
    if (typeof arr[key] === 'string') results.push(arr[key].toUpperCase());
  });
  
  return results;
}