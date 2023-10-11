// 1. The objects output by them definitionally will have all data and methods
//    defined by the output of the function, causing possible redundancy.
// 2. There is no way to find which function produced the object.


function makeObj() {
  return {
    propA: 10,
    propB: 20,
  }
}

function createInvoice(services = {}) {
  return {
    phone:    services.phone || 3000,
    internet: services.internet || 5500,
    total() {
      return Object.values(this).reduce((a, b) => a + (typeof b === 'number' ? b : 0), 0);
    }
  };
}

function invoiceTotal(invoices) {
  let total = 0;
  let i;

  for (i = 0; i < invoices.length; i += 1) {
    total += invoices[i].total();
  }

  return total;
}

let invoices = [];
invoices.push(createInvoice());
invoices.push(createInvoice({
  internet: 6500,
}));

invoices.push(createInvoice({
  phone: 2000,
}));

invoices.push(createInvoice({
  phone: 1000,
  internet: 4500,
}));

console.log(invoiceTotal(invoices));             // => 31000


function createPayment(services = {}) {
  return {
    phone:    services.phone || 0,
    internet: services.internet || 0,
    amount:   services.amount,
    total() {
      if (this.amount !== undefined) return this.amount;

      return Object.values(this).reduce((a, b) => a + (typeof b === 'number' ? b : 0), 0);
    }
  }
}

function paymentTotal(payments) {
  let total = 0;
  let i;

  for (i = 0; i < payments.length; i += 1) {
    total += payments[i].total();
  }

  return total;
}

let payments = [];
payments.push(createPayment());
payments.push(createPayment({
  internet: 6500,
}));

payments.push(createPayment({
  phone: 2000,
}));

payments.push(createPayment({
  phone: 1000,
  internet: 4500,
}));

payments.push(createPayment({
  amount: 10000,
}));

console.log(paymentTotal(payments));      // => 24000


function createInvoice(services = {}) {
  return {
    phone:    services.phone || 3000,
    internet: services.internet || 5500,
    payments: [],
    total() {
      return Object.values(this).reduce((a, b) => a + (typeof b === 'number' ? b : 0), 0);
    },
    addPayment(payment) {
      this.payments.push(payment);
    },
    addPayments(payments) {
      payments.forEach(payment => this.addPayment(payment));
    },
    amountDue() {
      return Math.max(0, this.total() -
             this.payments.map(p => Object.values(p))
                          .flat()
                          .reduce((a, b) => a + (typeof b === 'number' ? b : 0), 0));
    }
  };
}

let invoice = createInvoice({
  phone: 1200,
  internet: 4000,
});

let payment1 = createPayment({
  amount: 2000,
});

let payment2 = createPayment({
  phone: 1000,
  internet: 1200,
});

let payment3 = createPayment({
  phone: 1000,
});

invoice.addPayment(payment1);
invoice.addPayments([payment2, payment3]);
console.log(invoice.total());
console.log(invoice.amountDue());       // this should return 0