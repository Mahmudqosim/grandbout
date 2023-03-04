export function rectangularCollisionDetection({ rect1, rect2 }) {
  return (
    rect1.attackBox.position.x + rect1.attackBox.width >= rect2.position.x &&
    rect1.attackBox.position.x <= rect2.position.x + rect2.width &&
    rect1.attackBox.position.y + rect1.attackBox.height >= rect2.position.y &&
    rect1.attackBox.position.y <= rect2.position.y + rect2.height
  )
}

export function determineWinner({ player1, player2, timerId }) {
  clearTimeout(timerId)

  if (player1.health === player2.health) console.log("It's a tie")
  else if (player1.health > player2.health) console.log("Player1 Won")
  else console.log("Player2 Won")
}
