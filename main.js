import { checkScreenOrientation } from "./src/screen"

import { Player } from "./src/classes/Player"
import { Sprite } from "./src/classes/Sprite"
import { determineWinner, rectangularCollisionDetection } from "./src/utils"

import backgroundImage1 from "./src/images/background_1.png"
import backgroundImage2 from "./src/images/background_2.png"

import "./src/styles/style.css"
import {
  fantasyWarrior,
  kenji,
  knight,
  medievalKing,
  medievalWarrior,
  samurai,
} from "./src/characters"

checkScreenOrientation()

const playerHealthBar = document.querySelector(".player-health .dummy")
const enemyHealthBar = document.querySelector(".enemy-health .dummy")

const allCharacters = [
  { name: "Fantasy Warrior", character: fantasyWarrior },
  { name: "Samurai Kenji", character: kenji },
  { name: "Knight of Valor", character: knight },
  { name: "Medieval King", character: medievalKing },
  { name: "Medieval Warrior", character: medievalWarrior },
  { name: "Zorojuro", character: samurai },
]

const timerEl = document.querySelector(".timer")

const canvas = document.querySelector("#game")

const context = canvas.getContext("2d")

let width = 1024
let height = 576

canvas.width = width
canvas.height = height

context.fillRect(0, 0, canvas.width, canvas.height)

function resize() {
  let scaleX = window.innerWidth / width
  let scaleY = window.innerHeight / height

  let scale = Math.min(scaleX, scaleY, 3)

  width = canvas.width
  height = canvas.height

  canvas.style.width = `${width * scale}px`
  canvas.style.height = `${height * scale}px`
  canvas.style.imageRendering = "pixelated"
  context.imageSmoothingEnabled = false
}

window.addEventListener("resize", resize)

resize()

function randomCharacters() {
  let playerCharacterIndex = Math.floor(Math.random() * allCharacters.length)
  let playerCharacter = allCharacters[playerCharacterIndex].character

  let newList = [
    ...allCharacters.slice(0, playerCharacterIndex),
    ...allCharacters.slice(playerCharacterIndex + 1),
  ]

  let enemyCharacterIndex = Math.floor(Math.random() * newList.length)
  let enemyCharacter = newList[enemyCharacterIndex].character

  return { player: playerCharacter, enemy: enemyCharacter }
}

const characters = randomCharacters()

console.log(characters)

const background = new Sprite(canvas, context, {
  position: {
    x: 0,
    y: 0,
  },
  image:
    Math.floor(Math.random() * 2) === 0 ? backgroundImage1 : backgroundImage2,
})

const player = new Player(canvas, context, {
  position: {
    x: 0,
    y: 0,
  },
  velocity: { x: 0, y: 0 },
  image: characters.player.idle.imageSrc,
  numOfFrames: characters.player.idle.numOfFrames,
  scale: characters.player.scale,
  offset: characters.player.offset,
  sprites: {
    idle: characters.player.idle,
    run: characters.player.run,
    jump: characters.player.jump,
    fall: characters.player.fall,
    attack1: characters.player.attack1,
    attack2: characters.player.attack2,
    takeHit: characters.player.takeHit,
    death: characters.player.death,
  },
  attackBox: characters.player.attackBox,
  attackFrame: characters.player.attackFrame,
})

player.draw()

const enemy = new Player(canvas, context, {
  position: { x: canvas.width - 100, y: 0 },
  velocity: { x: 0, y: 0 },
  image: characters.enemy.idle.imageSrc,
  numOfFrames: characters.enemy.idle.numOfFrames,
  scale: characters.enemy.scale,
  offset: characters.enemy.offset,
  sprites: {
    idle: characters.enemy.idle,
    run: characters.enemy.run,
    jump: characters.enemy.jump,
    fall: characters.enemy.fall,
    attack1: characters.enemy.attack1,
    attack2: characters.enemy.attack2,
    takeHit: characters.enemy.takeHit,
    death: characters.enemy.death,
  },
  attackBox: characters.enemy.attackBox,
  attackFrame: characters.enemy.attackFrame,
})

enemy.flipPlayer = true
enemy.draw()

/* Timer */
let timer = 60
let timerId

function decreaseTimer() {
  if (timer > 0) {
    timerId = setTimeout(decreaseTimer, 1000)
    timer--
    timerEl.textContent = timer

    return
  }

  if (timer === 0) determineWinner({ player1: player, player2: enemy, timerId })
}

decreaseTimer()
//

