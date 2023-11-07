// This definition will result in an error, as the optional argument in the
// constructor function precedes the mandatory one.

interface Movable {
  speed: number;
  move(): void;
}

class Car implements Movable {
  speed: number;
  
  constructor(speed: number) {
    this.speed = speed;
  }
  
  move = (): void => {
    console.log(this.speed);
  }
}