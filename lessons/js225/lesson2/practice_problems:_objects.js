let invoices = {
  unpaid: [],
  paid: [],
  add(name, amount) {
    this.unpaid.push({ name, amount });
  },
  totalDue() {
    return this.unpaid.reduce((total, account) => account.amount + total, 0);
  },
  totalPaid() {
    return this.paid.reduce((total, account) => account.amount + total, 0);
  },
  payInvoice(name) {
    let newUnpaid = [];
    this.unpaid.forEach(invoice => {
      if (invoice.name === name) this.paid.push(invoice);
      else                       newUnpaid.push(invoice);
    })

    this.unpaid = newUnpaid;
  },
};

invoices.add('Due North Development', 250);
invoices.add('Moonbeam Interactive', 187.50);
invoices.add('Slough Digital', 300);

invoices.payInvoice('Due North Development');
invoices.payInvoice('Slough Digital');

console.log(invoices.totalPaid());
console.log(invoices.totalDue());