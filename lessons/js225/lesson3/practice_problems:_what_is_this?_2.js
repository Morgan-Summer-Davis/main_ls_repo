// myChildObject, undefined

// myObject.myChildObject.myMethod.call(myObject);

'Peter Parker is the Amzing Spiderman!'

3500

let computer = {
  price: 30000,
  shipping: 2000,
  total() {
    let tax = 3000;
    let specialDiscount = () => {
      if (this.price > 20000) {
        return 1000;
      } else {
        return 0;
      }
    }

    return this.price + this.shipping + tax - specialDiscount();
  }
};