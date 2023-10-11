function makeAccount(number) {
  let availBalance = 0;
  let transactions = [];

  return {
    balance() {
      return availBalance;
    },
    number() {
      return number;
    },
    deposit(amount) {
      availBalance += amount;
      transactions.push({ type: 'deposit', amount });

      return amount;
    },
    withdraw(amount) {
      amount = amount > availBalance ? availBalance : amount;
      availBalance -= amount;
      transactions.push({ type: 'withdrawal', amount });

      return amount;
    },
    transactions() {
      return transactions;
    }
  }
}

function makeBank() {
  let nextAccountNum = 100;
  let accounts = [];

  return {
    openAccount() {
      nextAccountNum += 1;
      return accounts[accounts.push(makeAccount(nextAccountNum)) - 1];
    },
    transfer(source, dest, amount) {
      return dest.deposit(source.withdraw(amount));
    }
  }
}

let bank = makeBank();
let acct1 = bank.openAccount();
let acct2 = bank.openAccount();
acct1.deposit(100);
acct2.deposit(10);
console.log(acct1.balance());
bank.transfer(acct1, acct2, 50);
console.log(acct1.balance());
console.log(acct2.balance());
console.log(acct1.number());
console.log(acct2.number());
console.log(acct2.number);
console.log(acct1.transactions());