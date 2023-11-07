type Dog = {
  kind: 'dog';
  name: string;
  age: number;
}

type Bird = {
  kind: 'bird';
  name: string;
  wingspan: number;
}

type Animal = Dog | Bird// implementation for Animal

function describeAnimal(animal: Animal): string {
  switch (animal.kind) {
    case 'dog':
      return `${animal.name} is a ${animal.age} year(s) old dog.`
    case 'bird':
      return `${animal.name} is a bird with a ${animal.wingspan} cm wingspan.`
    default:
      let _never: never = animal;
      throw new Error('Invalid animal');
  }
}