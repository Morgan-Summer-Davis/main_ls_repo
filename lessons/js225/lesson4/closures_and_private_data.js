function makeCounterLogger(initialNum) {
  return (secondNum) => {
    let i = initialNum;

    while(secondNum !== i) {
      console.log(i);
      i += i > secondNum ? -1 : 1;
    }

    console.log(secondNum);
  };
}

let countlog = makeCounterLogger(5);
countlog(8);
countlog(2);


function makeList() {
  let list = [];
  return (arg) => {
    if      (!arg && list.length > 0) list.forEach(elem => console.log(elem))
    else if (!arg)                    console.log('The list is empty.')
    else if (list.includes(arg))      console.log(list.splice(list.indexOf(arg), 1)[0] + ' removed!');
    else                              console.log(list[list.push(arg) - 1] + ' added!')

    return list;
  }
}

let list = makeList();
list();
//The list is empty.
list('make breakfast');
//make breakfast added!
list('read book');
//read book added!
list();
//make breakfast
//read book
list('make breakfast');
//make breakfast removed!
list();
//read book