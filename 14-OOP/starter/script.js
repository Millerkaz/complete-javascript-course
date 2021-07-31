'use strict';

//Challenge--1

//Q1
function Car(make, speed) {
  this.make = make;
  this.speed = speed;
}

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`${this.make} is going at ${this.speed}`);
};

Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`${this.make} is going at ${this.speed}`);
};

//Q2
class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }
  accelerate() {
    this.speed += 10;
    console.log(`${this.make} is ${this.speed} km/h .`);
    return this;
  }
  brake() {
    this.speed -= 5;
    console.log(`${this.make} is ${this.speed} km/h .`);
    return this;
  }
  get speedToUS() {
    console.log(`Change to US speed (mi/h)`);
    return (this.speed = this.speed / 1.6);
  }
  set speedToUS(speed) {
    this.speedUS = speed * 1.6;
  }
}

//Q3
function EV(make, speed, charge) {
  Car.call(this, make, speed);
  this.charge = charge;
}

EV.prototype = Object.create(Car.prototype);
EV.prototype.constructor = EV;
EV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
};
EV.prototype.accelerate = function () {
  this.speed += 20;
  this.charge -= 1;
  console.log(
    `${this.make} going at ${this.speed} km/h , with a charge of ${this.charge}%.`
  );
};

const tesla = new EV('Tesla', 120, 23);

//Q4
class EVCl extends CarCl {
  #charge;
  constructor(make, speed, charge) {
    super(make, speed);
    this.#charge = charge;
  }

  accelerate() {
    this.speed += 20;
    this.#charge -= 1;
    console.log(
      `${this.make} going at ${this.speed} km/h , with a charge of ${
        this.#charge
      }%.`
    );
    return this;
  }

  chargeBattery(chargeTo) {
    this.#charge += chargeTo;
    return this;
  }
}
const car1 = new EVCl('Rivian', 120, 23);
