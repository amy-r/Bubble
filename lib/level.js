const {Obstacle, Auto, Tractor, SlowCar, Semi, FastCar, Snake} = require('./obstacle.js');
const {Platform, Turtle, Crocodile} = require('./platform.js');

class Level {
  // constructor(homes) {
  constructor(squareWidth) {
    this.lives = 5;
    this.timeRemaining = 60;
    this.currentLevel = 1;
    this.gameOver = false;
    this.frameTick = 0;
    this.squareWidth = squareWidth;
    // this.homes = homes;
  }

  death() {
    if (this.lives === 0) {
      this.gameOver = true;
    } else {
      this.lives --;
    }
  }

  drawTimer() {
    if (this.timeRemaining === 0) {
      this.death();
      return false;
    }
    this.frameTick++;
    if (this.frameTick === 15) {
      this.timeRemaining -= .25;
    }
    //draw timer
  }

  next() {
    this.currentLevel ++;
  }

  buildRoadLevel() {
    let autos = [];

    autos = this.buildRoadRow(Tractor, 614.5, 1, -2, 4, 4, 4, 'yellow');
    autos = autos.concat(this.buildRoadRow(SlowCar, 564.5, 2, 1, 5, 3, 4, 'pink'))
    autos = autos.concat(this.buildRoadRow(FastCar, 514.5, 2, 3, 3, 4, 3, 'red'));
    autos = autos.concat(this.buildRoadRow(Semi, 464.5, 5, -3, 3, 3, 4, 'orange'));
    return autos;
  }

  buildRiverLevel() {
    let rivers = [];

    rivers = this.buildRiverRow(Turtle, 364.5, 3, -2, 3, 6, 0);
    rivers = rivers.concat(this.buildRiverRow (Platform, 314.5, 3, 3, 2, 4, 2));
    rivers = rivers.concat(this.buildRiverRow (Platform, 264.5, 7, 4, 3, 3, 8));
    rivers = rivers.concat(this.buildRiverRow(Turtle, 214.5, 4, -3, 2, 6, 17));
    rivers = rivers.concat(this.buildRiverRow (Platform, 164.5, 4, 2, 3, 3, 2));
    return rivers;
  }

  buildRoadRow(vehicleType, yCoordinate, carLength, speed, gap, numCars, offset, color) {
    let Type = vehicleType;
    let vehicleyCoordinate = yCoordinate;
    let vehicleLength = carLength * this.squareWidth;
    let vehicleSpeed = speed;
    let vehicleGap = gap * this.squareWidth;
    let numVehicles = numCars;
    let rowOffset = offset * this.squareWidth;
    let roadArray = [];

    for (let i = 0; i < numVehicles; i++) {
      roadArray.push(new Type((vehicleLength + vehicleGap) * i, vehicleyCoordinate, vehicleLength, vehicleSpeed, vehicleGap, rowOffset, color));
    }
    return roadArray;
  }

  buildRiverRow (PlatformType, yCoordinate, platformLength, platformSpeed, platformGap, numPlatforms, platformOffset) {
    let riverArray = [];

    for (let i = 0; i < numPlatforms; i++) {
      if (PlatformType === Turtle) {
        riverArray.push(new PlatformType((platformLength * this.squareWidth + platformGap * this.squareWidth) * i,
        yCoordinate, platformLength * this.squareWidth, platformSpeed, platformGap * this.squareWidth, platformOffset * this.squareWidth,
        i % 3 === 0 ? true : false));
      } else {
        riverArray.push(new PlatformType((platformLength * this.squareWidth + platformGap * this.squareWidth) * i,
        yCoordinate, platformLength * this.squareWidth, platformSpeed, platformGap * this.squareWidth, platformOffset * this.squareWidth))
      }

    }
    return riverArray;
  }
}

module.exports = Level;