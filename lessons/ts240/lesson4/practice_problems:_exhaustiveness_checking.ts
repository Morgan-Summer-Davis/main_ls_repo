type Elephant = {
  kind: "elephant";
  weight: number;
};

type Tiger = {
  kind: "tiger";
  speed: number;
};

type Peacock = {
  kind: "peacock";
  featherLength: number;
};

type Giraffe = {
  kind: "giraffe";
  height: number;
}

// Giraffe commented out only so my IDE is not constantly complaining of a TypeError
type Animal = Elephant | Tiger | Peacock //| Giraffe;

function describeAnimal(animal: Animal): string {
  switch (animal.kind) {
    case 'elephant':
      return `An elephant weighs ${animal.weight} kg.`
    case 'tiger':
      return `A tiger can run ${animal.speed} kmph.`
    case 'peacock':
      return `A peacock has ${animal.featherLength} cm feathers.`
    default:
      let _exhaustivenessCheck: never = animal;
      throw new Error(`Invalid animal: ${JSON.stringify(_exhaustivenessCheck)}`)
  }
}

// Calling describeAnimal with a giraffe will throw our custom error, logging
// a stringified version of the offending object.