'undefined undefined is a undefined.'
// Because the function is passed to logReturnVal, the execution context is the global object


let turk = {
  firstName: 'Christopher',
  lastName: 'Turk',
  occupation: 'Surgeon',
  getDescription() {
    return this.firstName + ' ' + this.lastName + ' is a ' + this.occupation + '.';
  }
};

function logReturnVal(func, context) {
  let returnVal = func.call(context);
  console.log(returnVal);
}

logReturnVal(turk.getDescription, turk);


let getTurkDescription = turk.getDescription.bind(turk);


// No, as this in the forEach execution refers to the global object

let TESgames = {
  titles: ['Arena', 'Daggerfall', 'Morrowind', 'Oblivion', 'Skyrim'],
  seriesTitle: 'The Elder Scrolls',
  listGames() {
    this.titles.forEach(title => {
      console.log(this.seriesTitle + ' ' + title);
    });
  }
};


TESgames = {
  titles: ['Arena', 'Daggerfall', 'Morrowind', 'Oblivion', 'Skyrim'],
  seriesTitle: 'The Elder Scrolls',
  listGames() {
    let self = this;
    this.titles.forEach(function(title) {
      console.log(self.seriesTitle + ' ' + title);
    });
  }
};


TESgames = {
  titles: ['Arena', 'Daggerfall', 'Morrowind', 'Oblivion', 'Skyrim'],
  seriesTitle: 'The Elder Scrolls',
  listGames() {
    this.titles.forEach(function(title) {
      console.log(this.seriesTitle + ' ' + title);
    }, this);
  }
};


0


let foo = {
  a: 0,
  incrementA() {
    let increment = function increment() {
      this.a += 1;
    }.bind(this);

    increment();
    increment();
    increment();
  }
};

foo.incrementA();
foo.incrementA();
foo.incrementA();