interface Animal {
  name: string;
  makeSound(): string;
}

interface Dog extends Animal {
  fetch(): string;
}

const myDog: Dog = {
  name: 'Rex',
  makeSound: () => "Generic animal sound",
  fetch: () => `${myDog.name} fetches a stick.`,
};

console.log(myDog.fetch());