export default ({ rows, cols, bombs }) => {
  let board = []
  let mineLocation = []

  for (let x = 0; x < rows; x++) {
    let subCol = []
    for (let y = 0; y < cols; y++) {
      subCol.push({
        value: 0,
        revealed: false,
        x: x,
        y: y,
        flagged: false,
      })
    }
    board.push(subCol)
  }

  let bombsPlaced = 0
  while (bombsPlaced < bombs) {
    let randX = randomNum(0, rows - 1)
    let randY = randomNum(0, cols - 1)
    if (board[randX][randY].value === 0) {
      board[randX][randY].value = "X"
      mineLocation.push([randX, randY])
      bombsPlaced++
    }
  }

  // calc and save values = neighboring bombs
  for (let x = 0; x < rows; x++) {
    for (let y = 0; y < cols; y++) {
      // for every bombs - inc all existing neighbors
      if (board[x][y].value === "X") {
        if (x > 0) {
          // up exists
          if (board[x - 1][y].value !== "X") board[x - 1][y].value++ // inc up
          if (y > 0) {
            // left exists
            if (board[x - 1][y - 1].value !== "X") board[x - 1][y - 1].value++ // inc up left
          }
          if (y < cols - 1) {
            if (board[x - 1][y + 1].value !== "X") board[x - 1][y + 1].value++
          } // if right exists - inc up right
        }
        if (y > 0 && board[x][y - 1].value !== "X") board[x][y - 1].value++ // if left inc left
        if (x < rows - 1) {
          // down exists
          if (board[x + 1][y].value !== "X") board[x + 1][y].value++ // inc down
          if (y < cols - 1) {
            // right exists
            if (board[x + 1][y + 1].value !== "X") board[x + 1][y + 1].value++ // inc down right
          }
          if (y > 0) {
            if (board[x + 1][y - 1].value !== "X") board[x + 1][y - 1].value++
          } // if left exists - inc down left
        }
        if (y < cols - 1 && board[x][y + 1].value !== "X")
          board[x][y + 1].value++ // inc right
      }
    }
  }
  return { board, mineLocation }
}

function randomNum(min = 0, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min)
}
