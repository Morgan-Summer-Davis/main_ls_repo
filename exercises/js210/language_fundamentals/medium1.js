// Logical Operation
false
undefined
undefined
false
false
undefined
'a'
'a'
undefined
undefined


// Conditional Loop
// No. Since i is not iterated if the number is divisible equally by 3, it will
// print 0 infinitely.


// Multiplication Table
// No, it returns a table for 1 through 9.


// Selected Columns
// Because the length variable is initialzed using var, it has function scope
// and the second assignment reassigns the first.


// Counter
15
NaN
15
SyntaxError


// Logger
// debugIt will log "debugging" because the variable status is within its closure.


// Invoice
function invoiceTotal(...amounts) {
  return amounts.reduce((total, num) => total + num, 0);
}


// Product of Sums
// No--sum is initialized to undefined and not reassigned before the for loop,
// so sum will be returned as NaN.