const keys = {
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
  w: {
    pressed: false,
  },
  z: {
    pressed: false,
  },
  ArrowRight: {
    pressed: false,
  },
  ArrowLeft: {
    pressed: false,
  },
  ArrowUp: {
    pressed: false,
  },
}

function animate() {
  window.requestAnimationFrame(animate)

  context.fillStyle = "black"
  context.fillRect(0, 0, canvas.width, canvas.height)

  background.update()

  player.update()

  enemy.update()

  player.velocity.x = 0
  enemy.velocity.x = 0

  // Player Movement
  if (keys.a.pressed && player.lastKey === "a") {
    if (player.position.x + player.width <= 15) {
      player.velocity.x = 0
    } else {
      player.velocity.x = -5
      player.switchSprite("run")
    }
  } else if (keys.d.pressed && player.lastKey === "d") {
    if (player.position.x + player.width >= canvas.width - 15) {
      player.velocity.x = 0
    } else {
      player.velocity.x = 5
      player.switchSprite("run")
    }
  } else {
    player.switchSprite("idle")
  }

  // Jump Sprite
  if (player.velocity.y < 0) {
    player.switchSprite("jump")
  } else if (player.velocity.y > 0) {
    // Fall Sprite
    player.switchSprite("fall")
  }

  // Enemy Movement
  if (keys.ArrowLeft.pressed && enemy.lastKey === "ArrowLeft") {
    if (enemy.position.x + enemy.width <= 15) {
      enemy.velocity.x = 0
    } else {
      enemy.velocity.x = -5
      enemy.switchSprite("run")
    }
  } else if (keys.ArrowRight.pressed && enemy.lastKey === "ArrowRight") {
    if (enemy.position.x + enemy.width >= canvas.width - 15) {
      enemy.velocity.x = 0
    } else {
      enemy.velocity.x = 5
      enemy.switchSprite("run")
    }
  } else {
    enemy.switchSprite("idle")
  }

  // Jump Sprite
  if (enemy.velocity.y < 0) {
    enemy.switchSprite("jump")
  } else if (enemy.velocity.y > 0) {
    // Fall Sprite
    enemy.switchSprite("fall")
  }

  // detect for collisions
  if (
    rectangularCollisionDetection({ rect1: player, rect2: enemy }) &&
    player.isAttacking &&
    player.currentFrame === player.attackFrame
  ) {
    enemy.takeHit()
    player.isAttacking = false
    enemyHealthBar.style.width = `${enemy.health}%`
  }

  if (player.isAttacking && player.currentFrame === player.attackFrame) {
    player.isAttacking = false
  }

  if (
    rectangularCollisionDetection({ rect1: enemy, rect2: player }) &&
    enemy.isAttacking &&
    enemy.currentFrame === enemy.attackFrame
  ) {
    player.takeHit()
    enemy.isAttacking = false
    playerHealthBar.style.width = `${player.health}%`
  }

  if (enemy.isAttacking && enemy.currentFrame === enemy.attackFrame) {
    enemy.isAttacking = false
  }

  // End game
  if (enemy.health <= 0 || player.health <= 0) {
    determineWinner({ player1: player, player2: enemy, timerId })
  }
}

animate()

window.addEventListener("keydown", (e) => {
  if (!player.dead) {
    switch (e.key) {
      case "d":
        keys["d"].pressed = true
        player.lastKey = "d"
        break

      case "a":
        keys["a"].pressed = true
        player.lastKey = "a"
        break

      case "w":
        player.velocity.y = -20
        break

      case "x":
        player.attack()
        break
    }
  }

  if (!enemy.dead) {
    switch (e.key) {
      case "ArrowRight":
        keys["ArrowRight"].pressed = true
        enemy.lastKey = "ArrowRight"
        break

      case "ArrowLeft":
        keys["ArrowLeft"].pressed = true
        enemy.lastKey = "ArrowLeft"
        break

      case "ArrowUp":
        enemy.velocity.y = -20
        break

      case " ":
        enemy.attack()
        break

      default:
        break
    }
  }
})

window.addEventListener("keyup", (e) => {
  switch (e.key) {
    case "d":
      keys["d"].pressed = false
      break

    case "a":
      keys["a"].pressed = false
      break

    case "w":
      keys["a"].pressed = false
      break

    case "ArrowRight":
      keys["ArrowRight"].pressed = false
      break

    case "ArrowLeft":
      keys["ArrowLeft"].pressed = false
      break

    case "ArrowUp":
      keys["ArrowUp"].pressed = false
      break

    default:
      break
  }
})
