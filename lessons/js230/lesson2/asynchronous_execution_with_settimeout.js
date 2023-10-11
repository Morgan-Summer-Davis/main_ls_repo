function delayLog() {
  for (let i = 1; i <= 10; i += 1) {
    setTimeout(() => console.log(i), i * 1000);
  }
}


setTimeout(() => {      // 1
  console.log('Once');  // 5
}, 1000);

setTimeout(() => {      // 2
  console.log('upon');  // 7
}, 3000);

setTimeout(() => {      // 3
  console.log('a');     // 6
}, 2000);

setTimeout(() => {      // 4
  console.log('time');  // 8
}, 4000);


// g, f, d, z, n, s, q


function afterNSeconds(callback, seconds) {
  setTimeout(callback, seconds * 1000);
}