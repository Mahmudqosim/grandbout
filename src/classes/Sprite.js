export class Sprite {
  /**
   *
   * @param {HTMLCanvasElement} canvas
   * @param {CanvasRenderingContext2D} context
   * @param {object} props
   */
  constructor(
    canvas,
    context,
    { position, image, scale = 1, offset = { x: 0, y: 0 } }
  ) {
    this.canvas = canvas
    this.context = context

    this.position = position

    this.image = new Image()
    this.image.src = image

    this.scale = scale

    this.offset = offset
  }

  draw() {
    this.context.drawImage(
      this.image,
      this.position.x - this.offset.x,
      this.position.y - this.offset.y,
      this.canvas.width,
      this.canvas.height
    )
  }

  update() {
    this.draw()
  }
}
