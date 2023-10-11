function makeList() {
  let items = [];

  return {
    add(item) {
      console.log(items[items.push(item) - 1] + ' added!');
    },
    remove(item) {
      if (!items.includes(item)) return console.log('Item not in list');

      console.log(items.splice(items.indexOf(item), 1) + ' removed!');
    },
    list() {
      items ? items.forEach(elem => console.log(elem)) : console.log('The list is empty!');
    }
  };
}

let list = makeList();
list.add('peas'); // peas added!
list.list(); // peas
list.add('corn'); // corn added!
list.list();
//peas
//corn
list.remove('peas'); // peas removed!
list.list(); // corn
console.log(list.items); // undefined