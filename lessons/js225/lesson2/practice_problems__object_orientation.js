function makeProduct(id, name, stock, price) {
  return {
    id,
    name,
    stock,
    price,
    setPrice(price) {
      if (typeof price !== 'number' || !(price >= 0)) return console.log('Invalid price');
      this.price = price;
    },
    describe() {
      console.log('Name: '   + this.name);
      console.log('ID: '     + this.id);
      console.log('Price: $' + this.price);
      console.log('Stock: '  + this.stock);
    },
  };
}

let scissors = makeProduct(0, 'Scissors',       8,  10);
let drill    = makeProduct(1, 'Cordless Drill', 15, 45);
let pencil   = makeProduct(2, 'Pencil',         2,  113);
let plug     = makeProduct(3, 'USB Wall Plus',  12, 3);