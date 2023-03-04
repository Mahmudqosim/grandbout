// All characters

const samurai = {
  idle: { imageSrc: "/src/images/Samurai/Idle.png", numOfFrames: 8 },
  run: { imageSrc: "/src/images/Samurai/Run.png", numOfFrames: 8 },
  jump: { imageSrc: "/src/images/Samurai/Jump.png", numOfFrames: 2 },
  fall: { imageSrc: "/src/images/Samurai/Fall.png", numOfFrames: 2 },
  attack1: { imageSrc: "/src/images/Samurai/Attack1.png", numOfFrames: 6 },
  attack2: { imageSrc: "/src/images/Samurai/Attack2.png", numOfFrames: 6 },
  takeHit: { imageSrc: "/src/images/Samurai/TakeHit.png", numOfFrames: 4 },
  death: { imageSrc: "/src/images/Samurai/Death.png", numOfFrames: 6 },
  offset: {
    x: 150,
    y: 96,
  },
  attackBox: {
    offset: {
      x: 65,
      y: 10,
    },
    flipOffset: {
      x: 135,
      y: 0,
    },
    width: 170,
    height: 130,
  },
  scale: 2,
  attackFrame: 4
}

const kenji = {
  idle: { imageSrc: "/src/images/Kenji/Idle.png", numOfFrames: 4 },
  run: { imageSrc: "/src/images/Kenji/Run.png", numOfFrames: 8 },
  jump: { imageSrc: "/src/images/Kenji/Jump.png", numOfFrames: 2 },
  fall: { imageSrc: "/src/images/Kenji/Fall.png", numOfFrames: 2 },
  attack1: { imageSrc: "/src/images/Kenji/Attack1.png", numOfFrames: 4 },
  attack2: { imageSrc: "/src/images/Kenji/Attack1.png", numOfFrames: 4 },
  takeHit: { imageSrc: "/src/images/Kenji/TakeHit.png", numOfFrames: 3 },
  death: { imageSrc: "/src/images/Kenji/Death.png", numOfFrames: 7 },
  attackBox: {
    offset: {
      x: 30,
      y: 25,
    },
    flipOffset: {
      x: 100,
      y: 0,
    },
    width: 170,
    height: 120,
  },
  offset: {
    x: 170,
    y: 105,
  },
  scale: 2,
  attackFrame: 2
}

const fantasyWarrior = {
  idle: { imageSrc: "/src/images/FantasyWarrior/Idle.png", numOfFrames: 10 },
  run: { imageSrc: "/src/images/FantasyWarrior/Run.png", numOfFrames: 8 },
  jump: { imageSrc: "/src/images/FantasyWarrior/Jump.png", numOfFrames: 3 },
  fall: { imageSrc: "/src/images/FantasyWarrior/Fall.png", numOfFrames: 3 },
  attack1: {
    imageSrc: "/src/images/FantasyWarrior/Attack1.png",
    numOfFrames: 8,
  },
  attack2: {
    imageSrc: "/src/images/FantasyWarrior/Attack2.png",
    numOfFrames: 7,
  },
  takeHit: {
    imageSrc: "/src/images/FantasyWarrior/TakeHit.png",
    numOfFrames: 3,
  },
  death: { imageSrc: "/src/images/FantasyWarrior/Death.png", numOfFrames: 7 },
  offset: {
    x: 125,
    y: 50,
  },
  attackBox: {
    offset: {
      x: 40,
      y: 0,
    },
    flipOffset: {
      x: 100,
      y: 0,
    },
    width: 155,
    height: 150,
  },
  scale: 2,
  attackFrame: 4
}

const knight = {
  idle: { imageSrc: "/src/images/Knight/Idle.png", numOfFrames: 11 },
  run: { imageSrc: "/src/images/Knight/Run.png", numOfFrames: 8 },
  jump: { imageSrc: "/src/images/Knight/Jump.png", numOfFrames: 3 },
  fall: { imageSrc: "/src/images/Knight/Fall.png", numOfFrames: 3 },
  attack1: {
    imageSrc: "/src/images/Knight/Attack1.png",
    numOfFrames: 7,
  },
  attack2: {
    imageSrc: "/src/images/Knight/Attack2.png",
    numOfFrames: 7,
  },
  takeHit: {
    imageSrc: "/src/images/Knight/TakeHit.png",
    numOfFrames: 4,
  },
  death: { imageSrc: "/src/images/Knight/Death.png", numOfFrames: 11 },
  offset: {
    x: 125,
    y: 77,
  },
  attackBox: {
    offset: {
      x: 70,
      y: 0,
    },
    flipOffset: {
      x: 140,
      y: 0,
    },
    width: 160,
    height: 150,
  },
  scale: 2,
  attackFrame: 4
}

const medievalWarrior = {
  idle: { imageSrc: "/src/images/MedievalWarrior/Idle.png", numOfFrames: 6 },
  run: { imageSrc: "/src/images/MedievalWarrior/Run.png", numOfFrames: 8 },
  jump: { imageSrc: "/src/images/MedievalWarrior/Jump.png", numOfFrames: 2 },
  fall: { imageSrc: "/src/images/MedievalWarrior/Fall.png", numOfFrames: 2 },
  attack1: {
    imageSrc: "/src/images/MedievalWarrior/Attack1.png",
    numOfFrames: 4,
  },
  attack2: {
    imageSrc: "/src/images/MedievalWarrior/Attack2.png",
    numOfFrames: 4,
  },
  takeHit: {
    imageSrc: "/src/images/MedievalWarrior/TakeHit.png",
    numOfFrames: 3,
  },
  death: { imageSrc: "/src/images/MedievalWarrior/Death.png", numOfFrames: 9 },
  offset: {
    x: 75,
    y: 5,
  },
  attackBox: {
    offset: {
      x: 20,
      y: 0,
    },
    flipOffset: {
      x: 60,
      y: 0,
    },
    width: 130,
    height: 150,
  },
  scale: 1.25,
  attackFrame: 2
}

const medievalKing = {
  idle: { imageSrc: "/src/images/MedievalKing/Idle.png", numOfFrames: 8 },
  run: { imageSrc: "/src/images/MedievalKing/Run.png", numOfFrames: 8 },
  jump: { imageSrc: "/src/images/MedievalKing/Jump.png", numOfFrames: 2 },
  fall: { imageSrc: "/src/images/MedievalKing/Fall.png", numOfFrames: 2 },
  attack1: {
    imageSrc: "/src/images/MedievalKing/Attack1.png",
    numOfFrames: 4,
  },
  attack2: {
    imageSrc: "/src/images/MedievalKing/Attack2.png",
    numOfFrames: 4,
  },
  takeHit: {
    imageSrc: "/src/images/MedievalKing/TakeHit.png",
    numOfFrames: 4,
  },
  death: { imageSrc: "/src/images/MedievalKing/Death.png", numOfFrames: 6 },
  offset: {
    x: 120,
    y: 55,
  },
  attackBox: {
    offset: {
      x: 50,
      y: 0,
    },
    flipOffset: {
      x: 120,
      y: 0,
    },
    width: 150,
    height: 150,
  },
  scale: 2,
  attackFrame: 2
}

export { samurai, kenji, fantasyWarrior, knight, medievalWarrior, medievalKing }
