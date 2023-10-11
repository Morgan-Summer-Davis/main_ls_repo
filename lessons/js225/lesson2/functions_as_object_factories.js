function makeCar(rate, brakingRate) {
  return {
    speed: 0,
    rate,
    brakingRate,
    accelerate() {
      this.speed += this.rate;
    },
    brake() {
      this.speed = Math.max(this.speed - this.brakingRate, 0);
    },
  };
}

let hatchback = makeCar(9);