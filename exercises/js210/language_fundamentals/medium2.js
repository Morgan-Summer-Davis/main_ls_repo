// Defaults
// 0 is falsy. Additionally, parameters are only tested against falsy values. If a parameter
// is provided a non-falsy, non-Number value, the function will fail.


// Equal
const person = { name: 'Victor' };
const otherPerson = person;

console.log(person === otherPerson);


// Amount Payable
40
45
// Because startingBalance is within totalPayable's closure, it can see reassignments
// during invocation.


// Caller
function makeDoubler(caller) {
  return number => {
    console.log(`This function was called by ${caller}.`);
    return number + number;
  }
}


// What's My Value?
3
4
3
5
// The length property only counts the total number of elements, not properties.


// Length
['JavaScript', 'Ruby', 'Python']
3
['JavaScript', 'Ruby', 'Python', <1 empty item>]
4
['JavaScript']
1
['JavaScript', <2 empty items>]
3
['JavaScript', <1 empty item>, 'Python']
undefined
3


// The Red Pill
'Welcome'
'to'
'the'
'Matrix!'