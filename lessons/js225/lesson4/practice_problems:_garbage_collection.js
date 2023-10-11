// Yes--this means developers need not allocate and release memory manually


// Primitive values are not garbage collected, so 1 will never be eligible.
// The array will be eligible on line 10.


// No, it is not. greeting maintains a reference to the function found in makeGreeting,
// which in turn maintains a reference to foo


// Only if bash is ever reassigned or out of scope--otherwise, it will persist
// until the termination of the program