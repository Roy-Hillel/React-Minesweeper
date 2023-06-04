export const reveal = (arr, x, y, newNonMineCount) => {
  let zeroStack = [arr[x][y]]
  let current, temp
  while (zeroStack.length > 0) {
    // pop from stack and reveal
    // if value == 0 - add all existing unrevealed non-flags neighbors to stack
    // if value != 0 - continue without adding neighbors
    temp = zeroStack.pop()
    current = arr[temp.x][temp.y]
    if (current.revealed) continue
    else {
      current.revealed = true
      newNonMineCount--
    }
    if (current.value === 0) {
      if (current.x > 0) {
        // up exists
        if (
          !arr[current.x - 1][current.y].flagged &&
          !arr[current.x - 1][current.y].revealed
        ) {
          zeroStack.push(arr[current.x - 1][current.y])
        } // push up
        if (current.y > 0) {
          // left exists
          if (
            !arr[current.x - 1][current.y - 1].flagged &&
            !arr[current.x - 1][current.y - 1].revealed
          ) {
            zeroStack.push(arr[current.x - 1][current.y - 1])
          } // push up left
        }
        if (current.y < arr[0].length - 1) {
          if (
            !arr[current.x - 1][current.y + 1].flagged &&
            !arr[current.x - 1][current.y + 1].revealed
          ) {
            zeroStack.push(arr[current.x - 1][current.y + 1])
          }
        } // if right exists - push up right
      }
      if (
        current.y > 0 &&
        !arr[current.x][current.y - 1].flagged &&
        !arr[current.x][current.y - 1].revealed
      ) {
        zeroStack.push(arr[current.x][current.y - 1])
      } // push left
      if (current.x < arr.length - 1) {
        // down exists
        if (
          !arr[current.x + 1][current.y].flagged &&
          !arr[current.x + 1][current.y].revealed
        ) {
          zeroStack.push(arr[current.x + 1][current.y])
        } // push down
        if (current.y < arr[0].length - 1) {
          // right exists
          if (
            !arr[current.x + 1][current.y + 1].flagged &&
            !arr[current.x + 1][current.y + 1].revealed
          ) {
            zeroStack.push(arr[current.x + 1][current.y + 1])
          } // push down right
        }
        if (current.y > 0) {
          if (
            !arr[current.x + 1][current.y - 1].flagged &&
            !arr[current.x + 1][current.y - 1].revealed
          ) {
            zeroStack.push(arr[current.x + 1][current.y - 1])
          }
        } // if left exists - push down left
      }
      if (
        current.y < arr[0].length - 1 &&
        !arr[current.x][current.y + 1].flagged &&
        !arr[current.x][current.y + 1].revealed
      ) {
        zeroStack.push(arr[current.x][current.y + 1])
      } // push right
    }
  }
  return { arr, newNonMineCount }
}
