import React, { useEffect, useState } from "react"
import createBoard from "../utils/createBoard"
import { reveal } from "../utils/reveal"
import Cell from "./Cell/Cell"
import Modal from "./Modal/Modal"
import Timer from "./Timer"

const Board = (props) => {
  const [grid, setGrid] = useState([])
  const [nonMineCount, setNonMineCount] = useState("Building board...") // cells revealed/flagged
  const [mineLocations, setMineLocations] = useState([])
  const [gameOver, setGameOver] = useState(false)
  const [gameResult, setGameResult] = useState(false)
  const [started, setStarted] = useState(false)
  const [flagsLeft, setFlagsLeft] = useState("Building board...")
  const [timeResult, setTimeResult] = useState(0)

  const sizes = [
    { rows: 10, cols: 10, bombs: 10 },
    { rows: 18, cols: 18, bombs: 40 },
    { rows: 24, cols: 24, bombs: 70 },
  ]
  // onMount or difficulty changed
  useEffect(() => {
    restartGame()
  }, [props])
  function freshBoard() {
    const boardSize = sizes[props.diff]
    const newBoard = createBoard(boardSize)
    console.log(`created board of size`)
    console.log(JSON.stringify(sizes[props.diff]))
    setNonMineCount(boardSize.rows * boardSize.cols - boardSize.bombs)
    setGrid(newBoard.board)
    setMineLocations(newBoard.mineLocation)
    setFlagsLeft(boardSize.bombs)
  }

  useEffect(() => {
    checkWin()
  }, [nonMineCount, flagsLeft])

  // On right click -> Flag/Unflag cell
  const updateFlag = (e, x, y) => {
    e.preventDefault()
    let newGrid = JSON.parse(JSON.stringify(grid))
    if (newGrid[x][y].revealed || gameOver) {
      return
    } else {
      if (newGrid[x][y].flagged) {
        if (mineLocations.includes([x, y])) {
          setNonMineCount(nonMineCount + 1)
        }
        setFlagsLeft(flagsLeft + 1)
        newGrid[x][y].flagged = false
      } else if (flagsLeft > 0) {
        if (mineLocations.includes([x, y])) {
          setNonMineCount(nonMineCount - 1)
        }
        setFlagsLeft(flagsLeft - 1)
        newGrid[x][y].flagged = true
      }
      setGrid(newGrid)
    }
  }

  // On left click -> Reveal cell
  const revealCell = (x, y) => {
    let newGrid = JSON.parse(JSON.stringify(grid))
    if (!started) setStarted(true)
    if (newGrid[x][y].flagged || gameOver) {
      return
    } else {
      if (newGrid[x][y].value === "X") {
        // reveal mines bombed
        for (let i = 0; i < mineLocations.length; i++)
          newGrid[mineLocations[i][0]][mineLocations[i][1]].revealed = true
        setGrid(newGrid)
        setGameOver(true)
      } else {
        let newBoard = reveal(newGrid, x, y, nonMineCount)
        console.log("updated grid")
        setGrid(newBoard.arr)
        setNonMineCount(newBoard.newNonMineCount)
      }
    }
  }

  if (!grid) {
    return <div>Loading...</div>
  }
  const checkWin = () => {
    const otherWin = () => {
      if (flagsLeft === 0) {
        for (let i = 0; i < mineLocations.length; i++)
          if (grid[mineLocations[i][0]][mineLocations[i][1]].flagged === false)
            return false
        return true
      } else return false
    }
    if (nonMineCount === 0 || otherWin()) {
      // won
      let newGrid = JSON.parse(JSON.stringify(grid))
      for (let i = 0; i < mineLocations.length; i++)
        newGrid[mineLocations[i][0]][mineLocations[i][1]].value = "Y"
      setGrid(newGrid)
      setGameOver(true)
      setGameResult(true)
    }
  }

  const restartGame = () => {
    freshBoard()
    setGameOver(false)
    setGameResult(false)
    setStarted(false)
  }

  const sendTime = (time) => {
    setTimeResult(time)
  }

  return (
    <div>
      <p style={{ display: "flex", fontSize: "1.3rem", margin: "20px" }}>
        <span style={{ fontSize: "1.7rem" }}> 📍&nbsp;</span> {flagsLeft} &nbsp;
        {started ? <Timer gameOver={gameOver} sendTime={sendTime} /> : ""}
      </p>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
        }}
      >
        {gameOver && (
          <Modal
            restartGame={restartGame}
            gameResult={gameResult}
            timeResult={timeResult}
          />
        )}
        {grid.map((singleRow) => {
          return (
            <div style={{ display: "flex" }}>
              {singleRow.map((singleCell) => {
                return (
                  <Cell
                    difficulty={props.diff}
                    details={singleCell}
                    updateFlag={updateFlag}
                    revealCell={revealCell}
                  />
                )
              })}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Board
