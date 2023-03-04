const GRAVITY = 0.7

export class Player {
  /**
   *
   * @param {HTMLCanvasElement} canvas
   * @param {CanvasRenderingContext2D} context
   * @param {object} props
   */
  constructor(
    canvas,
    context,
    {
      position,
      velocity,
      color,
      image,
      scale = 1,
      numOfFrames = 1,
      offset = { x: 0, y: 0 },
      sprites,
      attackBox = {
        offset: {},
        flipOffset: {},
        width: undefined,
        height: undefined,
      },
      attackFrame
    }
  ) {
    this.canvas = canvas
    this.context = context

    this.position = position

    this.velocity = velocity

    this.width = 50
    this.height = 150

    this.lastKey = ""

    this.attackBox = {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      flipOffset: attackBox.flipOffset,
      offset: attackBox.offset,
      width: attackBox.width,
      height: attackBox.height,
    }
    this.isAttacking = false
    this.attackFrame = attackFrame

    this.color = color
    this.health = 100

    this.image = new Image()
    this.image.src = image

    this.scale = scale

    this.numOfFrames = numOfFrames
    this.currentFrame = 0
    this.elapsedFrame = 0
    this.frameHold = 4

    this.offset = offset
    this.sprites = sprites

    this.flipPlayer = false

    this.dead = false

    for (const sprite in this.sprites) {
      sprites[sprite].image = new Image()
      sprites[sprite].image.src = sprites[sprite].imageSrc
    }
  }

  draw() {
    this.context.drawImage(
      this.image,
      (this.currentFrame * this.image.width) / this.numOfFrames,
      0,
      this.image.width / this.numOfFrames,
      this.image.height,
      this.position.x - this.offset.x,
      this.position.y - this.offset.y,
      (this.image.width / this.numOfFrames) * this.scale,
      this.image.height * this.scale
    )
  }

  animateFrames() {
    this.elapsedFrame++

    if (this.elapsedFrame % this.frameHold === 0) {
      if (this.currentFrame < this.numOfFrames - 1) {
        this.currentFrame++
      } else {
        this.currentFrame = 0
      }
    }
  }

  update() {
    this.attackBox.position.x = this.flipPlayer
      ? this.position.x - this.attackBox.flipOffset.x
      : this.position.x + this.attackBox.offset.x
    this.attackBox.position.y = this.position.y + this.attackBox.offset.y

    /* this.context.fillRect(
      this.attackBox.position.x,
      this.attackBox.position.y,
      this.attackBox.width,
      this.attackBox.height
    ) */

    if (this.velocity.x != 0) {
      this.flipPlayer = this.velocity.x < 0
    }

    this.context.save()

    if (this.flipPlayer) {
      const around = this.position.x + this.image.width / this.numOfFrames / 4

      this.context.translate(around, 0)
      this.context.scale(-1, 1)
      this.context.translate(-around, 0)
    }

    this.draw()
    if (!this.dead) this.animateFrames()

    this.context.restore()

    this.position.x += this.velocity.x

    this.position.y += this.velocity.y

    // Gravity handler
    if (
      this.position.y + this.height + this.velocity.y >=
      this.canvas.height - 32
    ) {
      this.velocity.y = 0
      this.position.y = 330 + 64
    } else this.velocity.y += GRAVITY
  }

  attack() {
    let attacks = ["attack1", "attack2"]

    let att = attacks[Math.floor(Math.random() * 2)]

    this.switchSprite(att)
    this.isAttacking = true
  }

  switchSprite(sprite) {
    // override animations with death animation
    if (this.image === this.sprites.death.image) {
      if (this.currentFrame === this.sprites.death.numOfFrames - 1)
        this.dead = true
      return
    }

    // override animations with attack animation
    if (
      this.image === this.sprites.attack1.image &&
      this.currentFrame < this.sprites.attack1.numOfFrames - 1
    )
      return
    if (
      this.image === this.sprites.attack2.image &&
      this.currentFrame < this.sprites.attack2.numOfFrames - 1
    )
      return

    // override animations with take hit animation
    if (
      this.image === this.sprites.takeHit.image &&
      this.currentFrame < this.sprites.takeHit.numOfFrames - 1
    )
      return

    if (this.image !== this.sprites[sprite].image) {
      this.image = this.sprites[sprite].image
      this.numOfFrames = this.sprites[sprite].numOfFrames
      this.currentFrame = 0
    }
  }

  takeHit() {
    this.health -= 5

    if (this.health <= 0) this.switchSprite("death")
    else this.switchSprite("takeHit")
  }
}
